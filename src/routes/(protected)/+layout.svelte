<script lang="ts">
	import SignOutDialog from "$lib/components/dialogs/auth/sign-out-dialog.svelte";
	let { children } = $props();
</script>

<SignOutDialog />

{@render children()}
