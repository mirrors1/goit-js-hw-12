import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconRejected from './img/bi_x-octagon.png';
import iconFulfilled from './img/bi_check2-circle.png';

import { loadData, searchParams } from './js/pixabay-api';
import { createMarkup, lightbox } from './js/render-functions';

const form = document.querySelector('.form');
const container = document.querySelector('.list');
const loadMore = document.querySelector('.js-load-more');
const loader = document.querySelector('.js-loader');

form.addEventListener('submit', searchPicture);
loadMore.addEventListener('click', onLoadMore);

let page = 1;
searchParams.set('page', page);
const per_page = searchParams.get('per_page');

function searchPicture(event) {
  event.preventDefault();
  const searchMsg = event.target.elements.message.value.trim();
  if (!searchMsg) {
    return;
  }
  loader.classList.remove('hidden');

  searchParams.set('q', searchMsg);
  page = 1;
  searchParams.set('page', page);

  loadData()
    .then(data => {
      loadMore.classList.add('hidden');
      loader.classList.remove('hidden');
      if (!data.total) {
        iziToast.show({
          theme: 'dark',
          iconUrl: iconRejected,
          backgroundColor: '#EF4040',
          message: `Sorry, there are no images matching your search query. Please try again!`,
          messageSize: '16px',
          messageLineHeight: '150%',
          position: 'topRight',
          maxWidth: '354px',
        });
        container.innerHTML = '';
        loadMore.classList.add('hidden');
        loader.classList.add('hidden');
        return;
      }
      container.innerHTML = createMarkup(data.hits);
      loader.classList.add('hidden');

      if (data.totalHits > page * per_page) {
        loadMore.classList.remove('hidden');
      } else {
        iziToast.show({
          theme: 'dark',
          iconUrl: iconFulfilled,
          backgroundColor: '#59a10d',
          message: `We're sorry, but you've reached the end of search results.`,
          messageSize: '16px',
          messageLineHeight: '150%',
          position: 'topRight',
        });
      }

      lightbox.refresh();
    })
    .catch(error => {
      iziToast.show({
        theme: 'dark',
        iconUrl: iconRejected,
        backgroundColor: '#EF4040',
        message: `Error: ${error.message}`,
        messageSize: '16px',
        messageLineHeight: '150%',
        position: 'topRight',
        maxWidth: '354px',
      });
      container.innerHTML = '';
      loadMore.classList.add('hidden');
      loader.classList.add('hidden');
    })
    .finally(() => {
      event.target.reset();
    });
}

async function onLoadMore() {
  loader.classList.remove('hidden');
  loadMore.classList.add('hidden');
  page++;
  searchParams.set('page', page);

  try {
    const data = await loadData();
    container.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    loader.classList.add('hidden');

    if (data.totalHits > page * per_page) {
      loadMore.classList.remove('hidden');
    } else {
      iziToast.show({
        theme: 'dark',
        iconUrl: iconFulfilled,
        backgroundColor: '#59a10d',
        message: `We're sorry, but you've reached the end of search results.`,
        messageSize: '16px',
        messageLineHeight: '150%',
        position: 'topRight',
      });
    }
    const card = document.querySelector('.list__item');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: cardHeight * 2.2,
      behavior: 'smooth',
    });

    lightbox.refresh();
  } catch (error) {
    iziToast.show({
      theme: 'dark',
      iconUrl: iconRejected,
      backgroundColor: '#EF4040',
      message: `Error: ${error.message}`,
      messageSize: '16px',
      messageLineHeight: '150%',
      position: 'topRight',
      maxWidth: '354px',
    });
  }
}
