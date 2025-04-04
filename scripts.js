document.addEventListener('DOMContentLoaded', function() {
    // ===== INICIALIZACIÓN DE AOS =====
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 120
    });

// ===== CARRUSEL HERO ===== (Código actualizado)
$('.video-container').slick({
    dots: true,
    arrows: false, // Deshabilitar flechas completamente
    infinite: true,
    speed: 800,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: 'linear',
    mobileFirst: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
              arrows: false
            }
          }
        ]
      });

    // ===== FANCYBOX GALERÍA =====
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "download",
            "thumbs",
            "close"
        ],
        animationEffect: "zoom",
        transitionEffect: "circular",
        loop: true,
        gutter: 20
    });

    // ===== MENÚ MÓVIL =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('open');
        this.classList.toggle('open');
        this.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });

    // ===== FORMULARIO DE CONTACTO =====
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación hCaptcha
            if (typeof hcaptcha !== 'undefined') {
                const response = hcaptcha.getResponse();
                if (!response) {
                    showFormStatus('Por favor, completa el captcha', 'error');
                    return;
                }
            }

            // Envío del formulario
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    showFormStatus('Mensaje enviado correctamente', 'success');
                    this.reset();
                    if (typeof hcaptcha !== 'undefined') hcaptcha.reset();
                } else {
                    throw new Error('Error en el servidor');
                }
            })
            .catch(error => {
                showFormStatus('Error al enviar el mensaje', 'error');
                console.error('Error:', error);
            });
        });
    }

    // Función auxiliar para mostrar estados
    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
    }
});