document.addEventListener('DOMContentLoaded', () => {
renderSocialLinks('#main-social-links', {
    size: '1.8rem',
    gap: '1.8rem',
    margin: '2rem 0'
});
});

const toggleBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

toggleBtn.addEventListener('click', () => {
document.body.classList.toggle('light');
const isLight = document.body.classList.contains('light');

if (isLight) {
    themeIcon.classList.remove('bi-sun-fill');
    themeIcon.classList.add('bi-moon-fill');
} else {
    themeIcon.classList.remove('bi-moon-fill');
    themeIcon.classList.add('bi-sun-fill');
}
});
