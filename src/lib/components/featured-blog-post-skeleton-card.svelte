<div class="p-0 md:p-4 md:p-6 bg-card border rounded-lg flex flex-col md:flex-row md:gap-4 md:gap-6 animate-pulse">
	<div class="bg-accent w-full md:w-1/3 h-56 md:h-60 object-cover rounded-t-lg md:rounded-lg"></div>
	<div class="flex-1 flex flex-col justify-between p-4 md:p-0">
		<div>
			<div class="flex flex-wrap gap-1 mb-3">
				{#each { length: 3 }}
					<div class="w-16 h-[22px] bg-accent rounded-full"></div>
				{/each}
			</div>
			<div class="w-3/4 h-6 md:h-8 bg-accent rounded-full mb-2"></div>
			<div class="w-2/4 h-4 md:h-6 bg-accent rounded-full mb-4"></div>
		</div>
		<div class="w-1/4 h-4 md:h-6 bg-accent rounded-full"></div>
	</div>
</div>
