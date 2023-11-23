/* import { songwhip } from '../lib/utils.js';

let res = await songwhip(
  'https://open.spotify.com/track/0jn8sYeWOdYHjdF2cBmF75?si=726684d2a0a74d65',
);
 */

import { getTopTracks } from 'src/routes/auth/spotifyAuth.js';

// Get top items (artists, etc.)
export const load = async ({ parent, locals }) => {
  // Check for logged in
  if (!locals.session.data.auth) return;

  const topTracks = await getTopTracks(locals.session);
  return {
    topTracks: topTracks.map((track) => ({
      imageURL: track.album.images[0].url,
      artists: track.artists.map((artist) => ({
        name: artist.name,
        href: artist.external_urls.spotify,
      })),
      title: track.name,
      previewURL: track.preview_url,
      href: track.external_urls.spotify,
    })),
  };

  /*
    Relevant things:
      .album.images[0].url
      .artists[i].name
      .name
      .preview_url (mp3 stream !!)
      .external_urls.spotify
  */
};
