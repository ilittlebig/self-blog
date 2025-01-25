<script lang="ts">
	import { Github, Linkedin, BriefcaseBusiness } from "lucide-svelte";
	import { Separator } from "$lib/components/ui/separator";
</script>

<footer class="flex flex-col gap-y-8 py-12 mx-auto max-w-4xl w-full px-4 xl:px-0">
	<Separator class="md:block hidden" />
	<div class="flex justify-between">
		<p class="text-muted-foreground">
			<span class="fa-solid fa-copyright"></span>
			© 2025 Elias Sjödin. All rights reserved.
		</p>
		<div class="flex gap-x-8">
			<a href="https://www.github.com/ilittlebig/" class="flex items-center gap-x-1 text-muted-foreground hover:text-primary" aria-label="Github">
				<Github size="18" />
				Github
			</a>
			<a href="https://www.linkedin.com/in/elias-sj%C3%B6din-504a6322a/" class="flex items-center gap-x-1 text-muted-foreground hover:text-primary" aria-label="Linkedin">
				<Linkedin size="18" />
				LinkedIn
			</a>
			<a href="https://www.sjodinelias.com/" class="flex items-center gap-x-1 text-muted-foreground hover:text-primary" aria-label="Portfolio">
				<BriefcaseBusiness size="18" />
				Portfolio
			</a>
		</div>
	</div>
</footer>
