// axios //

import axios from 'axios'; 

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '38858109-c828e4419821e6c1b097414a2';

const perPage = 40;
export async function fetchImages(queryToFetch, pageToFetch) {
  const response = await axios.get(
    `?key=${KEY}&q=${queryToFetch}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageToFetch}&per_page=${perPage}`
  );
  console.log(response)
  return response.data;
  
}