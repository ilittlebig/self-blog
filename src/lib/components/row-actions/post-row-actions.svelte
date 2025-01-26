<script lang="ts">
	import { Ellipsis } from "lucide-svelte";
	import { DELETE, GET } from "$lib/services/blog-api";
	import { blogStore } from "$lib/stores/blog-store.svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import DeleteDialog from "$lib/components/dialogs/delete-dialog.svelte";
	import type { Post } from "types/post";

	interface Props {
		post: Post;
	}

	let isOpen = $state(false);
	let { post }: Props = $props();

	const handleDeleteConfirm = async () => {
		await DELETE("/posts", { id: post.id });
		blogStore.posts = await GET("/posts");
		isOpen = false;
	}
</script>

<DeleteDialog
	title="Delete Post"
	description="Are you sure you want to delete this post? This action is irreversible."
	actionLabel="Delete Post"
	onconfirm={handleDeleteConfirm}
	bind:open={isOpen}
/>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={buttonVariants({
			variant: "ghost",
			class: "relative size-8",
		})}
	>
		<Ellipsis />
		<span class="sr-only">Open menu</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label>Actions</DropdownMenu.Label>
		<DropdownMenu.Item>Edit</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onclick={() => isOpen = true}>Delete</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
