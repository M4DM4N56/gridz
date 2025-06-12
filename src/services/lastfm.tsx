const BASE_URL = "http://ws.audioscrobbler.com/2.0/";
const API_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY;

export const searchAlbum = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}?method=album.search&album=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch album search: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};