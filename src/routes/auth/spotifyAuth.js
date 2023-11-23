// A bunch of methods for dealing with Spotify's OAuth system
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export const formURLEncode = (obj) => {
  const formData = new URLSearchParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  return formData.toString();
};

export const loginUser = async (authCode, session) => {
  const tokens = await (
    await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: formURLEncode({
        code: authCode,
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
    })
  ).json();

  // Get the profile and cache our tokens
  const profile = await (
    await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    })
  ).json();

  await session.set({
    auth: {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    },
    profile,
  });
};

export const getTopTracks = async (session) => {
  return await (
    await fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: { Authorization: `Bearer ${session.data.auth.accessToken}` },
    })
  ).json();
};
