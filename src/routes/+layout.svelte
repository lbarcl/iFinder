<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import { initializeEngine } from '$lib/search';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeEngine();
	initializeStores();
</script>

<Toast />
<div class="container h-full mx-auto flex justify-center items-center">
	<div class="mt-20 flex justify-center items-center flex-col">
		<slot />
	</div>
</div>
