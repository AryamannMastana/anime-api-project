const key = "https://api.jikan.moe/v4";

const form = document.querySelector('.search');

const getManga = async (manga) => {
    const base = key;
    const query = `/manga?q=${manga}&page=1`;
    const response = await fetch(base + query);
    const data = await response.json();
    return data;
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
        .then(data => console.log(data))
        .catch(err => console.log(err.message))
});