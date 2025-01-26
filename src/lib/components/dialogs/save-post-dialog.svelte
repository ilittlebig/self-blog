<script module>
	import type { EditablePost } from "types/post";
	interface Props {
		open: boolean;
		submitting: boolean;
		post?: EditablePost;
	}

	export let savePostDialog = $state<Props>({
		open: false,
		submitting: false,
		post: undefined,
	});
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { POST, PATCH } from "$lib/services/blog-api";
	import { uploadFileToS3 } from "$lib/utils/s3";
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Alert from "$lib/components/ui/alert";

	let error: string | undefined = $state();

	const uploadThumbnail = async (thumbnail: File): Promise<string> => {
		try {
			return await uploadFileToS3(thumbnail);
		} catch (err: any) {
			console.log(err);
			throw new Error("Failed to upload thumbnail. Please try again.");
		}
	};

	const publish = async (status: string) => {
		try {
			savePostDialog.submitting = true;
			if (savePostDialog.post?.thumbnail instanceof File) {
				const thumbnailUrl = await uploadThumbnail(savePostDialog.post.thumbnail);
				savePostDialog.post.thumbnail = thumbnailUrl;
			}

			const featured = savePostDialog.post?.featured;
			const postPayload = {
				...savePostDialog.post,
				featured_at: featured ? savePostDialog.post?.featured_at || new Date().toISOString() : null,
				status,
			};

			if (savePostDialog.post?.id) {
				await PATCH(`/posts/${savePostDialog.post.id}`, postPayload);
			} else {
				postPayload.created_at = new Date().toISOString();
				await POST("/posts", postPayload);
			}

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
			<Button variant="outline" onclick={() => publish("draft")} disabled={savePostDialog.submitting}>
				Save as Draft
			</Button>
			<Button onclick={() => publish("published")} disabled={savePostDialog.submitting}>
				Publish Now
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
