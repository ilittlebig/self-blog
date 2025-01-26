<script lang="ts">
	import { defaults } from "sveltekit-superforms";
	import { zod } from "sveltekit-superforms/adapters";
	import { editPostSchema } from "$lib/schemas/post";
	import FormPost from "$lib/components/form-post.svelte";

	const DEFAULT_DATA = defaults(zod(editPostSchema)).data;
</script>

<svelte:head>
	<title>Elias Sjödin | New Page</title>
</svelte:head>

<FormPost schema={editPostSchema} initialData={DEFAULT_DATA} />
