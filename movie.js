const API_URL ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bd46198805a498241427c55f3eb0aea2&page1&page2';

const IMG_PATH ='https://image.tmdb.org/t/p/w1280';

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=bd46198805a498241427c55f3eb0aea2&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const header =document.querySelector('.header');
getMovies(API_URL)
async function  getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    ShowMovie(data.results);
}
function ShowMovie(movies){
    main.innerHTML ='';
    movies.forEach((movie) =>{
        const {title,poster_path ,vote_average,overview} =movie
        const movieInfo =document.createElement('div');
        movieInfo.classList.add('movie');
        movieInfo.innerHTML =`
            <img src="${IMG_PATH+poster_path}" alt=${title}>
            <div class="title">
                <h3>${title}</h3>
                <span class="${voteColour(vote_average)}"><i class="fas fa-star"></i>${vote_average}</span>
            </div>
            <div class="description">
                <p>
                    ${overview}
                </p>
            </div>
        `;
        main.appendChild(movieInfo);
    })
   

}
form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const searchTerm =search.value;
    if(searchTerm && searchTerm !==''){
        getMovies(SEARCH_API+searchTerm);
       
        header.innerHTML='';
        header.innerHTML=`<h1>Results For ${search.value}<h1>`;
        search.value ='';
    }
    else{
        window.location.reload();
    }
})

function voteColour(val){
    if(val >=8){
        return 'green';
    }
    else if(val >=5){
        return 'Orange';
    }
    else{
        return 'red'
    }
}