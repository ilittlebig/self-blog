<script module>
	import type { Post } from "types/post";
	interface Props {
		open: boolean;
		submitting: boolean;
		post?: Omit<Post, "status" | "id">;
	}

	export let savePostDialog = $state<Props>({
		open: false,
		submitting: false,
		post: undefined,
	});
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { POST } from "$lib/services/blog-api";
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
  import * as Alert from "$lib/components/ui/alert";

	let error: string | undefined = $state();

	const publish = async (status: string) => {
		try {
			savePostDialog.submitting = true;
			await POST("/posts", {
				...savePostDialog.post,
				status,
			});

			goto("/dashboard");
			savePostDialog.open = false;
		} catch (err: any) {
			error = err.message;
		} finally {
			savePostDialog.submitting = false;
		}
	}

	const cancel = () => savePostDialog.open = false;
</script>

<Dialog.Root bind:open={savePostDialog.open}>
	<Dialog.Content class="max-w-[500px]">
		<Dialog.Header>
			<Dialog.Title>Save Post</Dialog.Title>
			<Dialog.Description>
				Choose how you’d like to save your post. You can save it as a draft to edit later or publish it immediately for others to see.
			</Dialog.Description>
		</Dialog.Header>

		{#if error}
			<Alert.Root variant="destructive">
				<i class="fa-regular fa-circle-exclamation text-lg absolute left-4 top-4"></i>
				<Alert.Title>Error</Alert.Title>
				<Alert.Description>{error}</Alert.Description>
			</Alert.Root>
		{/if}

		<Dialog.Footer>
			<Button variant="ghost" onclick={cancel}>Cancel</Button>
			<Button variant="outline" onclick={() => publish("draft")}>
				Save as Draft
			</Button>
			<Button onclick={() => publish("published")}>
				Publish Now
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
