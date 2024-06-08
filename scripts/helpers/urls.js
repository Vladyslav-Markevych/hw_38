import { API_KEY } from "../constants.js";
import { filterSearch } from "./filter.js";

export function createPreviewUrl(value) {
  const { checked, yearSearch } = filterSearch();
  return `https://www.omdbapi.com/?s=${value}&type=${checked}&y=${yearSearch}&apikey=${API_KEY}`;
}

export function createDetailedInfoUrl(id) {
  return `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`;
}
