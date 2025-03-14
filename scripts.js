document.addEventListener('DOMContentLoaded', function () {
    // Animaciones al hacer scroll
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Validación del formulario de contacto
    const form = document.querySelector('.contact-form');
    const emailInput = form.querySelector('input[type="email"]');
    const nameInput = form.querySelector('input[type="text"]');
    const messageInput = form.querySelector('textarea');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (nameInput.value.trim() === '') {
            alert('Por favor, ingresa tu nombre.');
            return;
        }

        if (!emailInput.value.includes('@')) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (messageInput.value.trim() === '') {
            alert('Por favor, ingresa un mensaje.');
            return;
        }

        // Si todo está bien, enviar el formulario
        form.submit();
    });

    // Efectos de hover en tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover-effect');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-effect');
        });
    });
});
