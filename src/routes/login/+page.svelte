<script lang="ts">
	import { goto } from '$app/navigation'
	import { supabase } from '$lib/db'
	import PageTransition from '$lib/components/PageTransition.svelte'

	/**
	 * State.
	 */
	const formData = {
		email: '',
		password: ''
	}

	/**
	 * Methods.
	 */
	async function onLogin() {
		const { error } = await supabase.auth.signInWithPassword(formData)

		if (error instanceof Error) {
			throw error
		}

		goto('/')
	}
</script>

<PageTransition>
	<form
		class="max-w-md mx-auto mt-6"
		on:submit|preventDefault={onLogin}>
		<fieldset class="flex flex-col gap-1 items-center justify-center">
			<legend class="text-xl">Login</legend>
			<input
				required
				class="form-input"
				placeholder="Email"
				type="email"
				name="email"
				id="email"
				bind:value={formData.email} />
			<input
				required
				class="form-input"
				placeholder="Password"
				type="password"
				name="password"
				id="password"
				bind:value={formData.password} />
			<input
				class="border rounded px-2 py-1 bg-sky-200 hover:bg-sky-300 cursor-pointer"
				type="submit"
				value="Sign in" />
		</fieldset>
	</form>
</PageTransition>
