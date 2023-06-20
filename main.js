// create constants to avoid repetitiveness
const BG_SCROLL_CLASS = "bg-scroll";
const IMDB_API_KEY = "19f84e11932abbc79e6d83f82d6d1045";

// Define error messages
const FETCH_MOVIE_ERROR_MESSAGE = "Something went wrong";

// navbar scroll background
const navBar = document.getElementById("nav");
// hero section background image and text fectch
const headerBg = document.getElementById("header");
const names = document.getElementById("name");
const text = document.getElementById("overview");

const originalsUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${IMDB_API_KEY}&with_networks=213`;
const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${IMDB_API_KEY}`;
const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${IMDB_API_KEY}&language=en-US&page=1`;
const comedyUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${IMDB_API_KEY}&with_genres=35`;

const movieDB = [
  {
    path: `poster_path`,
    element: ".original",
    url: originalsUrl,
  },
  {
    path: `poster_path`,
    element: "#trending",
    url: trendingUrl,
  },
  {
    path: `poster_path`,
    element: "#top-rated",
    url: topRatedUrl,
  },
  {
    path: `poster_path`,
    element: "#comedy",
    url: comedyUrl,
  },
];

async function headerImage() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${IMDB_API_KEY}&with_networks=213`
    );
    const data = await response.json();

    const res =
      data.results[Math.floor(Math.random() * data.results.length - 1)];
    const images = `https://image.tmdb.org/t/p/original${res?.backdrop_path} `;

    headerBg.style.backgroundImage = `url(${images})`;
    names.textContent = res.name;
    text.textContent = res.overview;
  } catch (error) {
    displayError(error);
  }
}

function displayError(imageerror) {
  console.log(imageerror.message);
}

async function fetchMovies(url, dom_element, path_type) {
  try {
    const response = await fetch(url);
    if (!response) throw new Error(FETCH_MOVIE_ERROR_MESSAGE);

    showMovies(await response.json(), dom_element, path_type);
  } catch (error) {
    displayError(error);
  }
}

//  ** Function that displays the movies to the DOM **
function showMovies(movies, dom_element, path_type) {
  // Create a variable that grabs id or class
  const moviesEl = document.querySelector(dom_element);

  // Loop through object
  for (const movie of movies.results) {
    // Within loop create an img element
    const imageElement = document.createElement("img");

    // Set attribute
    imageElement.setAttribute("data-id", movie.id);

    // Set source
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`;

    // Add event listener to handleMovieSelection() onClick
    imageElement.addEventListener("click", (e) => {
      handleMovieSelection(e); // Not defined
    });
    // Append the imageElement to the dom_element selected
    moviesEl.appendChild(imageElement);
  }
}

async function loadAllMovieData() {
  try {
    const payload = Object.values(movieDB).map(({ url, path, element }) =>
      fetchMovies(url, element, path)
    );
    await Promise.all(payload);
  } catch (error) {
    displayError(error);
  }
}

function toggleClass() {
  if (window.scrollY > 0) {
    navBar.classList.add(BG_SCROLL_CLASS);
  } else {
    navBar.classList.remove(BG_SCROLL_CLASS);
  }
}

// Call the main functions the page is loaded
window.onload = async () => {
  await headerImage();
  await loadAllMovieData();
};

window.addEventListener("scroll", toggleClass);
