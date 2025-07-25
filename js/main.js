document.addEventListener('DOMContentLoaded', () => {
    // Typing effect for rzaba
    const name = 'rzaba\'s intergalactic hub';
    const typed = document.getElementById('rzaba-typed');
    let i = 0;
    function type() {
        if (typed && i <= name.length) {
            typed.textContent = name.slice(0, i) + (i < name.length ? '_' : '');
            i++;
            setTimeout(type, 180);
        } else if (typed) {
            typed.textContent = name;
        }
    }
    type();

    // Contact form feedback and mailto redirect
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = this.querySelector('#name').value;
            const email = this.querySelector('#email').value;
            const message = this.querySelector('#message').value;
            const mailto = `mailto:rzaba@example.com?subject=Contact%20from%20${encodeURIComponent(name)}&body=Email:%20${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;
            window.location.href = mailto;
        });
    }
});