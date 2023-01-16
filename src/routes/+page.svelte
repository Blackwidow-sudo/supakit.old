<script lang="ts">
	import { page } from '$app/stores'
	import PageTransition from '$lib/components/PageTransition.svelte'
	import type { PageData } from './$types'

	/**
	 * Props.
	 */
	export let data: PageData
</script>

<PageTransition>
	{#if !$page.data.session}
		<h1>I am not logged in</h1>
	{:else}
		<h1>Welcome {$page.data.session.user.email}</h1>
		<p>I am logged in!</p>
		<code>{JSON.stringify(data.session?.user)}</code>
	{/if}
</PageTransition>
