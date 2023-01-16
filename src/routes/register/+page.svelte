<script lang="ts">
	import { goto } from '$app/navigation'
	import { supabase } from '$lib/db'
	import PageTransition from '$lib/components/PageTransition.svelte'

	/**
	 * State.
	 */
	const formData = {
		username: '',
		email: '',
		password: '',
		pw_confirm: ''
	}

	/**
	 * Methods.
	 */
	async function onRegister() {
		if (formData.pw_confirm !== formData.password) {
			return alert("Your passwords didn't match")
		}

		const { error } = await supabase.auth.signUp({
			email: formData.email,
			password: formData.password,
			options: {
				data: {
					username: formData.username
				}
			}
		})

		if (error instanceof Error) {
			throw error
		}

		goto('/login')
	}
</script>

<PageTransition>
	<form
		class="max-w-md mx-auto mt-6"
		on:submit|preventDefault={onRegister}>
		<fieldset class="flex flex-col gap-1 items-center justify-center">
			<legend class="text-xl">Register</legend>
			<input
				required
				class="form-input"
				placeholder="Username"
				minlength="3"
				type="text"
				name="username"
				id="username"
				bind:value={formData.username} />
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
				minlength="8"
				type="password"
				name="password"
				id="password"
				bind:value={formData.password} />
			<input
				required
				class="form-input"
				placeholder="Confirm password"
				minlength="8"
				type="password"
				name="pw_confirm"
				id="pw_confirm"
				bind:value={formData.pw_confirm} />
			<input
				class="border rounded px-2 py-1 bg-sky-200 hover:bg-sky-300 cursor-pointer"
				type="submit"
				value="Submit" />
		</fieldset>
	</form>
</PageTransition>
