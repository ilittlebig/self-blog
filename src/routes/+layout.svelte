<script lang="ts">
	import "../app.css";
	import SignOutDialog from "$lib/components/dialogs/auth/sign-out-dialog.svelte";
	import Navbar from "$lib/components/navbar.svelte";
	import Footer from "$lib/components/footer.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
		data: {
			authenticated: boolean;
		};
	}

	let {
		children,
		data
	}: Props = $props();
</script>

<SignOutDialog />

<div class="flex flex-col items-center min-h-screen">
	<Navbar authenticated={data.authenticated} />
	{@render children()}
	<Footer />
</div>
