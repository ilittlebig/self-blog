<script lang="ts">
	import { onMount } from "svelte";
	import { GET } from "$lib/services/blog-api";
	import BlogPostCard from "$lib/components/blog-post-card.svelte";
	import BlogPostSkeletonCard from "$lib/components/blog-post-skeleton-card.svelte";
	import type { Post } from "types/post";

	let posts: Post[] | undefined = $state();
	onMount(async () => {
		posts = await GET("/posts");
	});
</script>

<div class="flex flex-col gap-y-4">
	{#if posts}
		{#each posts as post}
			<BlogPostCard {post} />
		{/each}
	{:else}
		{#each { length: 3 }}
			<BlogPostSkeletonCard />
		{/each}
	{/if}
</div>
