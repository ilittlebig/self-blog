<script lang="ts">
	import { formatDate } from "$lib/utils/date";
	import type { Post } from "types/post";

	interface Props {
		data: {
			post: Post;
		};
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>{data.post.title}</title>
	<meta name="description" content={data.post.summary} />
	<meta name="keywords" content={data.post.tags.join(", ")} />
	<meta property="og:title" content={data.post.title} />
	<meta property="og:description" content={data.post.summary} />
	<meta property="og:type" content="article" />
	<meta property="og:image" content="/photo.jpeg" />
	<meta name="twitter:title" content={data.post.title} />
	<meta name="twitter:description" content={data.post.summary} />
	<meta name="twitter:image" content="/photo.jpeg" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

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
		<h1 class="text-2xl md:text-4xl font-bold leading-tight">{data.post.title}</h1>
		<p class="text-muted-foreground text-sm md:text-base mt-1">{formatDate(data.post.created_at)}</p>
		<p class="text-muted-foreground text-sm md:text-base">
			By {data.post.author}
		</p>
	</div>
	<div class="post-content prose prose-sm md:prose-base leading-relaxed prose-headings:mt-6 prose-img:rounded-lg">
		{@html data.post.content}
	</div>
</div>
