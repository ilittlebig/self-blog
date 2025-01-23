<script lang="ts">
	let { children } = $props();
</script>

<div class="flex items-center justify-center h-screen w-full relative">
	{@render children()}
</div>
