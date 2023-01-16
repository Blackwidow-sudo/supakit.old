import { getServerSession } from '@supabase/auth-helpers-sveltekit'
import { openRoutes } from '$lib/globals'
import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async event => {
	const session = await getServerSession(event)

	if (!session && !openRoutes.includes(event.url.pathname)) {
		throw redirect(307, '/login')
	}

	return {
		session
	}
}
