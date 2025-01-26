<script lang="ts" generics="TData, TValue">
	import { setContext, type Snippet } from "svelte";
	import {
		getCoreRowModel,
		type ColumnDef,
		type VisibilityState,
	} from "@tanstack/table-core";
	import { createSvelteTable } from "$lib/components/ui/data-table";

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		children: Snippet;
	};

	let columnVisibility = $state<VisibilityState>({});

	let {
		data,
		columns,
		children,
	}: DataTableProps<TData, TValue> = $props();

	const table = createSvelteTable({
		get data() {
			return data;
		},
		get columns() {
			return columns;
		},
		state: {
			get columnVisibility() {
				return columnVisibility;
			},
		},
		onColumnVisibilityChange: updater => {
			if (typeof updater === "function") {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
		getCoreRowModel: getCoreRowModel(),
	});

	setContext("data-table", { table });
</script>

{@render children()}
