import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals }) => {
  await locals.session.destroy();
  throw redirect(302, '/');
};
