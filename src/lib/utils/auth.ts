/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-25
 */

import { getCurrentSession } from "@ilittlebig/easy-auth";

export const isAuthenticated = async () => {
	try {
		await getCurrentSession();
		return true;
	} catch {
		return false;
	}
}
