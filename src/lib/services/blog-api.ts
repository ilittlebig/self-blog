/*
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-24
 */

import { getCurrentSession } from "@ilittlebig/easy-auth";

const request = async (method: string, endpoint: string, body?: any, requireAuth: boolean = true) => {
	const baseUrl = typeof window !== "undefined" && window.location.origin;
	let headers: Record<string, string> = {
		"Content-Type": "application/json",
	};

	if (requireAuth) {
		const { tokens } = await getCurrentSession();
		const accessToken = tokens.accessToken.toString();
		headers["Authorization"] = accessToken;
	}

	const response = await fetch(baseUrl + "/backend" + endpoint, {
		method,
		headers,
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		throw new Error(`API request failed: ${response.status} ${response.statusText}`);
	}
	return await response.json();
};

export const GET = async (endpoint: string) => await request("GET", endpoint, undefined, false);
export const POST = async (endpoint: string, body: any) => await request("POST", endpoint, body);
export const DELETE = async (endpoint: string) => await request("DELETE", endpoint);
export const PATCH = async (endpoint: string, body: any) => await request("PATCH", endpoint, body);
