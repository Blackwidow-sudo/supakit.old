import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import { openRoutes } from '$lib/globals'
import { redirect } from '@sveltejs/kit'
import type { LayoutLoad } from './$types'

// Enable prerender for SPA mode
export const prerender = true

export const load: LayoutLoad = async event => {
	const { session } = await getSupabase(event)

	if (!session && !openRoutes.includes(event.url.pathname)) {
		throw redirect(307, '/login')
	}

	return {
		session
	}
}
