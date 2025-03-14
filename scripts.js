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

    // Carrusel de proyectos
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
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

    // Carga dinámica de proyectos
    const loadMoreButton = document.querySelector('#load-more');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    loadMoreButton.addEventListener('click', async () => {
        const response = await fetch('data/projects.json');
        const projects = await response.json();

        projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.classList.add('portfolio-item');
            projectItem.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <div class="portfolio-overlay">
                    <h3 class="portfolio-title">${project.title}</h3>
                </div>
            `;
            portfolioGrid.appendChild(projectItem);
        });
    });

    // Alternar entre modo oscuro y claro
    const themeToggle = document.querySelector('#theme-toggle');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });
});
