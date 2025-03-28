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
                    arrows: false
                }
            }
        ]
    });

    // Fancybox
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

    // Menú mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    let captchaValido = false;

    window.onCaptchaSuccess = function() {
        captchaValido = true;
    };

    window.onCaptchaError = function() {
        captchaValido = false;
    };

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!captchaValido) {
                formStatus.textContent = 'Por favor, completa el captcha';
                formStatus.className = 'form-status error';
                return;
            }

            // Lógica de envío del formulario
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Mensaje enviado correctamente';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                    hcaptcha.reset();
                } else {
                    throw new Error('Error en el envío');
                }
            })
            .catch(error => {
                formStatus.textContent = 'Error al enviar el mensaje';
                formStatus.className = 'form-status error';
            });
        });
    }
});