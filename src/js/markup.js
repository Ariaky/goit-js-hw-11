import "simplelightbox/dist/simple-lightbox.min.css";

function createMarkup(dataSearch, galleryEl, lightbox) {
  if (!dataSearch) {
    galleryEl.innerHTML = '';
  }
  const imageData = dataSearch.hits
    .map( 
      item =>
      `<a class="gallery__link" href="${item.largeImageURL}">
          <div class="cards">
              <img class="gallery-item__img" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width="350" height="214" />
              <div class="info">
                  <p class="info-item"><b>Likes</b>${item.likes}</p>
                  <p class="info-item"><b>Views</b>${item.views}</p>
                  <p class="info-item"><b>Comments</b>${item.comments}</p>
                  <p class="info-item"><b>Downloads</b>${item.downloads}</p>
              </div>
          </div>
      </a>`
    )
    .join("");
  galleryEl.insertAdjacentHTML('beforeend', imageData);
  lightbox.refresh();
}
  
  export { createMarkup };