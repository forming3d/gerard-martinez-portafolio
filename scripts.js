document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 120
    });

    // Carrusel Hero
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
                    arrows: false,
                    dots: true
                }
            }
        ]
    });

    // Fancybox Gallery
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
        gutter: 20,
        keyboard: true,
        idleTime: false
    });

    // Menú Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });

    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });

    // Formulario de Contacto
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    let captchaValido = false;

    // Callbacks para hCaptcha
    window.onCaptchaSuccess = function() {
        captchaValido = true;
        submitBtn.disabled = false;
    };

    window.onCaptchaError = function() {
        captchaValido = false;
        submitBtn.disabled = true;
    };

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!captchaValido) {
            showFormStatus('Por favor, completa el captcha', 'error');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'ENVIANDO...';

        // Simular envío (reemplazar con tu lógica real)
        setTimeout(() => {
            showFormStatus('Mensaje enviado correctamente', 'success');
            contactForm.reset();
            hcaptcha.reset();
            captchaValido = false;
            submitBtn.textContent = 'ENVIAR MENSAJE';
            submitBtn.disabled = false;
        }, 1500);
    });

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + type;
        formStatus.style.display = 'block';
        
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }

    // Smooth Scrolling
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