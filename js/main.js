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
          remove.classList.add('watchlist')
          remove.classList.add('display')
          button.value = `${i}`
          //button.value = data.description[i]['#IMDB_ID']
          button.id = data.description[i]['#IMDB_ID']

          title.textContent = data.description[i]['#TITLE']
          h3.textContent = data.description[i]['#YEAR']
          img.src = data.description[i]['#IMG_POSTER']

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
            if (!localStorage.getItem('poster')) {
              localStorage.setItem('poster', data.description[value]['#IMG_POSTER'])
            } else {
              if (!data.description[value]['#IMG_POSTER']) {
                let poster = localStorage.getItem('poster') + ' ' + 0
                localStorage.setItem('poster', poster)
              } else {
                let poster = localStorage.getItem('poster') + ' ' + data.description[value]['#IMG_POSTER'] 
                localStorage.setItem('poster', poster)
              }
            }

            let storeTitle = JSON.parse(localStorage.getItem('title'))

            if (storeTitle === null) {
              storeTitle = []
            }

            storeTitle.push(data.description[value]['#TITLE'])
            localStorage.setItem('title', JSON.stringify(storeTitle))

            document.querySelector('.display').style.display = 'block'
          }
        }
        
        const removeclick = document.querySelectorAll('.display')

        removeclick.forEach(element => {
        element.addEventListener('click', removeFromWatchlist)
        })

        function removeFromWatchlist() {
          console.log('test')
        }

      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

const retrievedTitle = localStorage.getItem('title')
const arrayTitle = JSON.parse(retrievedTitle)
const arrayPoster = localStorage.poster.split(' ')

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

console.log(arrayTitle)