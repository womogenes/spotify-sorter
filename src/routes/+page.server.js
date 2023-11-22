import { songwhip } from '../lib/utils.js';

let res = await songwhip(
  'https://open.spotify.com/track/0jn8sYeWOdYHjdF2cBmF75?si=726684d2a0a74d65',
);
console.log(res.item.links.youtubeMusic);
