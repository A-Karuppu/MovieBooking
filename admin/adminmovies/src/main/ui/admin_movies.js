document.addEventListener("DOMContentLoaded", () => {
    const movieForm = document.getElementById("movieForm");
    const movieList = document.getElementById("movieList");
    const viewMoviesBtn = document.getElementById("viewMoviesBtn");

    // Add Movie
    movieForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const movieData = {
            title: document.getElementById("title").value,
            posterUrl: document.getElementById("posterUrl").value,
            genre: document.getElementById("genre").value,
            language: document.getElementById("language").value,
            description: document.getElementById("description").value,
            rating: parseFloat(document.getElementById("rating").value)
        };

        try {
            const response = await fetch("http://localhost:8080/admin/movies/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movieData)
            });

            if (response.ok) {
                alert("Movie added successfully!");
                movieForm.reset();
                loadMovies();
            } else {
                const errorData = await response.json();
                alert("Failed to add movie: " + (errorData.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error adding movie:", error);
            alert("Error connecting to backend.");
        }
    });

    // View Movies
    viewMoviesBtn.addEventListener("click", () => {
        loadMovies();
    });

    // Load Movies
    async function loadMovies() {
        try {
            const response = await fetch("http://localhost:8080/admin/movies/list");
            if (response.ok) {
                const movies = await response.json();
                displayMovies(movies);
            } else {
                movieList.innerHTML = "Failed to load movies.";
            }
        } catch (error) {
            console.error("Error loading movies:", error);
            movieList.innerHTML = "Error loading movies.";
        }
    }

    // Display Movies with Delete Button
    function displayMovies(movies) {
        movieList.innerHTML = "";
        movies.forEach(movie => {
            const card = document.createElement("div");
            card.className = "movie-card";
            card.innerHTML = `
                <img src="${movie.posterUrl}" alt="${movie.title}" />
                <h3>${movie.title}</h3>
                <p><strong>Genre:</strong> ${movie.genre}</p>
                <p><strong>Language:</strong> ${movie.language}</p>
                <p><strong>Rating:</strong> ${movie.rating}</p>
                <p>${movie.description}</p>
                <button class="delete-btn" data-id="${movie.id}">Delete</button>
            `;
            movieList.appendChild(card);
        });

        // Attach delete listeners after rendering cards
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach(button => {
            button.addEventListener("click", () => {
                const movieId = button.getAttribute("data-id");
                deleteMovie(movieId);
            });
        });
    }

    // Delete Movie
    async function deleteMovie(movieId) {
        try {
            const response = await fetch(`http://localhost:8080/admin/movies/delete/${movieId}`, {
                method: "DELETE"
            });

            if (response.ok) {
                alert("Movie deleted successfully.");
                loadMovies();
            } else {
                alert("Failed to delete movie.");
            }
        } catch (error) {
            console.error("Error deleting movie:", error);
            alert("Error connecting to backend.");
        }
    }
});
