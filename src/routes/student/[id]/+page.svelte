<script lang="ts">
	import type { PageData } from './$types';

	import { Avatar } from '@skeletonlabs/skeleton';
	import { getDocument } from '$lib/firebase';
	import { nameFormatter } from '$lib/search';
	import { onMount } from 'svelte';

	export let data: PageData;
	let student: studentInterface | undefined;
	let loading = true;
	interface studentInterface {
		image: string;
		name: string;
	}

	onMount(async () => {
		//@ts-ignore
		student = await getDocument(`/students/${data.id}`);
		loading = false;
	});
</script>

<title>
    {(student?.name != undefined) ? nameFormatter(student.name) : "No student"}
</title>

<div class="w-96 variant-filled-surface rounded-md overflow-hidden p-4 flex space-x-4">
	{#if student}
		<Avatar src={student.image} width="w-36" />
		<div>
			<p class="font-bold">{nameFormatter(student.name)}</p>
		</div>
	{:else if loading}
        <div class="placeholder-circle animate-pulse"></div>
        <div class="palaceholder animate-pulse"></div>
    {:else}
		No student with this id
	{/if}
</div>
