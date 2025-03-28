/**
 * Inicialización de AOS (Animate On Scroll)
 */
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        disable: function() {
            return window.innerWidth < 768;
        }
    });

    /**
     * Carrusel Hero con Slick
     */
    $('.video-container').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1000,
        fade: true,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        pauseOnHover: false,
        adaptiveHeight: true
    });

    /**
     * Menú Mobile Mejorado
     */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    /**
     * Formulario de Contacto con Validación Mejorada
     */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        let captchaReady = false;
        
        // Configurar callbacks para hCaptcha
        window.onCaptchaVerify = function(token) {
            captchaReady = true;
            document.getElementById('submitBtn').disabled = false;
            document.getElementById('formStatus').textContent = '✓ CAPTCHA verificado';
            document.getElementById('formStatus').className = 'form-status success';
        };
        
        window.onCaptchaExpired = function() {
            captchaReady = false;
            document.getElementById('formStatus').textContent = '⚠ CAPTCHA expirado';
            document.getElementById('formStatus').className = 'form-status warning';
        };
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validación de campos
            const name = this.elements['name'].value.trim();
            const email = this.elements['email'].value.trim();
            const message = this.elements['message'].value.trim();
            
            if (!name || !email || !message) {
                document.getElementById('formStatus').textContent = 'Por favor completa todos los campos';
                document.getElementById('formStatus').className = 'form-status error';
                return;
            }
            
            if (!captchaReady) {
                document.getElementById('formStatus').textContent = 'Por favor completa el CAPTCHA';
                document.getElementById('formStatus').className = 'form-status error';
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            try {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner"></span> Enviando...';
                
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                
                if (!response.ok) throw new Error('Error en el servidor');
                
                document.getElementById('formStatus').textContent = 'Mensaje enviado con éxito';
                document.getElementById('formStatus').className = 'form-status success';
                this.reset();
                
                // Resetear CAPTCHA
                if (typeof hcaptcha !== 'undefined') {
                    hcaptcha.reset();
                }
                
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('formStatus').textContent = 'Error al enviar el mensaje';
                document.getElementById('formStatus').className = 'form-status error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
    
    /**
     * Actualizar año en el footer
     */
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    /**
     * Precarga de videos para mejor performance
     */
    const videos = document.querySelectorAll('video[data-src]');
    videos.forEach(video => {
        video.src = video.getAttribute('data-src');
        video.removeAttribute('data-src');
    });
});

/**
 * Manejo de errores globales
 */
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.message);
    
    // Aquí podrías integrar con un servicio como Sentry
    if (typeof Sentry !== 'undefined') {
        Sentry.captureException(e.error);
    }
    
    // Mostrar feedback al usuario si es crítico
    if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
        const container = e.target.closest('.video-container, .video-bg-container');
        if (container) {
            container.style.backgroundImage = `url(${e.target.getAttribute('poster')})`;
            container.innerHTML = '';
        }
    }
});