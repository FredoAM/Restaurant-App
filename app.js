const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const API_URL2 = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=ab575b98c3bd1d784344b27fc603ba04&query="'


const main = document.getElementById('main');
const searchForm = document.querySelector('.form');
const searchBtn = document.querySelector('.btn-search')
const searchInp = document.querySelector('.search');
const contenedor = document.querySelector('.container-carro');
const container = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');




getMovies(API_URL);

getMoviesCarrusel(API_URL);


async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    
    const datos = data.results;
    datos.length = 9;

    showMovies(datos)
}


function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, backdrop_path } = movie

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-display');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-header">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

async function getMoviesCarrusel(url) {
    const res = await fetch(url)
    const data = await res.json()
    
    const datos = data.results;
    datos.length = 5;

    showMoviesCarrusel(datos)
}

function showMoviesCarrusel(movies) {
    /*.innerHTML = `<div class="navigation">
                            <i class="fas fa-caret-square-left prev-btn"></i>
                            <i class="fas fa-caret-square-right next-btn"></i>
                        </div>

                        <div class="navigation-visibility">
                            <div class="slide-icon active"></div>
                            <div class="slide-icon"></div>
                            <div class="slide-icon"></div>
                            <div class="slide-icon"></div>
                            <div class="slide-icon"></div>

                        </div>`*/
        movies.forEach((movie) => {
        const { title, release_date, vote_average, overview, backdrop_path } = movie;
        
        const movieE = document.createElement('div'); 
        movieE.classList.add('slide'); 
        

        movieE.innerHTML = `
            <div class="movie-poster">
                <img src="${IMG_PATH + backdrop_path}" alt="${title}">
                
            </div>
            <div class="movie-overview">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <p>${overview}</p>
                </div>
                <div class="classificacion">
                    <span class="${getClassByRate(vote_average)}">IMDb: ${vote_average}</span>
                    <span>Release Date: ${release_date}</span>
                    <span>Genre: </span>
                </div>
            </div>
            `
        slider.prepend(movieE)
    })
        slider.firstElementChild.classList.add('active');
        funcionalidad();
        
}


function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

searchBtn.addEventListener('click', e =>{
    e.preventDefault();
    searchForm.classList.toggle('active');
    searchInp.focus();
}) ;

searchInp.addEventListener("blur", function() {
    searchForm.classList.toggle('active');
    searchInp.value = '';
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = searchInp.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        contenedor.innerHTML = ''
        searchInp.value = ''
    } else {
        window.location.reload()
    }
})



function funcionalidad(){
        const slider = document.querySelector('.slider');
        const slides = document.querySelectorAll('.slide');
        const slideIcon = document.querySelectorAll('.slide-icon');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const slideShow = slides.length;
        var slideCount = 0;

        prevBtn.addEventListener('click', () =>{
    
            slides.forEach((slide) =>{
                slide.classList.remove('active');
            });
            slideIcon.forEach((slide) =>{
                slide.classList.remove('active');
            });
        
            slideCount --;
        
            if(slideCount < 0){
                slideCount = slideShow - 1;
            }
        
            slides[slideCount].classList.add('active');
            slideIcon[slideCount].classList.add('active');
            
        })
        
        nextBtn.addEventListener('click', () =>{
            slides.forEach((slide) =>{
                slide.classList.remove('active');
            });
            slideIcon.forEach((slide) =>{
                slide.classList.remove('active');
            });
            slideCount ++;
        
            if(slideCount > slideShow - 1){
                slideCount = 0;
            }
        
            slides[slideCount].classList.add('active');
            slideIcon[slideCount].classList.add('active');
        })
         //image slider autoplay
        var playSlider;

        var repeater = () => {
        playSlider = setInterval(function(){
            slides.forEach((slide) => {
            slide.classList.remove("active");
            });
            slideIcon.forEach((slideIcons) => {
            slideIcons.classList.remove("active");
            });

            slideCount++;

            if(slideCount > (slideShow - 1)){
            slideCount = 0;
            }

            slides[slideCount].classList.add("active");
            slideIcon[slideCount].classList.add("active");
        }, 4000);
        }
        repeater();

        //stop the image slider autoplay on mouseover
        slider.addEventListener("mouseover", () => {
        clearInterval(playSlider);
        });

        //start the image slider autoplay again on mouseout
        slider.addEventListener("mouseout", () => {
        repeater();
        });
    }