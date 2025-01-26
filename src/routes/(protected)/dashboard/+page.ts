/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-26
 */

import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch("/api/posts");
	const posts = await response.json();
	return { posts };
}
