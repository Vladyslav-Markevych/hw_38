import { movieNotFound } from "../components.js";

export function createCollectionList(
  data,
  createItem,
  showDefaultMessage,
  numberOfElements
) {
  const searchedCollection = data.Search;
  if (!data.Search) {
    return showDefaultMessage ? movieNotFound : [];
  }
  //   const series = document.getElementById("series");
  //   const { seriesCheck } = filterSearch();
  //   if (seriesCheck == "series") {
  //     return data.Search.slice(0, numberOfElements)
  //       .filter((item) => item.Type == "series")
  //       .map(({ Title: title, Year: year, Poster: poster, imdbID: id }) =>
  //         createItem({ poster, title, year, id })
  //       )
  //       .join("");
  //   }
  return data.Search.slice(0, numberOfElements)
    .map(({ Title: title, Year: year, Poster: poster, imdbID: id }) =>
      createItem({ poster, title, year, id })
    )
    .join("");
}
