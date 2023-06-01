
// navbar scroll background
const navBar= document.getElementById("nav");
window.addEventListener("scroll", ()=>{
if(window.scrollY > 0){
navBar.classList.add("bg-scroll");
}
else{
 navBar.classList.remove("bg-scroll");
}
});
// hero section background image and text fectch
const headerBg= document.getElementById("header");
const names =document.getElementById("name");
const text = document.getElementById("overview");
async function headerImage() {
try {
   const response = await fetch(
     "https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213"
   );
   const data = await response.json();
   //  console.log(data.results)

   const res =
     data.results[Math.floor(Math.random() * data.results.length - 1)]
      ;
   const images = `https://image.tmdb.org/t/p/original${res?.backdrop_path} `;
   // console.log(images)

   headerBg.style.backgroundImage = `url(${images})`;
  names.textContent=res.name
text.textContent=res.overview
// console.log(res.name)
} catch (error) {
 displayError(error)  
}
}
headerImage();
function displayError( imageerror){
  console.log(imageerror.message)
}





// Call the main functions the page is loaded
window.onload = () => {
  getOriginals();
  getTrendingNow();
  getTopRated();
  getComedies();
}

function fetchMovies(url, dom_element, path_type) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('something went wrong')
      }
    })
    .then(data => {
      showMovies(data, dom_element, path_type)
    })
    .catch(error_data => {
      console.log(error_data)
    })
}

//  ** Function that displays the movies to the DOM **
showMovies = (movies, dom_element, path_type) => {
  
  // Create a variable that grabs id or class
  var moviesEl = document.querySelector(dom_element)

  // Loop through object
  for (var movie of movies.results) {

    // Within loop create an img element
    var imageElement = document.createElement('img')

    // Set attribute
    imageElement.setAttribute('data-id', movie.id)

    // Set source
    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`

    // Add event listener to handleMovieSelection() onClick
    imageElement.addEventListener('click', e => {
      handleMovieSelection(e)
    })
    // Append the imageElement to the dom_element selected
    moviesEl.appendChild(imageElement)
  }
}

// ** Function that fetches Netflix Originals **
function getOriginals() {
  let url =
    'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
  fetchMovies(url, '.original', 'poster_path')
}
// ** Function that fetches Trending Movies **
function getTrendingNow() {
  let url =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
  fetchMovies(url, '#trending', 'poster_path')
}
// ** Function that fetches Top Rated Movies **
function getTopRated() {
  let url =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
  fetchMovies(url, '#top-rated', 'poster_path')
}

function getComedies(){
  let url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=35'

fetchMovies(url, "#comedy", "poster_path");
}
