<script lang="ts">
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { GET } from "$lib/services/blog-api";
	import type { Post } from "types/post";

	let post: Post | undefined = $state();
	onMount(async () => {
		const id = page.params.id;
		post = await GET("/posts/" + id);
	});
</script>

{JSON.stringify(post)}
