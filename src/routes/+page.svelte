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

<svelte:head>
	<title>Elias Sjödin | Inspiring Web Development Blog</title>
	<meta name="description" content="Inspiring developers with cutting-edge tutorials, tools, and ideas for the modern web. Stay updated on Svelte, React, TypeScript, and more." />
	<meta name="keywords" content="Web Development, Tutorials, Svelte, React, TypeScript, JavaScript, Elias Sjödin" />
	<meta property="og:title" content="Elias Sjödin | Inspiring Web Development Blog" />
	<meta property="og:description" content="Inspiring developers with cutting-edge tutorials, tools, and ideas for the modern web." />
	<meta property="og:image" content="/photo.jpeg" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Elias Sjödin | Inspiring Web Development Blog" />
	<meta name="twitter:description" content="Stay updated with tutorials on Svelte, React, TypeScript, and more." />
	<meta name="twitter:image" content="/photo.jpeg" />
</svelte:head>

<section class="py-16 px-4 lg:px-0">
	<img
		src="/photo.jpeg"
		alt="Hero Background"
		class="w-full h-[200px] md:h-[300px] rounded-lg object-cover mb-8 md:mb-10"
	/>
	<div class="max-w-4xl mx-auto text-center">
		<h1 class="text-3xl md:text-5xl font-title tracking-wide font-bold">
			Building the
			<span class="font-extrabold text-primary">Future</span>
			of Web Development Together
		</h1>
		<p class="mt-4 text-base md:text-lg text-muted-foreground">
			Inspiring developers with cutting-edge tutorials, tools, and ideas for the modern web.
		</p>
	</div>
</section>

<section class="py-12 w-full px-4 md:px-0">
	<h2 class="text-2xl md:text-3xl font-bold text-center mb-6">Featured Posts</h2>
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

<section class="max-w-4xl py-16 w-full">
	<div class="max-w-4xl mx-auto text-center px-4">
		<h2 class="text-2xl md:text-3xl font-bold tracking-wide">Latest Blog Posts</h2>
		<p class="text-muted-foreground mt-3 text-sm md:text-base">
			Check out our latest tutorials and insights on web development, Svelte, and more.
		</p>
	</div>
	<div class="grid grid-cols-1 gap-4 px-4 mt-10 sm:grid-cols-2 md:gap-6 lg:gap-8 lg:px-0">
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
