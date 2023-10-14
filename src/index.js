import Notiflix from 'notiflix';
import { fetchImages } from './api'

const BASE_URL = 'https://pixabay.com/api/';
let queryToFetch = '';
let pageToFetch = 1;
const perPage = 10;


const searchEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');

searchEl.addEventListener('submit', onSubmitForm);
btnLoad.addEventListener('click', onBtnLoadMoreClick);


function onSubmitForm(event) {
  event.preventDefault();
  const query = event.currentTarget.elements.searchQuery.value;
  if (!query.trim() || query === queryToFetch) {
    btnLoad.classList.remove('invisible')
    return;
  }
  queryToFetch = query;
  galleryEl.innerHTML = '';
  getImages(queryToFetch, pageToFetch);
  searchEl.reset();
  
}


function onBtnLoadMoreClick() {
  pageToFetch += 1;
  getImages(queryToFetch, pageToFetch);
}




// rendering images //

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

const totalHits = 0;

async function getImages(query, pageToFetch, perPage = 10) {
  try {
    const images = await fetchImages(query, pageToFetch);
   console.log(images)
    renderImages(images);
    totalHits = images.totalHits;
    
    if (pageToFetch * perPage >= totalHits) {
      btnLoad.classList.add('invisible');
    }

      if (!images.hits?.length) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
  }
     catch(error) {
      console.log(error);
      Notiflix.Notify.failure('Oops! Something went wrong!');
    }
 } 