<script lang="ts">
	import UserMenu from "$lib/components/user-menu.svelte";

	interface Props {
		authenticated: boolean;
	}
	let { authenticated }: Props = $props();
</script>

<nav class="flex justify-center sticky top-0 px-4 py-6 bg-white w-full border-b z-10">
	<div class="flex items-center justify-between w-full max-w-4xl">
		<a href="/" class="font-logo text-xl font-bold text-primary">
			<img src="/logo.svg" alt="Logo" class="h-6" />
		</a>
		<ul class="flex items-center gap-4">
			<li>
				<a href="/" class="text-sm text-muted-foreground hover:text-primary">Home</a>
			</li>
			<li>
				<a href="https://www.sjodinelias.com/" class="text-sm text-muted-foreground hover:text-primary">Portfolio</a>
			</li>
			{#if authenticated}
				<UserMenu />
			{/if}
		</ul>
	</div>
</nav>
