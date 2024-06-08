export function filterSearch() {
  const movie = document.getElementById("movies");
  const series = document.getElementById("series");
  //   const cartoons = document.getElementById("cartoons");
  const year = document.getElementById("year");

  let checked = [];
  movie.checked ? checked.push("movie") : checked.push("");
  series.checked ? checked.push("series") : checked.push("");

  checked = checked.filter((item) => item !== "").toString();
  if (movie.checked && series.checked) {
    checked = "";
  }

  const yearSearch = year.value ? year.value : "";

  return { checked, yearSearch };
}
