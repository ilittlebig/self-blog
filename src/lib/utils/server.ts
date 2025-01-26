/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-24
 */

import {
	PUBLIC_USER_POOL_ID,
	PUBLIC_AWS_REGION,
} from "$env/static/public";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const COGNITO_ISSUER = `https://cognito-idp.${PUBLIC_AWS_REGION}.amazonaws.com/${PUBLIC_USER_POOL_ID}`;

const client = jwksClient({
	jwksUri: `${COGNITO_ISSUER}/.well-known/jwks.json`,
	cache: true,
	cacheMaxAge: 3600000,
	rateLimit: true,
	jwksRequestsPerMinute: 10,
});

const getSigningKey = (kid: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		client.getSigningKey(kid, (err, key) => {
			if (err || !key) {
				return reject(new Error(`Failed to retrieve signing key for kid: ${kid}`));
			}

			const signingKey = key.getPublicKey();
			if (!signingKey) {
				return reject(new Error(`Signing key is undefined for kid: ${kid}`));
			}
			resolve(signingKey);
		});
	});
};

export const validateAccessToken = async (token: string) => {
	try {
		const { header } = jwt.decode(token, { complete: true }) as {
			header: { kid: string };
		};

		if (!header || !header.kid) {
			throw new Error("Invalid token: Missing key ID (kid)");
		}

		const signingKey = await getSigningKey(header.kid);
		const decoded = jwt.verify(token, signingKey, {
			issuer: COGNITO_ISSUER,
		});
		return decoded;
	} catch (err) {
		throw new Error("Invalid or expired access token");
	}
};

export const extractAndValidateToken = async (authHeader: string | null) => {
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new Error("Unauthorized: Missing or invalid Authorization header");
	}

	const token = authHeader.split(" ")[1];
	return await validateAccessToken(token);
};
