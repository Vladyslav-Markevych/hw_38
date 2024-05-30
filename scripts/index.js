// import { searchCollection } from "./mock.js"
import { debounce } from "./helpers/debounce.js";
import { createPreviewUrl, createDetailedInfoUrl } from "./helpers/urls.js";
import {
  createTile,
  createPreviewItem,
  renderMediaInfo,
  renderMainComponent,
  renderNotFound,
} from "./components.js";
import { createCollectionList } from "./helpers/createCollectionList.js";
import {
  getSearchElement,
  getPostersContainer,
  getPreviewList,
} from "./helpers/getElements.js";

function hidePreview() {
  const previewList = getPreviewList();
  previewList.classList.add("hidden");
  previewList.innerHTML = "";
}

function hidePreviewAndCreatePosters(previewResponse) {
  hidePreview();

  const collection = createCollectionList(previewResponse.data, createTile);
  const list = getPostersContainer();
  list.innerHTML = collection;
}

function handleInputSearch(previewResponse) {
  return async function (event) {
    const value = event.target.value;
    if (value.length > 2) {
      const data = await fetch(createPreviewUrl(value));
      const response = await data.json();
      previewResponse.data = response;
      const collection = createCollectionList(
        response,
        createPreviewItem,
        true,
        5
      );
      const previewList = getPreviewList();
      previewList.classList.remove("hidden");
      previewList.innerHTML = collection;
    } else {
      hidePreview();
    }
  };
}

function handleSearch(previewResponse) {
  return function (event) {
    event.stopImmediatePropagation();
    const value = event.target.value;
    if (!value) {
      hidePreview();
    }

    hidePreviewAndCreatePosters(previewResponse);
  };
}

function handleSearchButton(previewResponse) {
  return function (event) {
    const search = getSearchElement();
    const value = search.value;

    if (!value) {
      return false;
    }

    hidePreviewAndCreatePosters(previewResponse);
  };
}

function app() {
  let previewResponse = {};
  const search = getSearchElement();
  const searchButton = document.getElementById("search-button");
  searchButton.addEventListener("click", handleSearchButton(previewResponse));
  search.addEventListener("search", handleSearch(previewResponse));
  search.addEventListener(
    "input",
    debounce(handleInputSearch(previewResponse), 500)
  );
}

function previewMediaInfo() {
  const previewList = document.getElementById("preview-list");
  const previewMainList = document.getElementById("posters");
  previewList.addEventListener("click", getMediaInfo(".preview-item"));
  previewMainList.addEventListener("click", getMediaInfo(".movie-card"));
}

function getMediaInfo(param) {
  return function (event) {
    getMediaInfoUpdate(event, param);
  };
}

function getMediaInfoUpdate(event, param) {
  const item = event.target.matches(param);
  const notFound = event.target.matches(".notFound");
  const itemUp = event.target.closest(param);
  if (item && !notFound) {
    const id = event.target.dataset.id;
    history.pushState(null, null, `/media?id=${id}`);
    renderMediaPage();
  } else if (itemUp && !notFound) {
    history.pushState(null, null, `/media?id=${itemUp.dataset.id}`);
    renderMediaPage();
  }
}

function handleReturnToHome(event) {
  history.pushState(null, null, `/`);
  renderMainPage();
}

async function renderMediaPage() {
  try {
    const id = location.search.slice(4);
    const data = await fetch(createDetailedInfoUrl(id));
    const response = await data.json();
    const {
      Title: title,
      Released: released,
      Country: country,
      Actors: actors,
      Plot: plot,
      Poster: poster,
    } = response;
    renderMediaInfo({ title, released, country, actors, plot, poster });

    document
      .getElementById("back-to-home")
      .addEventListener("click", handleReturnToHome);
  } catch (error) {
    renderNotFound();
  }
}

function renderMainPage() {
  renderMainComponent();
  app();
  previewMediaInfo();
}

function router() {
  if (location.pathname.startsWith("/media")) {
    renderMediaPage();
  } else {
    renderMainPage();
  }
}

router();
