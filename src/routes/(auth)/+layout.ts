/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-23
 */

import { redirect } from "@sveltejs/kit";
import { getCurrentSession } from "@ilittlebig/easy-auth";

export const ssr = false;

const isAuthenticated = async () => {
	try {
		await getCurrentSession();
		return true;
	} catch {
		return false;
	}
}

export const load = async () => {
	const authenticated = await isAuthenticated();
	console.log(authenticated);
	if (authenticated) throw redirect(307, "/");
}
