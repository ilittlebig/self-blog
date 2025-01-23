/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-23
 */

import { goto } from "$app/navigation";
import { Hub } from "@ilittlebig/easy-auth";

Hub.listen("auth", ({ payload }) => {
	switch (payload.event) {
		case "signedIn":
			goto("/dashboard");
			break;
		case "signedOut":
			goto("/");
			break;
	}
});
