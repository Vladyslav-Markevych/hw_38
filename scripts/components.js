const createPreviewItem = ({ poster, title, year, id }) => `
    <li data-id="${id}" class="preview-item">
        <img class="preview-poster" src="${poster}" alt="poster for ${title}">
        <span class="preview-title">
            ${title}
        </span>
        <span class="preview-year">
            ${year}
        </span>
    </li>
`;

const createTile = ({ poster, title, year, id }) => `
    <div data-id="${id}" class="movie-card">
        <img src="${poster}"></img>
        <h3>${title} (${year})</h3>
    </div>
`;

const movieNotFound =
  "<li class='preview-item notFound'>Movie wasn't found</li>";

const renderMainComponent = () => {
  document.getElementById("app").innerHTML = `
<div class="container">
    <aside class="filters">
        <h2>Filters</h2>
        <div>
            <input type="checkbox" id="movies" name="type" value="movies">
            <label for="movies">Movies</label>
        </div>
        <div>
            <input type="checkbox" id="series" name="type" value="series">
            <label for="series">Series</label>
            <!-- Additional fields for series -->
            <div class="series-options" style="display: none;">
                <input type="number" id="season" placeholder="Season" min="1">
                <input type="number" id="episode" placeholder="Episode" min="1">
            </div>
        </div>
        <div>
            <input type="checkbox" id="cartoons" name="type" value="cartoons" disabled>
            <label class="disab-check" for="cartoons">Cartoons</label>
        </div>
        <div class='release'>
            <label for="year">Release Year:</label>
            <input type="number" id="year" placeholder="2023" min="1900" max="2023">
        </div>
    </aside>
    <main class="content">
        <div class="search-container">
            <div class="search-wrapper">
                <input type="search" class="search" id="search-box" placeholder="Enter a title...">
                <ul id="preview-list" class="preview-list hidden"></ul>
            </div>
            <button id="search-button">Search</button>
        </div>
        <div id="posters" class="results-container"></div>
    </main>
</div>    
    `;
};

const renderMediaInfo = ({
  title,
  released,
  country,
  actors,
  plot,
  poster,
  imdbRating,
  genre,
  director,
  runTime,
}) => {
  document.getElementById("app").innerHTML = `
    <head>Header</head>
   <main>
   <div class="wrapper">
      <div class="image-block">
        <img  class="poster" src="${poster}" alt="poster for ${title}" />
        <p class="description__name">IMDb: ${imdbRating} ⭐️</p>
      </div>
      <div class="description">
        <h1>${title}</h1>
        <p class="description__name">Title: <span class="description__text">${title}</span></p>
        <p class="description__name">Released: <span class="description__text">${released}</span></p>
        <p class="description__name">Country: <span class="description__text">${country}</span></p>
        <p class="description__name">Genre: <span class="description__text">${genre}</span></p>
        <p class="description__name">Director: <span class="description__text">${director}</span></p>
        <p class="description__name">Actors: <span class="description__text">${actors}</span></p>
        <p class="description__name">Duration: <span class="description__text">${runTime}</span></p>
        <p class="description__name">Description: <span class="description__text">${plot}</span></p>
      </div>
      </div>
    </main>
    <button class="back-button" id="back-to-home">Go Back</button>
`;
};

const renderNotFound = () => {
  return (document.getElementById("app").innerHTML = movieNotFound);
};

export {
  createPreviewItem,
  createTile,
  movieNotFound,
  renderMainComponent,
  renderMediaInfo,
  renderNotFound,
};
