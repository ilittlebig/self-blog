/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-25
 */

import { createRawSnippet, mount, unmount } from "svelte";
import { formatDate } from "$lib/utils/date";
import { renderSnippet, renderComponent } from "$lib/components/ui/data-table";
import { DataTable } from "$lib/components/data-table";
import SignupsRowActions from "$lib/components/row-actions/signups-row-actions.svelte";
import type { Post } from "types/post";
import type { ColumnDef } from "@tanstack/table-core";

export const columns: ColumnDef<Post>[] = [
	{
		id: "status",
		accessorFn: (row: Post) => "",
		header: "Status",
		size: 60,
		cell: ({ row }) => {
			const value: string = "Published";//row.getValue("status");
			return renderComponent(DataTable.BadgeCell, {
				value,
				variant: "outline"
			});
		},
	},
	{
		accessorFn: (row: Post) => "",
		header: "Featured",
		size: 60,
	},
	{
		accessorFn: (row: Post) => row.title,
		header: "Title",
	},
	{
		accessorFn: (row: Post) => formatDate(row.created_at),
		header: "Created",
		size: 100,
	},
	{
		id: "actions",
		header: "",
		size: 40,
		cell: ({ row }) => {
			const rowActionsCellSnippet = createRawSnippet<[Post]>(getOriginal => {
				const post = getOriginal();
				return {
					render: () => `<div class="flex justify-end"></div>`,
					setup: target => {
						const comp = mount(SignupsRowActions, {
							target,
							props: { post },
						});
						return () => unmount(comp);
					}
				};
			});
			return renderSnippet(rowActionsCellSnippet, row.original);
		},
	},
];
