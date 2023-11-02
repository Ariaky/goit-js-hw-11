import axios from "axios";
import * as Notify from "./notify"

const API_KEY = '40316933-e4107de9a39566c46b6979f3b';
const BASE_URL = 'https://pixabay.com/api/';

export default class SearchApi {
  constructor() {
    this.perPage = 40;
    this.page = 1;
    this.searchRequest = '';
  }

  async fetchImages() {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
          key: API_KEY,
          q: this.searchRequest,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: this.perPage,
        },
      });

      if (response.data.total === 0) {
        Notify.requestWrong();
        return null;
      }
      this.page +=1;

      const responseData = {
        total: response.data.total,
        totalHits: response.data.totalHits,
        hits: response.data.hits,
      }
      return responseData;
    }
    catch (error) {
      Notify.errorRequest();
      return null;
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchRequest;
  }

  set query(newQuery) {
    this.searchRequest = newQuery;
  }
}