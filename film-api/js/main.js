//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

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
          const title = document.createElement('h1')
          const h3 = document.createElement('h3')
          const img = document.createElement('img')

          title.classList.add('title')

          title.textContent = data.description[i]['#TITLE']
          h3.textContent = data.description[i]['#YEAR']
          img.src = data.description[i]['#IMG_POSTER']

          document.querySelector('.result').appendChild(title)
          document.querySelector('.result').appendChild(h3)
          document.querySelector('.result').appendChild(img)
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


