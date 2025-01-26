<script lang="ts">
	import { formatDate } from "$lib/utils/date";
	import { Badge } from "$lib/components/ui/badge";
	import type { Post } from "types/post";

	interface Props {
		post: Post;
	}
	let { post }: Props = $props();
</script>

<a
	href={"/post/" + post.id}
	class="flex flex-col w-full lg:w-[450px] rounded-lg border"
	aria-label={"Read more about " + post.title}
>
	<img
		src={post.thumbnail}
		alt="Blog post thumnail"
		class="rounded-t-lg h-56 lg:h-64 object-cover"
	/>
	<div class="flex flex-col gap-y-2 lg:gap-y-3 p-4 lg:p-6">
		<div class="flex flex-wrap gap-1">
			{#each post.tags as tag}
				<Badge variant="secondary">{tag}</Badge>
			{/each}
		</div>
		<div class="flex flex-col">
			<h1 class="text-lg md:text-xl font-bold text-primary">
				{post.title}
			</h1>
			<p class="text-xs md:text-sm text-muted-foreground">{formatDate(post.created_at)}</p>
			<p class="text-xs md:text-sm text-muted-foreground">By {post.author}</p>
		</div>
	</div>
</a>
