let cache = new Map();

export const songwhip = async (songURL) => {
  if (cache.has(songURL)) return cache.get(songURL);

  let apiURL = 'https://songwhip.com/api/songwhip/create';
  const res = await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      country: 'US',
      url: songURL,
    }),
  });

  const json = (await res.json()).data;
  cache.set(songURL, json);
  return json;
};

export const formURLEncode = (obj) => {
  const formData = new URLSearchParams();
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }
  return formData.toString();
};
