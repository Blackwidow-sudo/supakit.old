<script lang="ts">
	import '../app.css'
	import { goto, invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import { supabase } from '$lib/db'
	import Navbar from './Navbar.svelte'

	/**
	 * State.
	 */
	const routes = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'Register',
			href: '/register'
		},
		{
			name: 'Login',
			href: '/login'
		}
	]

	/**
	 * Lifecycle methods.
	 */
	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth')
		})

		return () => {
			subscription.unsubscribe()
		}
	})

	/**
	 * Methods.
	 */
	async function onLogout() {
		const { error } = await supabase.auth.signOut()

		if (error instanceof Error) {
			throw error
		}

		goto('/login')
	}
</script>

<Navbar
	{routes}
	on:logout={onLogout} />
<main class="container mx-auto">
	<slot />
</main>
