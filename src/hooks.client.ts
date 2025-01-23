/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-23
 */

import {
	PUBLIC_USER_POOL_ID,
	PUBLIC_USER_POOL_CLIENT_ID,
} from "$env/static/public";
import {
	EasyAuth,
	CookieStorage,
} from "@ilittlebig/easy-auth";
import type { ServerInit } from "@sveltejs/kit";

export const init: ServerInit = async () => {
	EasyAuth.configure({
		Auth: {
			Cognito: {
				userPoolId: PUBLIC_USER_POOL_ID,
				userPoolClientId: PUBLIC_USER_POOL_CLIENT_ID,
			}
		}
	});
	EasyAuth.setKeyValueStorage(new CookieStorage());
};
