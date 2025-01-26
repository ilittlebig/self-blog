/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-23
 */

import { redirect } from "@sveltejs/kit";
import { isAuthenticated } from "$lib/utils/auth";

export const ssr = false;

export const load = async () => {
	const authenticated = await isAuthenticated();
	console.log(authenticated);
	if (authenticated) throw redirect(307, "/");
}
