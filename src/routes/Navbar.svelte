<script lang="ts">
	import { page } from '$app/stores'
	import { createEventDispatcher } from 'svelte'

	/**
	 * Types.
	 */
	interface Route {
		name: string
		href: string
	}

	/**
	 * Props.
	 */
	export let routes: Route[]

	/**
	 * State.
	 */
	$: entries = $page.data.session
		? routes.filter(r => !['/login', '/register'].includes(r.href))
		: routes

	/**
	 * Methods.
	 */
	const dispatch = createEventDispatcher()
</script>

<nav class="w-full bg-indigo-200">
	<ul class="flex flex-row gap-1 items-center justify-center">
		{#each entries as { name, href }}
			<li>
				<a
					{href}
					class="inline-block px-4 py-2 hover:bg-indigo-300"
					class:bg-indigo-300={$page.url.pathname === href}>
					{name}
				</a>
			</li>
		{/each}
		{#if $page.data.session}
			<button
				class="px-4 py-2 hover:bg-indigo-300"
				type="button"
				on:click={() => dispatch('logout')}>Logout</button>
		{/if}
	</ul>
</nav>
