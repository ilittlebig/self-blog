<div class="p-6 bg-card border rounded-lg flex flex-col md:flex-row gap-6 animate-pulse">
	<div class="bg-accent w-full md:w-1/3 h-60 object-cover rounded-lg"></div>
	<div class="flex-1 flex flex-col justify-between">
		<div class="flex flex-col gap-y-1">
			<div class="flex flex-wrap gap-1 mb-3">
				{#each { length: 3 }}
					<div class="w-24 h-[22px] rounded-full bg-accent"></div>
				{/each}
			</div>
			<div class="w-64 h-[32px] rounded-full bg-accent"></div>
			<div class="w-32 h-[24px] rounded-full bg-accent"></div>
		</div>
		<div class="w-32 h-[22px] rounded-full bg-accent"></div>
	</div>
</div>
