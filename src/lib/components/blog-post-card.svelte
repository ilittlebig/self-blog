<script lang="ts">
	import { ExternalLink } from "lucide-svelte";
	import { formatDate } from "$lib/utils/date";
	import type { Post } from "types/post";

	interface Props {
		post: Post;
	}
	let { post }: Props = $props();
</script>

<a
	href={"/post/" + post.id}
	class="flex flex-col w-[450px] rounded-lg border shadow-md hover:shadow-lg transition-shadow"
	aria-label={"Read more about " + post.title}
>
	<img
		src="/photo.jpeg"
		alt="Blog post thumnail"
		class="rounded-t-lg"
	/>
	<div class="flex flex-col gap-y-2 p-4">
		<div class="flex flex-col">
			<h1 class="text-xl font-bold text-primary">{post.title}</h1>
			<p class="text-sm text-muted-foreground">{formatDate(post.created_at)}</p>
		</div>
		<div class="flex items-center gap-x-2 w-fit group">
			<p class="text-muted-foreground group-hover:text-primary">
				Read More
			</p>
			<ExternalLink size="18" class="text-muted-foreground group-hover:text-primary" />
		</div>
	</div>
</a>
