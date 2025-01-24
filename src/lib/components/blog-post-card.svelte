<script lang="ts">
	import { ExternalLink } from "lucide-svelte";
	import { formatDate } from "$lib/utils/date";
	import type { Post } from "types/post";

	interface Props {
		post: Post;
	}
	let { post }: Props = $props();
</script>

<div class="flex flex-col w-[450px] rounded-lg border">
	<img
		src="/photo.jpeg"
		alt="Blog post thumnail"
		class="rounded-t-lg"
	/>
	<div class="flex flex-col gap-y-2 p-4">
		<div class="flex flex-col">
			<h1 class="text-xl font-semibold">{post.title}</h1>
			<p class="text-sm text-muted-foreground">{formatDate(post.created_at)}</p>
		</div>
		<a href={"/post/" + post.id} class="flex items-center gap-x-2 hover:underline">
			Read More
			<ExternalLink size="18" />
		</a>
	</div>
</div>
