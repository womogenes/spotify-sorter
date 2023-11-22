import { redirect } from '@sveltejs/kit';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { formURLEncode } from 'src/lib/utils.js';

let redirect_uri = `http://localhost:5173`;

export const GET = async ({ url, locals }) => {
  // Is the user already logged in?
  if (locals.session.data.user) {
    console.log('User already logged in, redirecting.');
    throw redirect(302, '/');
  }

  // Has a code for us!
  const code = url.searchParams.get('code');
  if (code) {
    // Get access token and refresh token
    const accessToken = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: formURLEncode({
        code: code,
        redirect_uri: 'http://localhost:5173/auth/login',
        grant_type: 'authorization_code',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          new Buffer.from(
            `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
          ).toString('base64'),
      },
      json: true,
    });
    const token = await accessToken.json();
    await locals.session.set({
      user: {
        authCode: code,
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
      },
    });

    throw redirect(302, '/');

    //
  } else {
    console.log('No code, redirecting...');
    const loginURL = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:5173/auth/login&scope=user-read-currently-playing user-top-read`;
    throw redirect(302, loginURL);
  }
};
