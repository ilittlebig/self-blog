/*
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-24
 */

import { getCurrentSession } from "@ilittlebig/easy-auth";

const request = async (
	method: string,
	endpoint: string,
	body?: any,
	requireAuth: boolean = true,
	contentType: string = "application/json"
) => {
	let headers: Record<string, string> = {};
	if (contentType !== "multipart/form-data") {
		headers["Content-Type"] = contentType;
	}

	if (requireAuth) {
		const { tokens } = await getCurrentSession();
		const accessToken = tokens.accessToken.toString();
		headers["Authorization"] = `Bearer ${accessToken}`;
	}

	const response = await fetch("/api" + endpoint, {
		method,
		headers,
		body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		throw new Error(`API request failed: ${response.status} ${response.statusText}`);
	}
	return await response.json();
};

export const GET = async (endpoint: string) => await request("GET", endpoint, undefined, false);
export const POST = async (endpoint: string, body: any, contentType?: string) =>
	await request("POST", endpoint, body, true, contentType);
export const DELETE = async (endpoint: string, body: any) =>
	await request("DELETE", endpoint, body, true);
export const PATCH = async (endpoint: string, body: any, contentType?: string) =>
	await request("PATCH", endpoint, body, true, contentType);
