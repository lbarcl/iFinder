<script lang="ts">
	import { searchForPerson } from '$lib/search';
	import type { result } from '$lib/search';
	let showSuggestions = false;
	let query = '';

	let suggestions: Array<result> = [];

	function handleBlur() {
		if (suggestions.length == 0) showSuggestions = false;
	}

	async function handleChange() {
		if (query.length > 0) {
			suggestions = searchForPerson(query, 5);

			if (suggestions.length > 0) showSuggestions = true;
		} else showSuggestions = false;
	}

	$: if (!showSuggestions) suggestions = [];
</script>

<img src="https://ois.topkapi.edu.tr/images/auth_min_logo.png" alt="topkapı-logo" />

<title>
	iFinder
	<!--
		UniDate
		UniMatch
	-->
</title>

<div class={(showSuggestions ? 'bg-surface-700' : '') + ' w-96 rounded-3xl'}>
	<input
		type="search"
		class="input w-full border-0 drop-shadow-none"
		placeholder="Name of the student..."
		bind:value={query}
		on:input={handleChange}
		on:blur={handleBlur}
	/>
	{#if showSuggestions}
		<div class="my-2 rounded-b-lg flex flex-col">
			{#each suggestions as suggestion}
				<a
					class="rounded-md w-full mt-2 px-3 cursor-pointer bg-surface-700 hover:bg-surface-400"
					href={`/student/${suggestion.id}`}
				>
					{suggestion.name}
				</a>
			{/each}
		</div>
		<div class="h-2" />
	{/if}
</div>

<p class="mt-2">
	Welcome to the <strong>iFinder</strong>. The place where you can search for your classmates.
	ps: iFinder is not going to get any updates. You can still message me for deletation and profile updates.
</p>
