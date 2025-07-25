// This file contains the JavaScript code for the portfolio project.
// It may include functionality such as event listeners, animations, or dynamic content updates.

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-theme');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
    });

    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover');
        });
    });
});