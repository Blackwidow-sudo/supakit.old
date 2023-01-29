<script lang="ts">
	import { fade, type FadeParams } from 'svelte/transition'

	/**
	 * Props.
	 */
	export let inParams: FadeParams = {
		delay: 150,
		duration: 100
	}

	export let outParams: FadeParams = {
		duration: 100
	}
</script>

<div
	in:fade={inParams}
	out:fade={outParams}>
	<slot />
</div>
