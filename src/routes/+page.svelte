<script lang="ts">
	import { onMount } from "svelte";
	import { GET } from "$lib/services/blog-api";
	import BlogPostCard from "$lib/components/blog-post-card.svelte";
	import BlogPostSkeletonCard from "$lib/components/blog-post-skeleton-card.svelte";
	import type { Post } from "types/post";

	let posts: Post[] | undefined = $state();
	onMount(async () => {
		const fetchedPosts = await GET("/posts");
		posts = fetchedPosts.sort((a, b) => {
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		});
	});
</script>

<div class="flex flex-col gap-4 p-6">
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
