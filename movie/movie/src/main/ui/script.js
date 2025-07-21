// Movie data
const movies = [
    { id: 1, title: "The Dark Knight", year: 2008, genre: "Action", rating: 8.8, poster: "https://via.placeholder.com/200x300/333/fff?text=The+Dark+Knight" },
    { id: 2, title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, poster: "https://via.placeholder.com/200x300/ff6b35/fff?text=Interstellar" },
    { id: 3, title: "La La Land", year: 2016, genre: "Romance", rating: 8.0, poster: "https://via.placeholder.com/200x300/e91e63/fff?text=La+La+Land" },
    { id: 4, title: "Get Out", year: 2017, genre: "Horror", rating: 7.8, poster: "https://via.placeholder.com/200x300/000/red?text=Get+Out" },
    { id: 5, title: "Toy Story 4", year: 2019, genre: "Animation", rating: 7.7, poster: "https://via.placeholder.com/200x300/4fc3f7/fff?text=Toy+Story+4" },
    { id: 6, title: "Parasite", year: 2019, genre: "Thriller", rating: 8.6, poster: "https://via.placeholder.com/200x300/2e7d32/fff?text=Parasite" },
    { id: 7, title: "The Shawshank Redemption", year: 1994, genre: "Drama", rating: 9.3, poster: "https://via.placeholder.com/200x300/ff9800/fff?text=The+Shawshank+Redemption" },
    { id: 8, title: "Indiana Jones", year: 1981, genre: "Adventure", rating: 8.4, poster: "https://via.placeholder.com/200x300/8bc34a/fff?text=Indiana+Jones" },
    { id: 9, title: "Superbad", year: 2007, genre: "Comedy", rating: 7.6, poster: "https://via.placeholder.com/200x300/ff5722/fff?text=Superbad" },
    { id: 10, title: "Lord of the Rings", year: 2001, genre: "Fantasy", rating: 8.9, poster: "https://via.placeholder.com/200x300/607d8b/fff?text=Lord+of+the+Rings" }
];

let currentPage = 1;
let currentSort = 'rating';
let currentView = 'grid';
let filteredMovies = [...movies];

// DOM Elements
const moviesGrid = document.getElementById('moviesGrid');
const sortDropdown = document.querySelector('.sort-dropdown');
const viewButtons = document.querySelectorAll('.view-btn');
const searchInput = document.querySelector('.search-input');
const pageButtons = document.querySelectorAll('.page-btn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderMovies();
    initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
    // Sort dropdown
    sortDropdown.addEventListener('change', function() {
        currentSort = this.value.toLowerCase();
        sortMovies();
        renderMovies();
    });

    // View toggle buttons
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.dataset.view;
            toggleView();
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.genre.toLowerCase().includes(searchTerm)
        );
        currentPage = 1;
        renderMovies();
        updatePagination();
    });

    // Pagination buttons
    pageButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.dataset.page) {
                currentPage = parseInt(this.dataset.page);
                updatePagination();
                renderMovies();
                scrollToTop();
            }
        });
    });

    // Previous/Next buttons
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
            renderMovies();
            scrollToTop();
        }
    });

    nextBtn.addEventListener('click', function() {
        const maxPages = Math.ceil(filteredMovies.length / 10);
        if (currentPage < maxPages) {
            currentPage++;
            updatePagination();
            renderMovies();
            scrollToTop();
        }
    });

    // Movie card click events
    moviesGrid.addEventListener('click', function(e) {
        const movieCard = e.target.closest('.movie-card');
        if (movieCard) {
            const movieTitle = movieCard.querySelector('h3').textContent;
            showMovieDetails(movieTitle);
        }
    });
}

// Render movies
function renderMovies() {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const moviesToShow = filteredMovies.slice(startIndex, endIndex);

    moviesGrid.innerHTML = moviesToShow.map(movie => `
        <div class="movie-card" data-id="${movie.id}">
            <div class="movie-poster">
                <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
                <div class="rating">${movie.rating}</div>
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.year} • ${movie.genre}</p>
            </div>
        </div>
    `).join('');

    // Add animation to cards
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Sort movies
function sortMovies() {
    filteredMovies.sort((a, b) => {
        switch(currentSort) {
            case 'rating':
                return b.rating - a.rating;
            case 'year':
                return b.year - a.year;
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return b.rating - a.rating;
        }
    });
}

// Toggle view between grid and list
function toggleView() {
    if (currentView === 'list') {
        moviesGrid.classList.add('list-view');
    } else {
        moviesGrid.classList.remove('list-view');
    }
}

// Update pagination
function updatePagination() {
    const maxPages = Math.ceil(filteredMovies.length / 10);

    // Update page buttons
    pageButtons.forEach(btn => {
        if (btn.dataset.page) {
            const page = parseInt(btn.dataset.page);
            if (page === currentPage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });

    // Update prev/next button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === maxPages;

    if (prevBtn.disabled) {
        prevBtn.style.opacity = '0.5';
        prevBtn.style.cursor = 'not-allowed';
    } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.cursor = 'pointer';
    }

    if (nextBtn.disabled) {
        nextBtn.style.opacity = '0.5';
        nextBtn.style.cursor = 'not-allowed';
    } else {
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }
}

// Show movie details (placeholder function)
function showMovieDetails(title) {
    alert(`Showing details for: ${title}`);
    // In a real app, this would open a modal or navigate to a details page
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add CSS animation for card entrance
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
    }

    .list-view {
        display: flex !important;
        flex-direction: column !important;
        gap: 16px !important;
    }

    .list-view .movie-card {
        display: flex !important;
        flex-direction: row !important;
        max-width: 100% !important;
        height: 120px !important;
    }

    .list-view .movie-poster {
        width: 80px !important;
        height: 120px !important;
        flex-shrink: 0;
    }

    .list-view .movie-info {
        flex: 1;
        padding: 16px 20px !important;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .movie-card:hover {
        cursor: pointer;
    }

    .icon-btn, .view-btn, .page-btn {
        user-select: none;
    }

    .search-input::placeholder {
        color: #9ca3af;
    }
`;
document.head.appendChild(style);

// Add some interactivity to header buttons
document.querySelectorAll('.icon-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        if (this.textContent === '❤️') {
            alert('Favorites feature coming soon!');
        } else if (this.textContent === '🔔') {
            alert('Notifications feature coming soon!');
        }
    });
});

// Add click effect to profile avatar
document.querySelector('.profile-avatar').addEventListener('click', function() {
    alert('Profile menu coming soon!');
});

// Initialize
updatePagination();