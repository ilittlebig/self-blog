<script lang="ts">
	import { getContext } from "svelte";
	import { Button } from "$lib/components/ui/button";
	import * as Select from "$lib/components/ui/select";
	import type { Table as TableType } from "@tanstack/table-core";
	import type { Post } from "types/post";

	interface Props {
		table: TableType<Post>;
	}

	const { table }: Props = getContext("data-table");
</script>

<div class="flex items-center justify-between px-2 py-4">
	<div class="text-muted-foreground flex-1 text-sm invisible">
		{0} of {table.getRowCount()} row(s) selected.
	</div>
	<div class="flex items-center space-x-8">
		<div class="flex items-center space-x-2">
			<p class="text-sm font-medium">Rows per page</p>
			<Select.Root
			 type="single"
			 name="visibleRows"
			 onValueChange={v => table.setPageSize(+v)}
			>
				<Select.Trigger class="h-8 w-[70px]">
					{table.getState().pagination.pageSize}
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="10">10</Select.Item>
					<Select.Item value="20">20</Select.Item>
					<Select.Item value="30">30</Select.Item>
					<Select.Item value="40">40</Select.Item>
					<Select.Item value="50">50</Select.Item>
				</Select.Content>
			</Select.Root>
		</div>
		<div class="flex w-[150px] items-center justify-center text-sm font-medium">
			Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
		</div>
		<div class="flex items-center space-x-2">
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.firstPage()}
				disabled={!table.getCanPreviousPage()}
			>
				<i class="fa-regular fa-chevrons-left"></i>
				<span class="sr-only">Go to first page</span>
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}
			>
				Previous
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}
			>
				Next
			</Button>
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.lastPage()}
				disabled={!table.getCanNextPage()}
			>
				<i class="fa-regular fa-chevrons-right"></i>
				<span class="sr-only">Go to last page</span>
			</Button>
		</div>
	</div>
</div>
