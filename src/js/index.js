import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import * as Notify from "./notify"
import SearchApi from "./api";
import { createMarkup } from './markup';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')

const searchApi = new SearchApi();

loadMoreBtn.style.display = 'none';

searchFormEl.addEventListener('submit', getCurrentValue);
loadMoreBtn.addEventListener('click', setRequest);

// Function to handle the submit event
async function getCurrentValue(e) {
    e.preventDefault();

    searchApi.query = e.currentTarget.elements.searchQuery.value.trim();

    if (searchApi.query === '') {
       return Notify.emptyInput();
    }

    searchApi.resetPage();
    galleryEl.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    
    try {
        const dataSearch = await searchApi.fetchImages();

        if (dataSearch){
            Notiflix.Notify.success(`Hooray! We found ${dataSearch.totalHits} images.`);

            createMarkup(dataSearch, galleryEl, lightbox);

            if (dataSearch.totalHits > searchApi.perPage) {
                loadMoreBtn.style.display = 'block';
            }
        }
    }
    catch (error) {
        console.log(error);
    }
};

async function setRequest() {
    try {
        const dataSearch = await searchApi.fetchImages();

        if (!dataSearch) return;

        let totalPages = Math.ceil(dataSearch.totalHits / searchApi.perPage);
        if (totalPages < searchApi.page) {
            Notify.endOfSearch();
            loadMoreBtn.style.display = 'none';
        }

        createMarkup(dataSearch, galleryEl, lightbox);

        const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
    }
    catch (error) {
        Notify.errorRequest();
    }
};
 
let lightbox = new simpleLightbox('.gallery a')