<script lang="ts">
	import { ExternalLink } from "lucide-svelte";
	import type { Post } from "types/post";

	interface Props {
		post: Post;
	}
	let { post }: Props = $props();

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		const hours = String(date.getHours()).padStart(2, "0");
		const minutes = String(date.getMinutes()).padStart(2, "0");
		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}

	const createdAt = formatDate(post.created_at);
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
			<p class="text-sm text-muted-foreground">{createdAt}</p>
		</div>
		<a href={"/post/" + post.id} class="flex items-center gap-x-2 hover:underline">
			Read More
			<ExternalLink size="18" />
		</a>
	</div>
</div>
