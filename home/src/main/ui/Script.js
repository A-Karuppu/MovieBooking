const fetchUrl = 'http://localhost:8080/home/message';

// DOM Elements
const movieSelect = document.getElementById('movie-select');
const theaterSelect = document.getElementById('theater-select');
const dateSelect = document.getElementById('date-select');

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
  setupEventListeners();
  setMinDate();
  fetchWelcomeMessage();
});

function initializeApp() {
  setupScrollToTop();
}

function setupEventListeners() {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');

  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', function () {
      performSearch(searchInput.value);
    });
  }
}

function fetchWelcomeMessage() {
  fetch(fetchUrl)
    .then(response => response.text())
    .then(message => {
      showNotification(message, 'success');
    })
    .catch(error => {
      console.error('Error fetching welcome message:', error);
      showNotification('Failed to load welcome message', 'error');
    });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('show');
  }, 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function performSearch(query) {
  if (!query.trim()) {
    showNotification('Please enter a search term', 'error');
    return;
  }
  showNotification(`Searched for: ${query}`, 'info');
}

function setMinDate() {
  const today = new Date().toISOString().split('T')[0];
  if (dateSelect) {
    dateSelect.min = today;
    dateSelect.value = today;
  }
}

function setupScrollToTop() {
  const scrollButton = document.createElement('button');
  scrollButton.className = 'scroll-to-top';
  scrollButton.innerHTML = '↑';
  scrollButton.title = 'Back to top';
  document.body.appendChild(scrollButton);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add('show');
    } else {
      scrollButton.classList.remove('show');
    }
  });

  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
