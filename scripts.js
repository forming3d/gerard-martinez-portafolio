document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 120
    });

    // Inicializar Slick Carousel
    $('.video-container').slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 800,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }
        ]
    });

    // Inicializar Fancybox
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "download",
            "thumbs",
            "close"
        ],
        animationEffect: "fade",
        transitionEffect: "circular",
        loop: true,
        idleTime: false,
        gutter: 20,
        keyboard: true,
        toolbar: true
    });

    // Menú toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('open');
            AOS.refresh();
        });
    }

    // Cerrar menú al hacer clic en enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && menuToggle) {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('open');
            }
        });
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    let captchaValido = false;

    // Callbacks para hCaptcha
    window.onCaptchaSuccess = function(response) {
        captchaValido = true;
    };

    window.onCaptchaError = function() {
        captchaValido = false;
    };

    if (contactForm && formStatus && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!captchaValido) {
                formStatus.textContent = 'Por favor, completa el captcha antes de enviar el mensaje.';
                formStatus.classList.remove('success');
                formStatus.classList.add('error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'ENVIANDO...';

            const formData = new FormData(contactForm);
            formData.append('h-captcha-response', hcaptcha.getResponse());

            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Mensaje enviado correctamente. ¡Gracias!';
                    formStatus.classList.remove('error');
                    formStatus.classList.add('success');
                    contactForm.reset();
                    hcaptcha.reset();
                    captchaValido = false;
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }
            })
            .catch(error => {
                formStatus.textContent = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
                formStatus.classList.remove('success');
                formStatus.classList.add('error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = 'ENVIAR MENSAJE';
            });
        });
    }

    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});