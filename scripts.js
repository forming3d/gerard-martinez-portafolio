document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    
    // Función para manejar el menú móvil
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
        
        // Actualizar atributo aria-expanded
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Menú transparente al inicio, sólido al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            // Desactivar el botón mientras se envía
            submitBtn.disabled = true;
            submitBtn.textContent = 'ENVIANDO...';
            
            // Simulación de envío exitoso
            setTimeout(() => {
                formStatus.textContent = '¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.';
                formStatus.classList.add('success');
                submitBtn.textContent = 'ENVIAR MENSAJE';
                submitBtn.disabled = false;
                contactForm.reset();
                
                // Limpiar el mensaje después de un tiempo
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.classList.remove('success');
                }, 5000);
            }, 1500);
        });
    }
});
