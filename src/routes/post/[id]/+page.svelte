<script lang="ts">
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import { GET } from "$lib/services/blog-api";
	import marked from "$lib/utils/marked";
	import { formatDate } from "$lib/utils/date";
	import type { Post } from "types/post";

	let post: Post | undefined = $state();

	onMount(async () => {
		const id = page.params.id;
		const rawPost = await GET("/posts/" + id);

		post = {
			...rawPost,
			content: marked(rawPost.content),
		};
	});
</script>

{#if post}
	<div class="container mx-auto flex flex-col gap-y-6 p-4 md:p-6 lg:w-[700px] max-w-[700px] px-4">
		<button onclick={() => history.back()} class="text-muted-foreground hover:text-primary w-fit">
			← Back
		</button>
		<img
			src="/photo.jpeg"
			alt="Blog post thumbnail"
			class="rounded-lg mb-3 md:mb-6 shadow-md w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover"
		/>
		<div class="post-header">
			<h1 class="text-2xl md:text-4xl font-bold leading-tight">{post.title}</h1>
			<p class="text-muted-foreground text-sm md:text-base mt-1">{formatDate(post.created_at)}</p>
		</div>
		<div class="post-content prose prose-sm md:prose-base leading-relaxed prose-headings:mt-6 prose-img:rounded-lg">
			{@html post.content}
		</div>
	</div>
{/if}
