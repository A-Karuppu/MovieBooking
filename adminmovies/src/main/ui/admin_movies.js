document.getElementById("movieForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const movie = {
    title: document.getElementById("title").value,
    posterUrl: document.getElementById("posterUrl").value,
    genre: document.getElementById("genre").value,
    language: document.getElementById("language").value,
    description: document.getElementById("description").value
  };

  fetch("http://localhost:8082/movies/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie)
  })
  .then(res => res.json())
  .then(data => {
    alert("Movie added successfully!");
    loadMovies();
    document.getElementById("movieForm").reset();
  })
  .catch(err => console.error("Error:", err));
});

function loadMovies() {
  fetch("http://localhost:8082/movies/list")
    .then(res => res.json())
    .then(movies => {
      const cardContainer = document.getElementById("movieCards");
      cardContainer.innerHTML = "";

      movies.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
          <img src="${movie.posterUrl}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <div class="stars">⭐ ⭐ ⭐ ⭐ <strong>8.5</strong></div>
          <p>${movie.genre}</p>
          <button class="book-btn">Book</button>
        `;
        cardContainer.appendChild(card);
      });
    });
}

window.onload = loadMovies;
