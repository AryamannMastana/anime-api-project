const key = "https://api.jikan.moe/v4";

const form = document.querySelector('.search');
const searchResults = document.querySelector('.search-results');

const updateUI = (data) => {
    data.sort((a,b) => a.popularity - b.popularity);
    data = data.filter(a =>  a.popularity > 0);
    searchResults.textContent = "";
    searchResults.style.overflowX = "scroll";
    data.forEach(item => {
        searchResults.innerHTML += `
            <div class="card">
                <img class="card-img-top" src="${item.images.webp.image_url}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <h5 class="card-title text-muted title-english">${item.title_english}</h5>
                    <p class="card-text">${item.synopsis}</p>
                </div>
                <div class="card-footer">
                    <a href="${item.url}" class="btn btn-dark">View on MAL</a>
                </div>
            </div>
        `;
    });    
    console.log(data);
}

const getManga = async (manga) => {
    const base = key;
    const query = `/manga?q=${manga}&page=1`;
    const response = await fetch(base + query);
    const result = await response.json();
    return result.data;
}

const updateManga = async (manga) => {
    const mangaDets = await getManga(manga);
    return mangaDets;
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const manga = form.search.value.trim();
    form.reset();
    updateManga(manga)
        .then(data => updateUI(data))
        .catch(err => console.log(err.message))

    localStorage.setItem('manga', manga);
});

if(localStorage.getItem('manga')){
    updateManga(localStorage.getItem('manga'))
        .then(data => updateUI(data))
        .catch(err => console.log(err.message))
}