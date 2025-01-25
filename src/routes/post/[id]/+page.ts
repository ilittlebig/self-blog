/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-25
 */

import marked from "$lib/utils/marked";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
	const id = params.id;
	const response = await fetch("/api/posts/" + id);
	const rawPost = await response.json();
	return {
		post: {
			...rawPost,
			content: marked(rawPost.content),
		}
	};
}
