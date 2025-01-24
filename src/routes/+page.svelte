<script lang="ts">
	import { onMount } from "svelte";
	import { GET } from "$lib/services/blog-api";

	onMount(async () => {
		const posts = await GET("/posts");
		console.log("posts:", posts);
	});
</script>

/ page
