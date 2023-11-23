// A bunch of methods for dealing with Spotify's OAuth system
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

const authHeader =
  'Basic ' +
  new Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
    'base64',
  );

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
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authHeader,
      },
      body: formURLEncode({
        grant_type: 'authorization_code',
        code: authCode,
        redirect_uri: 'http://localhost:5173/auth/login',
      }),
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

export const refreshToken = async (session) => {
  const res = await (
    await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authHeader,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: session.data.auth.refreshToken,
        client_id: SPOTIFY_CLIENT_ID,
      }),
    })
  ).json();

  await session.update(({ auth }) => {
    return {
      auth: { ...auth, accessToken: res.access_token },
    };
  });
};

export const getTopTracks = async (session) => {
  const res = await (
    await fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: { Authorization: `Bearer ${session.data.auth.accessToken}` },
    })
  ).json();

  if (res.error && session.data.auth.refreshToken) {
    // Refresh the token and try again
    console.log(
      `Error: ${res.error.message}, attempting to refresh access token...`,
    );
    await refreshToken(session);
    const newRes = await getTopTracks(session);
    return newRes;
  }

  return res.items;
};
