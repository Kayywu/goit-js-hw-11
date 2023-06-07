import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
let queryToFetch = '';
let pageToFetch = 1;


const searchEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');

searchEl.addEventListener('submit', onSubmitForm);
btnLoad.addEventListener('click', onBtnLoadMoreClick);


function onSubmitForm(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value;
  if (!query.trim() || query === queryToFetch) {
    return;
  }
  queryToFetch = query;
  galleryEl.innerHTML = '';
  btnLoad.classList.add('unvisible');
  getImages(queryToFetch, pageToFetch);
  searchEl.reset();
}


function onBtnLoadMoreClick() {
  btnLoad.classList.add('unvisible');
  pageToFetch += 1;
  getImages(queryToFetch, pageToFetch);
}


function fetchImages(queryToFetch, pageToFetch) {
  const searchParams = new URLSearchParams({
    key: '37030220-55e5b35e4370d44ae057df5d9',
    q: queryToFetch,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: pageToFetch,
  });
  return fetch(`${BASE_URL}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}


function renderImages(images) {

  const markup = images.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
    </div>`;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}


function getImages(query, pageToFetch) {
  fetchImages(query, pageToFetch)
    .then(images => {
      console.log(images);
      if (!images.hits.length) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
    })
  
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops! Something went wrong!');
    });
 }