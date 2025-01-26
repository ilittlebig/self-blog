<script lang="ts">
	import { beforeNavigate, goto } from "$app/navigation";
	import {
		superForm,
		defaults,
		type SuperValidated,
	} from "sveltekit-superforms";
	import { zod, zodClient } from "sveltekit-superforms/adapters";
	import { formSchema, type FormData } from "$lib/schemas/new-post";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import * as Form from "$lib/components/ui/form";
  import * as Accordion from "$lib/components/ui/accordion";

	const DEFAULT_DATA = defaults(zod(formSchema));

	const handleValidForm = async (form: SuperValidated<FormData>) => {
		const formData = form.data;
		console.log("valid form data:", formData);
	}

	const form = superForm<FormData>(DEFAULT_DATA, {
		SPA: true,
		resetForm: false,
		clearOnSubmit: "errors",
		validators: zodClient(formSchema),
		async onUpdate({ form }) {
			console.log("on update", form);
			if (form.valid) await handleValidForm(form);
		}
	});

	const { form: formData, enhance, submitting } = form;

	const handleFileChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			$formData.thumbnail = input.files[0];
		}
	};

	beforeNavigate(({ cancel }) => {
		const isChanged = JSON.stringify($formData) !== JSON.stringify(DEFAULT_DATA.data);
		if (!isChanged) return;
		const confirmLeave = confirm("You have unsaved changes. Are you sure you want to leave this page?");
		if (!confirmLeave) cancel();
	});
</script>

<svelte:head>
	<title>Elias Sjödin | New Page</title>
</svelte:head>

<section class="py-8 px-4 md:py-12 md:px-6 w-full h-full">
	<form method="POST" use:enhance>
		<div class="max-w-4xl mx-auto">
			<div class="flex justify-between items-center mb-6">
				<h1 class="text-2xl font-bold">New Post</h1>
				<div class="flex gap-x-2">
					<Button variant="outline" onclick={() => goto("/dashboard")}>
						Cancel Changes
					</Button>
					<Button type="submit">Save Post</Button>
				</div>
			</div>
			<Accordion.Root type="single" value="metadata" class="w-full">
				<Accordion.Item value="metadata">
					<Accordion.Trigger>Metadata</Accordion.Trigger>
					<Accordion.Content>
						<div class="flex flex-col gap-y-4">
							<Form.Field name="title" {form}>
								<Form.Control>
									<Form.Label>Title</Form.Label>
									<Input
										placeholder="Enter your post title here..."
										class="w-1/2"
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
										class="w-1/2"
										accept="image/jpeg, image/png"
										onchange={handleFileChange}
									/>
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
							<Form.Field name="tags" {form}>
								<Form.Control>
									<Form.Label>Tags</Form.Label>
									<Input
										placeholder="Svelte,Tutorial,TypeScript"
										class="w-1/2"
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
										<Checkbox {...props} bind:checked={$formData.featured} />
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
		</div>
	</form>
</section>
