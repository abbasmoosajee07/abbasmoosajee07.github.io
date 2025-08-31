// loadHeader.js

// Function to initialize theme toggle
function initializeHeader() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  if (!themeToggle || !themeIcon) {
    console.error('Theme toggle elements not found');
    return;
  }
  
  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    document.body.classList.add('light');
    themeIcon.classList.remove('bi-moon-fill');
    themeIcon.classList.add('bi-sun-fill');
  } else {
    themeIcon.classList.remove('bi-sun-fill');
    themeIcon.classList.add('bi-moon-fill');
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    if (document.body.classList.contains('light')) {
      localStorage.setItem('theme', 'light');
      themeIcon.classList.remove('bi-moon-fill');
      themeIcon.classList.add('bi-sun-fill');
    } else {
      localStorage.setItem('theme', 'dark');
      themeIcon.classList.remove('bi-sun-fill');
      themeIcon.classList.add('bi-moon-fill');
    }
  });
  
  console.log('Header initialized successfully');
}

// Function to load the header
function loadHeader() {
  // If header is already loaded, just initialize it
  if (document.querySelector('.header nav .nav-left')) {
    initializeHeader();
    return;
  }
  
  // Create a container for the header if it doesn't exist
  let headerContainer = document.getElementById('header-container');
  if (!headerContainer) {
    headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    document.body.insertBefore(headerContainer, document.body.firstChild);
  }
  
  fetch('/common/header.html')  // Update this path if needed
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      headerContainer.innerHTML = data;
      initializeHeader();
    })
    .catch(error => {
      console.error('Error loading header:', error);
      // Use the fallback header that's already in the HTML
      initializeHeader();
    });
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeader);
} else {
  // DOM is already ready
  loadHeader();
}

