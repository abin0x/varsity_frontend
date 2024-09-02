const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-slide functionality (optional)
setInterval(nextSlide, 5000); // Slide every 5 seconds







// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const contactLink = document.getElementById('contact-link');
    const dropdownMenu = document.getElementById('dropdown-menu');

    contactLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        // Toggle the visibility of the dropdown menu
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        } else {
            dropdownMenu.style.display = 'block';
        }
    });

    // Optional: Hide the dropdown if clicking outside
    document.addEventListener('click', function(event) {
        if (!contactLink.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});







