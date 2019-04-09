const movie_genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
}

//Movie List API
const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const data = []

//電影類型分類清單
const genres = document.getElementById('genres-data-panel')
const movie = document.getElementById('movie-data-panel')


axios.get(INDEX_URL).then(response => {
    data.push(...response.data.results)
    console.log(data)
}).catch(error => console.log(error))

//left side data - add movie genres list
const genresName = document.createElement('div')
genresName.classList.add('list-group')
genresName.classList.add('myList')
for (let i = 1; i < 20; i++) {
    genresName.innerHTML += `
        <a href="#" class="list-group-item list-group-item-action" id="${i}">${movie_genres[i]}</a>
    `
}
genres.appendChild(genresName)

$('.myList a').on('click', function (event) {
    event.preventDefault()
    $(this).tab('show')
    console.log(this.id)
    movieList(this.id)
})

let resultID = []

function movieList(number) {
    resultID = []
    for (index in data) {
        //console.log(`title = ${data[index]["title"]} ;    genres = ${data[index]["genres"]}`)
        decideMovie(number, data[index]["id"], data[index]["genres"])
    }
    console.log(`resultID = ${resultID}`)
    displayDataList(resultID)
}

//判斷分類是否有包含此電影
function decideMovie(number, movieID, genresArray) {
    if (genresArray.includes(Number(number))) {
        resultID.push(movieID)
    }
}

function displayDataList(result) {
    let htmlContent = ''
    for (index in result) {

        let id = result[index]-1

        htmlContent += `
            <div class="col-sm-3">
                <div class="card mb-2">
                    <img class="card-img-top " src="${POSTER_URL}${data[id]["image"]}" alt="Card image cap">
                  
                    <div class="card-body">
                        <h6 class="card-title">${data[id]["title"]}</h5>
                
                        <!-- Genres -->
                        <div id="genres-span">
                `
        let genre = data[id]["genres"]
        for (index in genre) {
            htmlContent += `
                <span class="badge badge-light">${movie_genres[genre[index]]}</span>
                `
        }

        htmlContent += `
                        </div>
                    </div>

                </div>
            </div>
        `

    }
    movie.innerHTML = htmlContent
}