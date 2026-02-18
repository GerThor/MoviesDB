
async function fetchMovieAPI (searchQuery) {
    const movieListElement = document.querySelector(".movie__container--list")
    movieListElement.classList += " loading__list"
    const movies = await fetch(`https://www.omdbapi.com/?apikey=df6f10c4&s=${searchQuery}`); 
    const moviesData = await movies.json();
    movieListElement.classList.remove("loading__list")
    const sixMoviesList = moviesData.Search.slice(0, 6);
    console.log(moviesData.Search);
    movieListElement.innerHTML = sixMoviesList.map((movie) => movieHTML(movie)).join("");

}

function movieHTML (movie) {
    return `<div class="movie">
        <img src="${movie.Poster}" alt="">
        <h3 class="movie__title--year">${movie.Title} (${movie.Year})</h3>
    </div>`;
}

function checkFormSubmission (event) {
    event.preventDefault();
    const searchQuery = document.getElementById("search__bar--input").value;
    console.log("Search string is: ", searchQuery);
    fetchMovieAPI(searchQuery);
    const searchResultElement = document.querySelector(".movies__search-header")
    searchResultElement.innerHTML = displaySearchKeyword(searchQuery);
}

function displaySearchKeyword (searchQuery) {
    return `<h2>Search Results: <span style="color:blue">"${searchQuery}"</span></h2>`
}