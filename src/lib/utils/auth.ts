/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-25
 */

import { getCurrentSession } from "@ilittlebig/easy-auth";

const decodeBase64Url = (base64Url: string) => {
	try {
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
		const binaryString = atob(padded);

		return new TextDecoder("utf-8").decode(
			new Uint8Array([...binaryString].map(char => char.charCodeAt(0)))
		);
	} catch {
		return null;
	}
};

const decodeToken = (token: string) => {
	try {
		const [, payload] = token.split(".");
		const decodedPayload = JSON.parse(decodeBase64Url(payload)!);
		return decodedPayload;
	} catch {
		return null;
	}
};

export const isAuthenticated = async () => {
	try {
		await getCurrentSession();
		return true;
	} catch {
		return false;
	}
}

export const getIdTokenContent = async () => {
	try {
		const { tokens } = await getCurrentSession();
		const idToken = tokens?.idToken?.toString();

		if (!idToken) {
			throw new Error("idToken not found in the session");
		}
		return decodeToken(idToken);
	} catch {
		return null;
	}
};
