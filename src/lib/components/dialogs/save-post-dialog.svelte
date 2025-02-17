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
	import { getIdTokenContent } from "$lib/utils/auth";
	import { Button } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Alert from "$lib/components/ui/alert";

	let error: string | undefined = $state();

	const uploadThumbnail = async (thumbnail: File): Promise<string> => {
		try {
			return await uploadFileToS3(thumbnail);
		} catch {
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

			const { title, content, tags, summary, thumbnail } = savePostDialog.post || {};
			const postPayload: Record<string, any> = {
				title,
				content,
				tags,
				summary,
				thumbnail,
				status,
			};

			const featured = savePostDialog.post?.featured;
			if (savePostDialog.post?.id) {
				if (featured) {
					postPayload.featured_at = savePostDialog.post?.featured_at || new Date().toISOString();
				} else {
					postPayload.featured_at = null;
				}
				await PATCH(`/posts/${savePostDialog.post.id}`, postPayload);
			} else {
				if (featured) {
					postPayload.featured_at = new Date().toISOString();
				}

				const idToken = await getIdTokenContent();
				postPayload.created_at = new Date().toISOString();
				postPayload.author = idToken.name;
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
