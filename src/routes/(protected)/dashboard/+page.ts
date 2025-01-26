/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-26
 */

import { blogStore } from "$lib/stores/blog-store.svelte";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch("/api/posts");
	const posts = await response.json();
	blogStore.posts = posts;
}
