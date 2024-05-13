// script.js

// Add an event listener for the scroll event
document.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');

    // Check the scroll position and add a class to change the background color
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
