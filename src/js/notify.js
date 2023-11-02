import Notiflix from "notiflix";

function requestWrong () {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
};

function endOfSearch () {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
};

function totalImgSearch () {
    Notiflix.Notify.success(`Hooray! We found ${dataSearch.totalHits} images.`);
}
function errorRequest() {
    Notiflix.Notify.failure('Something went wrong. Please try again later.')
}

function emptyInput() {
    Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
  }

export { requestWrong, endOfSearch, totalImgSearch, errorRequest, emptyInput };