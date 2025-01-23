import { goto } from "$app/navigation";
import { Hub } from "@ilittlebig/easy-auth";
import { configureEasyAuth } from "$lib/services/auth-service";

configureEasyAuth();

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
