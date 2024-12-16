import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createMarkup(arr) {
  return arr
    .map(
      ({
        id,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => `
        <li data-id="${id}" class="list__item">
          <a class="gallery-link" href="${largeImageURL}">                          
            <img class="item-img" src="${webformatURL}" alt="${tags}"/>                  
          </a>
          <ul class="item-container-list">
              <li class="container-list">
                <h3 class="item-title">Likes</h3>
                <p class="item-content">${likes}</p>
              </li>
              <li class="container-list">
                <h3 class="item-title">Views</h3>
                <p class="item-content">${views}</p>
              </li>
              <li class="container-list">
                <h3 class="item-title">Comments</h3>
                <p class="item-content">${comments}</p>
              </li>
              <li class="container-list">
                <h3 class="item-title">Downloads</h3>
                <p class="item-content">${downloads}</p>
              </li>
            </ul>          
        </li>
    `
    )
    .join('');
}

export const lightbox = new SimpleLightbox('.list a', {
  captionsData: 'alt',
  captionDelay: 250,
});
