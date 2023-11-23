import { redirect } from '@sveltejs/kit';
import { SPOTIFY_CLIENT_ID } from '$env/static/private';
import { loginUser } from '../spotifyAuth.js';

export const GET = async ({ url, locals }) => {
  // Is the user already logged in?
  if (locals.session.data.user) {
    console.log('User already logged in, redirecting.');
    throw redirect(302, '/');
  }

  // Has a code for us!
  const code = url.searchParams.get('code');
  if (code) {
    // Register this user and put stuff in session
    await loginUser(code, locals.session);
    throw redirect(302, '/');

    //
  } else {
    console.log('No code, redirecting...');
    const endpoint = 'https://accounts.spotify.com/authorize';
    const redirect_uri = 'http://localhost:5173/auth/login';
    const scopes = ['user-library-read', 'user-top-read'].join(' ');
    const loginURL = `${endpoint}?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&scope=${scopes}`;
    throw redirect(302, loginURL);
  }
};
