<script lang="ts">
	import { goto } from "$app/navigation";
	import { CircleUser } from "lucide-svelte";
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { signOutDialog } from "$lib/components/dialogs/auth/sign-out-dialog.svelte";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props }: { props: any })}
			<Button
				{...props}
				variant="ghost"
				size="icon"
				class="rounded-lg"
			>
				<CircleUser />
				<span class="sr-only">Toggle user menu</span>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">Elias</p>
				<p class="text-muted-foreground text-xs leading-none">elias@example.com</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onSelect={() => goto("/dashboard")}>
			Dashboard
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item onSelect={() => signOutDialog.open = true}>
			Sign Out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
