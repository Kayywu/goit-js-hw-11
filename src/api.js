// axios //

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '38858109-c828e4419821e6c1b097414a2';

async function fetchImages(queryToFetch, pageToFetch, perPage) {
  const response = await axios.get(
    `?key=${KEY}&q={querytoFetch}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageToFetch}&per_page=${perPage}`
  );
  console.log(response)
  return response.data;
  
}