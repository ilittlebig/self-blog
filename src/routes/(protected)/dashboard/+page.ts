/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-26
 */

import { getCurrentSession } from "@ilittlebig/easy-auth";
import { blogStore } from "$lib/stores/blog-store.svelte";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const { tokens } = await getCurrentSession();
	const accessToken = tokens.accessToken.toString();

	const response = await fetch("/api/dashboard-posts", {
		method: "GET",
		headers: {
			"Authorization": `Bearer ${accessToken}`
		},
	});

	const posts = await response.json();
	blogStore.posts = posts;
}
