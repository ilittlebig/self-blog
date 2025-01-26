<script lang="ts">
	import { beforeNavigate, goto } from "$app/navigation";
	import { z } from "zod";
	import { marked } from "marked";
	import {
		superForm,
		type SuperValidated,
	} from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { formatDate } from "$lib/utils/date";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Textarea } from "$lib/components/ui/textarea";
	import SavePostDialog, {savePostDialog} from "$lib/components/dialogs/save-post-dialog.svelte";
	import * as Form from "$lib/components/ui/form";
	import * as Accordion from "$lib/components/ui/accordion";
	import * as Tabs from "$lib/components/ui/tabs";

	let {
		initialData,
		schema
	} = $props();

	initialData = {
		...initialData,
		featured: !!initialData.featured_at,
	};

	type SchemaData = z.infer<typeof schema>;

	const form = superForm<SchemaData>(initialData, {
		SPA: true,
		resetForm: false,
		clearOnSubmit: "errors",
		validators: zodClient(schema),
		async onUpdate({ form }) {
			if (form.valid) await handleValidForm(form);
		}
	});
	const { form: formData, enhance } = form;

	const handleValidForm = async (form: SuperValidated<SchemaData>) => {
		const formData = form.data;
		const tagsArray = formData.tags
			.split(",")
			.map((tag: string) => tag.trim())
			.filter((tag: string) => tag);

		const post = {
			...initialData,
			title: formData.title,
			content: formData.content,
			tags: tagsArray,
			summary: formData.summary,
			featured: formData.featured,
			thumbnail: formData.thumbnail,
		};

		savePostDialog.post = post;
		savePostDialog.open = true;
	}

	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (!input.files || !input.files[0]) return;
		$formData.thumbnail = input.files[0];
	};

	const parseMarkdown = () => marked($formData.content || "");

	beforeNavigate(({ cancel }) => {
		if (savePostDialog.submitting) return;
		const isChanged = JSON.stringify($formData) !== JSON.stringify(initialData);
		if (!isChanged) return;
		const confirmLeave = confirm("You have unsaved changes. Are you sure you want to leave this page?");
		if (!confirmLeave) cancel();
	});
</script>

<SavePostDialog />

<section class="pt-8 px-4 md:pt-12 md:px-6 w-full h-full">
	<form class="h-full max-w-4xl mx-auto" method="POST" use:enhance>
		<div class="flex justify-between items-center mb-6">
			<h1 class="text-2xl font-bold">New Post</h1>
			<div class="flex gap-x-2">
				<Button variant="outline" onclick={() => goto("/dashboard")}>
					Cancel Changes
				</Button>
				<Button type="submit">Save Post</Button>
			</div>
		</div>
		<Accordion.Root type="single" value="metadata" class="w-full mb-4">
			<Accordion.Item value="metadata">
				<Accordion.Trigger>Metadata</Accordion.Trigger>
				<Accordion.Content>
					<div class="flex flex-col gap-y-4">
						<Form.Field name="title" {form}>
							<Form.Control>
								<Form.Label>Title</Form.Label>
								<Input
									placeholder="Enter your post title here..."
									class="w-full md:w-1/2"
									bind:value={$formData.title}
								/>
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field name="thumbnail" {form}>
							<Form.Control>
								<Form.Label>Thumbnail</Form.Label>
								<Input
									type="file"
									class="w-full md:w-1/2"
									accept="image/jpeg, image/png"
									onchange={handleFileChange}
								/>
								{#if typeof $formData.thumbnail === "string" && $formData.thumbnail.trim() !== ""}
									<img
										src={initialData.thumbnail}
										alt="Blog post thumbnail"
										class="rounded-lg mb-3 shadow-md w-full md:w-1/2 h-[250px] object-cover"
									/>
								{:else if $formData.thumbnail instanceof File}
									<img
										src={URL.createObjectURL($formData.thumbnail)}
										alt="New thumbnail preview"
										class="rounded-lg mb-3 shadow-md w-full md:w-1/2 h-[250px] object-cover"
									/>
								{/if}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field name="tags" {form}>
							<Form.Control>
								<Form.Label>Tags</Form.Label>
								<Input
									placeholder="Svelte, Tutorial, TypeScript"
									class="w-full md:w-1/2"
									bind:value={$formData.tags}
								/>
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field name="summary" {form}>
							<Form.Control>
								<Form.Label>Summary</Form.Label>
								<Input
									placeholder="Enter your post summary here..."
									class="w-full"
									bind:value={$formData.summary}
								/>
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field name="featured" class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4" {form}>
							<Form.Control>
								{#snippet children({ props })}
									<Checkbox
										{...props}
										bind:checked={$formData.featured}
									/>
									<div class="space-y-1 leading-none">
										<Form.Label>Feature this post</Form.Label>
										<Form.Description>
											Mark this post as featured to highlight it on the homepage or featured section.
										</Form.Description>
									</div>
									<Form.FieldErrors />
								{/snippet}
							</Form.Control>
						</Form.Field>
					</div>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
		<Tabs.Root value="edit" class="w-full h-full">
			<Tabs.List class="grid w-full grid-cols-2">
				<Tabs.Trigger value="edit">Edit</Tabs.Trigger>
				<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="edit" class="h-full">
				<Form.Field name="content" {form}>
					<Form.Control>
						<Form.Label>Content</Form.Label>
						<Textarea
							placeholder="Start writing your amazing blog post here..."
							class="min-h-[600px]"
							bind:value={$formData.content}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</Tabs.Content>
			<Tabs.Content value="preview">
				<div class="container mx-auto flex flex-col gap-y-6 md:p-6 lg:w-[700px] max-w-[700px] py-4 px-0">
					{#if typeof $formData.thumbnail === "string"}
						<img
							src={$formData.thumbnail}
							alt="Blog post thumbnail"
							class="rounded-lg mb-3 md:mb-6 shadow-md w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover"
						/>
					{:else if $formData.thumbnail instanceof File}
						<img
							src={URL.createObjectURL($formData.thumbnail)}
							alt="Blog post thumbnail"
							class="rounded-lg mb-3 md:mb-6 shadow-md w-full h-[250px] md:h-[350px] lg:h-[450px] object-cover"
						/>
					{:else}
						<div class="rounded-lg mb-3 md:mb-6 w-full h-[250px] mx:h-[350px] lg:h-[450px] bg-accent"></div>
					{/if}
					<div class="post-header">
						<h1 class="text-2xl md:text-4xl font-bold leading-tight">
							{$formData.title || "No Title"}
						</h1>
						<p class="text-muted-foreground text-sm md:text-base mt-1">
							{formatDate(new Date().toLocaleDateString())}
						</p>
						<p class="text-muted-foreground text-sm md:text-base">By You</p>
					</div>
					<div class="post-content prose prose-sm md:prose-base leading-relaxed prose-headings:mt-6 prose-img:rounded-lg">
						{@html parseMarkdown() || "<p>Start writing your blog content...</p>"}
					</div>
				</div>
			</Tabs.Content>
		</Tabs.Root>
	</form>
</section>
