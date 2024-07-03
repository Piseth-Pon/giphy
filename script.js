const apiKey = 'nuGeuQ6JLHN6sYb8vif0k1eVqGHO2vBB';

async function getTrendingGiphy(){
  const trendingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`
  const response = await fetch(trendingUrl)
  const data = await response.json()
  // console.log(data.data)
  return data.data
}

async function getSearchGiphy(term) {
  const searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${term}&limit=10`
  const response = await fetch(searchUrl)
  const data = await response.json()
  return data.data
}

function displayGiphy(wrapper, giphyData) {

  wrapper.innerHTML = ``

  for (let i = 0; i < giphyData.length; i++) {
    let gif = giphyData[i]
    wrapper.innerHTML += `
    <div class="giphyCard">
      <img src="${gif.images.original.url}" alt="" >
      <h4>${gif.title}</h4>
    </div>
    `
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  // console.log(await )
  const giphyData = await  getTrendingGiphy()
  // displayGiphy(giphyData)
  const giphyWrapper = document.querySelector(".trendingWrapper")
  // giphyWrapper.innerHTML = ``
  displayGiphy(giphyWrapper, giphyData)

  const searchForm = document.querySelector("#searchForm")
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const searchTerm = document.querySelector("#searchTerm")
    const searchData = await getSearchGiphy(searchTerm.value)
    const searchWrapper = document.querySelector(".searchWrapper")
    displayGiphy(searchWrapper, searchData)

    searchTerm.value = ``
  })



})