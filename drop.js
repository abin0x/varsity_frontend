

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





