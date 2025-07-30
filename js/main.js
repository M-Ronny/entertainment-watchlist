let storePoster = JSON.parse(localStorage.getItem('poster'))
if (storePoster === null) {
  storePoster = []
}
    
localStorage.setItem('poster', JSON.stringify(storePoster))

let storeTitle = JSON.parse(localStorage.getItem('title'))
if (storeTitle === null) {
  storeTitle = []
}
localStorage.setItem('title', JSON.stringify(storeTitle))

let storeId = JSON.parse(localStorage.getItem('id'))
if (storeId === null) {
  storeId = []
}
localStorage.setItem('id', JSON.stringify(storeId))


const goFetch = document.querySelector('button')

if (goFetch) {
  goFetch.addEventListener('click', getFetch)
}

function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://imdb.iamidiotareyoutoo.com/search?q=${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('.result').textContent = ''
        for (let i = 0; i < data.description.length; i++) {
          document.querySelector('.result').style.height = '2500px'

          const title = document.createElement('h1')
          const h3 = document.createElement('h3')
          const img = document.createElement('img')
          const button = document.createElement('button')
          const remove = document.createElement('button')
          const section = document.createElement('section')
          const movieOrTV = document.createElement('div')
          const poster = document.createElement('div')

          title.classList.add('title')
          section.classList.add('minSection')
          movieOrTV.classList.add('moiveOrTV')
          poster.classList.add('poster')
          button.classList.add('watchlist')
          button.classList.add(`add${i}`)
          remove.classList.add('watchlist')
          remove.classList.add('display')
          remove.classList.add(`btn${i}`)
          button.value = `${i}`
          remove.value = `${i}`
          //button.value = data.description[i]['#IMDB_ID']
          button.id = data.description[i]['#IMDB_ID']

          title.textContent = data.description[i]['#TITLE']
          h3.textContent = data.description[i]['#YEAR']
          
          if (!data.description[i]['#IMG_POSTER']) {
            img.src = 'images/noPoster.png'
          } else {
            img.src = data.description[i]['#IMG_POSTER']
          }

          button.textContent = 'Add to Watchlist'
          remove.textContent = 'Remove From Watchlist'

          document.querySelector('.result').appendChild(section)
          section.appendChild(movieOrTV)
          section.appendChild(poster)
          movieOrTV.appendChild(title)
          movieOrTV.appendChild(h3)
          poster.appendChild(img)
          poster.appendChild(button)
          poster.appendChild(remove)
        }

        const retrievedId = localStorage.getItem('id')
        const arrayId = JSON.parse(retrievedId)

        for (let c = 0; c < arrayId.length; c++) {
          for (let d = 0; d < data.description.length; d++) {
            if (data.description[d]['#IMDB_ID'] === arrayId[c]) {
              document.querySelector(`.add${d}`).style.display = 'none'
              document.querySelector(`.btn${d}`).style.display = 'block'
            }
          }
        }
        
        const button = document.querySelectorAll('.watchlist')

        button.forEach(element => {
        element.addEventListener('click', AddToWatchlist)
        })

        function AddToWatchlist() {
          const value = event.target.value
          const id = event.target.id
          const btn = document.getElementById(id)

          btn.style.display = 'none'

          if (this.value === value) {
            let storePoster = JSON.parse(localStorage.getItem('poster'))
            if (storePoster === null) {
              storePoster = []
            }
            if (data.description[value]['#IMG_POSTER']) {
              storePoster.push(data.description[value]['#IMG_POSTER'])
            } else {
              storePoster.push('images/noPoster.png')
            }
            localStorage.setItem('poster', JSON.stringify(storePoster))

            let storeTitle = JSON.parse(localStorage.getItem('title'))
            if (storeTitle === null) {
              storeTitle = []
            }
            storeTitle.push(data.description[value]['#TITLE'])
            localStorage.setItem('title', JSON.stringify(storeTitle))

            let storeId = JSON.parse(localStorage.getItem('id'))
            if (storeId === null) {
              storeId = []
            }
            storeId.push(data.description[value]['#IMDB_ID'])
            localStorage.setItem('id', JSON.stringify(storeId))

            document.querySelector(`.btn${value}`).style.display = 'block'
          }
        }
        
        const removeclick = document.querySelectorAll('.display')

        removeclick.forEach(element => {
        element.addEventListener('click', removeFromWatchlist)
        })

        function removeFromWatchlist() {
          const removeValue = event.target.value
          const retrievedTitle = localStorage.getItem('title')
          const arrayTitle = JSON.parse(retrievedTitle)
          const retrievedPoster = localStorage.getItem('poster')
          const arrayPoster = JSON.parse(retrievedPoster)
          const retrievedId = localStorage.getItem('id')
          const arrayId = JSON.parse(retrievedId)
          const index = arrayTitle.indexOf(data.description[removeValue]['#TITLE'])

          if (index > -1) {
            arrayTitle.splice(index, 1)
            arrayPoster.splice(index, 1)
            arrayId.splice(index, 1)
          }


          localStorage.setItem('title', JSON.stringify(arrayTitle))
          localStorage.setItem('poster', JSON.stringify(arrayPoster))
          localStorage.setItem('id', JSON.stringify(arrayId))

          document.querySelector(`.btn${removeValue}`).style.display = 'none'
          document.querySelector(`.add${removeValue}`).style.display = 'block'
          
          console.log(index)
        }

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

const retrievedTitle = localStorage.getItem('title')
const arrayTitle = JSON.parse(retrievedTitle)
const retrievedPoster = localStorage.getItem('poster')
const arrayPoster = JSON.parse(retrievedPoster)
const retrievedId = localStorage.getItem('id')
const arrayId = JSON.parse(retrievedId)

for (let b = 0; b < arrayPoster.length; b++) {
  const maindivs = document.createElement('div')
  const divTitle = document.createElement('div')
  const divPoster = document.createElement('div')
  const watchlistTitles = document.createElement('h1')
  const watchlistPoster = document.createElement('img')
  const removeButton = document.createElement('button')

  maindivs.classList.add('mylist')
  divTitle.classList.add('list')
  divPoster.classList.add('list')
  watchlistTitles.classList.add('titles')
  watchlistPoster.classList.add('posters')
  watchlistPoster.src = arrayPoster[b] 
  removeButton.classList.add('removeFromWatchlist')
  removeButton.value = `${b}`

  watchlistTitles.textContent = arrayTitle[b]
  removeButton.textContent = 'Remove From Watchlist'

  const myWatchlist = document.querySelector('.myWatchlist')
  if (myWatchlist) {
    myWatchlist.appendChild(maindivs)
  }
  maindivs.appendChild(divTitle)
  maindivs.appendChild(divPoster)
  divTitle.appendChild(watchlistTitles)
  divPoster.appendChild(watchlistPoster)
  divPoster.appendChild(removeButton)
}

const removebtn = document.querySelectorAll('.removeFromWatchlist')

removebtn.forEach(element => {
  element.addEventListener('click', removeMovieOrTv)
})

function removeMovieOrTv() {
  const targetvalue = event.target.value
  const removeTitle = arrayTitle[targetvalue]
  const index = arrayTitle.indexOf(removeTitle)

  if (index > -1) {
    arrayTitle.splice(index, 1)
    arrayPoster.splice(index, 1)
    arrayId.splice(index, 1)
  }


  localStorage.setItem('title', JSON.stringify(arrayTitle))
  localStorage.setItem('poster', JSON.stringify(arrayPoster))
  localStorage.setItem('id', JSON.stringify(arrayId))

  location.reload()
}

console.log(arrayTitle)