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
	class="flex flex-col w-[450px] rounded-lg border group"
	aria-label={"Read more about " + post.title}
>
	<img
		src="/photo.jpeg"
		alt="Blog post thumnail"
		class="rounded-t-lg"
	/>
	<div class="flex flex-col gap-y-3 p-6">
		<div class="flex flex-wrap gap-1">
			{#each post.tags as tag}
				<Badge variant="secondary">{tag}</Badge>
			{/each}
		</div>
		<div class="flex flex-col">
			<h1 class="text-xl font-bold text-primary group-hover:underline">{post.title}</h1>
			<p class="text-sm text-muted-foreground">{formatDate(post.created_at)}</p>
			<p class="text-sm text-muted-foreground">By {post.author}</p>
		</div>
	</div>
</a>
