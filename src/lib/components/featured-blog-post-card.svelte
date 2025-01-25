<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import type { Post } from "types/post";

	interface Props {
		post: Post;
	}
	let { post }: Props = $props();
</script>

<div class="p-0 md:p-4 md:p-6 bg-card border rounded-lg flex flex-col md:flex-row md:gap-4 md:gap-6">
	<img
		src="/photo.jpeg"
		alt="Featured Post"
		class="w-full md:w-1/3 h-56 md:h-60 object-cover rounded-t-lg md:rounded-lg"
	/>
	<div class="flex-1 flex flex-col justify-between p-4 md:p-0">
		<div>
			<div class="flex flex-wrap gap-1 mb-3">
				{#each post.tags as tag}
					<Badge variant="secondary">{tag}</Badge>
				{/each}
			</div>
			<h3 class="text-lg md:text-2xl font-bold text-primary mb-2">{post.title}</h3>
			<p class="text-sm md:text-base text-muted-foreground mb-4">{post.summary}</p>
		</div>
		<a
			href={"/post/" + post.id}
			class="text-primary font-bold hover:underline flex items-center text-sm md:text-base"
		>
			Read More <span class="ml-2">→</span>
		</a>
	</div>
</div>
