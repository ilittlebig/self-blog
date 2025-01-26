/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-23
 */

import { goto } from "$app/navigation";
import { isAuthenticated } from "$lib/utils/auth.js";
import { Hub } from "@ilittlebig/easy-auth";

Hub.listen("auth", ({ payload }) => {
	switch (payload.event) {
		case "signedIn":
			goto("/dashboard", { invalidateAll: true });
			break;
		case "signedOut":
			goto("/", { invalidateAll: true });
			break;
	}
});

export async function load() {
	const authenticated = await isAuthenticated();
	return { authenticated };
}
