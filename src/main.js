import './style.css';

// Mobile menu logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuOpenIcon = document.querySelector('.menu-open');
const menuCloseIcon = document.querySelector('.menu-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
  mobileMenu.classList.toggle('opacity-0');
  mobileMenu.classList.toggle('pointer-events-none');
  menuOpenIcon.classList.toggle('hidden');
  menuCloseIcon.classList.toggle('hidden');
}

mobileMenuBtn.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (!mobileMenu.classList.contains('hidden')) {
      toggleMenu();
    }
  });
});
