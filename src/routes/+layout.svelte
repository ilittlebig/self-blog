<script lang="ts">
	import "../app.css";
	import Navbar from "$lib/components/navbar.svelte";
	import Footer from "$lib/components/footer.svelte";
	let { children } = $props();
</script>

<div class="flex flex-col items-center">
	<Navbar />
	{@render children()}
	<Footer />
</div>
