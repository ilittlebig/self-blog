<script lang="ts">
	import { blogStore } from "$lib/stores/blog-store.svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area";
	import { Button } from "$lib/components/ui/button";
	import { DataTable } from "$lib/components/data-table";
	import { columns } from "./columns";
</script>

<svelte:head>
	<title>Elias Sjödin | Dashboard</title>
</svelte:head>

<section class="py-8 px-4 md:py-12 md:px-6 w-full">
	<div class="max-w-4xl mx-auto">
		<div class="flex justify-between items-center mb-6">
			<h1 class="text-2xl font-bold">Dashboard</h1>
			<Button href="/dashboard/new">New Post</Button>
		</div>
		<DataTable.Provider data={blogStore.posts} {columns}>
			<ScrollArea orientation="horizontal" class="w-full">
				<DataTable.Table class="table-auto" />
			</ScrollArea>
		</DataTable.Provider>
	</div>
</section>
