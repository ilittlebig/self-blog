<script lang="ts">
	import { onMount } from "svelte";
	import { GET } from "$lib/services/blog-api";
	import BlogPostCard from "$lib/components/blog-post-card.svelte";
	import BlogPostSkeletonCard from "$lib/components/blog-post-skeleton-card.svelte";
	import FeaturedBlogPostCard from "$lib/components/featured-blog-post-card.svelte";
	import FeaturedBlogPostSkeletonCard from "$lib/components/featured-blog-post-skeleton-card.svelte";
	import type { Post } from "types/post";

	let posts: Post[] | undefined = $state();
	let featuredPosts: any = $state();

	onMount(async () => {
		const fetchedPosts = await GET("/posts");
		posts = fetchedPosts.sort((a: Post, b: Post) => {
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		});
		featuredPosts = await GET("/featured-posts");
	});
</script>

<section class="py-16">
	<img
		src="/photo.jpeg"
		alt="Hero Background"
		class="w-full h-[300px] rounded-lg object-cover mb-10"
	/>
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-5xl font-title tracking-wide font-bold">
			Building the
			<span class="font-extrabold text-primary">Future</span>
			of Web Development Together
		</h1>
		<p class="mt-4 text-lg text-muted-foreground">
			Inspiring developers with cutting-edge tutorials, tools, and ideas for the modern web.
		</p>
	</div>
</section>

<section class="py-12 w-full">
	<h2 class="text-3xl font-bold text-center mb-6">Featured Posts</h2>
	<div class="flex flex-col gap-y-4 max-w-4xl mx-auto">
		{#if featuredPosts}
			{#each featuredPosts as featuredPost}
				<FeaturedBlogPostCard post={featuredPost} />
			{/each}
		{:else}
			{#each { length: 1 }}
				<FeaturedBlogPostSkeletonCard />
			{/each}
		{/if}
	</div>
</section>

<section class="py-16">
	<div class="max-w-4xl mx-auto text-center px-4">
		<h2 class="text-3xl font-bold tracking-wide">Latest Blog Posts</h2>
		<p class="text-muted-foreground mt-3 text-base">
			Check out our latest tutorials and insights on web development, Svelte, and more.
		</p>
	</div>
	<div class="grid grid-cols-1 gap-6 px-6 mt-10 md:grid-cols-2 lg:gap-8 lg:px-0">
		{#if posts}
			{#each posts as post}
				<BlogPostCard {post} />
			{/each}
		{:else}
			{#each { length: 4 }}
				<BlogPostSkeletonCard />
			{/each}
		{/if}
	</div>
</section>
