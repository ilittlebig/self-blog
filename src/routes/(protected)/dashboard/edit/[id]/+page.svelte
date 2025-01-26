<script lang="ts">
	import { editPostSchema } from "$lib/schemas/post";
	import FormPost from "$lib/components/form-post.svelte";
	import type { Post } from "types/post";

	interface Props {
		data: { post: Post; };
	}
	let { data }: Props = $props();

	let initialData = {
		...data.post,
		tags: data.post.tags.join(", "),
	};
</script>

<svelte:head>
	<title>Elias Sjödin | Edit Page</title>
</svelte:head>

<FormPost schema={editPostSchema} {initialData} />
