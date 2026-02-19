/* MOVIES API */
async function fetchMovieAPI (searchQuery) {
    const movieListElement = document.querySelector(".movie__container--list")
    movieListElement.classList += " loading__list"
    const movies = await fetch(`https://www.omdbapi.com/?apikey=df6f10c4&s=${searchQuery}`); 
    const moviesData = await movies.json();
    movieListElement.classList.remove("loading__list")
    const sixMoviesList = moviesData.Search.slice(0, 6);
    // console.log(moviesData.Search);
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
    fetchMovieAPI(searchQuery);
    const searchResultElement = document.querySelector(".movies__search-header")
    searchResultElement.innerHTML = displaySearchKeyword(searchQuery);
}

function displaySearchKeyword (searchQuery) {
    return `<h2>Search Results: <span style="color:blue">"${searchQuery}"</span></h2>`
}

function filterMovies(event) {

    const sortMovies = document.getElementById("dropdown__sort--bar").value;
    const movies = Array.from(document.querySelectorAll(".movie"))
    // for(let i = 0; i < movies.length; i++) {
    //     console.log("unsorted movies", movies[i].textContent);
    // }


    movies.sort((a, b) => {
        const movieA = a.querySelector('h3').textContent.toLocaleLowerCase()
        const movieB = b.querySelector('h3').textContent.toLocaleLowerCase()

        if (sortMovies === "A_to_Z") {
            return movieA.localeCompare(movieB)
        } else if (sortMovies === "Z_to_A"){
            return movieB.localeCompare(movieA)
        }
    })

    
    const parent = movies[0].parentNode;
    parent.innerHTML = "";
    movies.forEach(movie => parent.appendChild(movie));
    // for(let i = 0; i < movies.length; i++) {
    //     console.log("sorted movies", movies[i].textContent);
    // }
}

/* HAMBURGER MENU */

function openMenu() {
    document.body.classList += " menu--open";
}

function closeMenu() {
    document.body.classList.remove("menu--open")
}
