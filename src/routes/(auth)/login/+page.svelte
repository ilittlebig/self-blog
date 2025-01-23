<script lang="ts">
	import { handleSignIn } from "$lib/services/auth-service";
	import { loginFormSchema } from "$lib/schemas/auth";
	import * as Card from "$lib/components/ui/card";
	import * as Form from "$lib/components/ui/form";
	import FormComponent from "$lib/components/auth/form-component.svelte";
	import ResetPasswordDialog from "$lib/components/dialogs/auth/reset-password-dialog.svelte";

	const fields = [
		{ name: "username", label: "Email", placeholder: "user@example.com" },
		{ name: "password", label: "Password", type: "password", component: ResetPasswordDialog },
	];

	const data = { username: "", password: "" };
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<FormComponent {data} {fields} onsubmit={handleSignIn} schema={loginFormSchema}>
			{#snippet children(submitting)}
				<Form.Button disabled={submitting}>Submit</Form.Button>
			{/snippet}
		</FormComponent>
	</Card.Content>
</Card.Root>
