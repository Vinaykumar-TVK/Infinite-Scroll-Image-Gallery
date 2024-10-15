
const apiKey = process.env.REACT_APP_PUBLIC_IMAGE_API;
console.log("API Key:", apiKey); 
console.log("All Env Variables:", process.env);
export async function fetchImages(pageParam: number) {
  const perPage = 25;
  const searchQuery = "nature";
  const url = `https://api.unsplash.com/search/photos?page=${
    pageParam || 1
  }&per_page=${perPage}}&query=${searchQuery}&client_id=${apiKey}`;
  console.log("Fetching URL:", url);
  const response = await fetch(url);
  

  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  return await response.json();
}