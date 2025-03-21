document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle del menú móvil
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('open');
            menuToggle.classList.toggle('open');
        });
    }

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && menuToggle) {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('open');
            }
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    let captchaValido = false; // Variable para rastrear si el captcha está completado

    // Función que se llama cuando el captcha se completa correctamente
    if (typeof onCaptchaSuccess === 'undefined') {
        window.onCaptchaSuccess = function (response) {
            captchaValido = true;
        };
    }

    // Función que se llama si hay un error en el captcha
    if (typeof onCaptchaError === 'undefined') {
        window.onCaptchaError = function () {
            captchaValido = false;
        };
    }

    // Botón para activar/desactivar el captcha
    const toggleCaptchaButton = document.getElementById('toggleCaptcha');
    const captchaContainer = document.getElementById('captchaContainer');

    if (toggleCaptchaButton && captchaContainer) {
        toggleCaptchaButton.addEventListener('click', function () {
            if (captchaContainer.style.display === 'none') {
                captchaContainer.style.display = 'block';
                toggleCaptchaButton.textContent = 'Desactivar Captcha';
            } else {
                captchaContainer.style.display = 'none';
                toggleCaptchaButton.textContent = 'Activar Captcha';
            }
        });
    }

    if (contactForm && formStatus && submitBtn) {
        contactForm.addEventListener('submit', function (e) {
            // Verificar si el captcha está completado
            if (!captchaValido) {
                e.preventDefault(); // Evitar el envío del formulario
                formStatus.textContent = 'Por favor, completa el captcha antes de enviar el mensaje.';
                formStatus.classList.remove('success');
                formStatus.classList.add('error');
                return;
            }

            // Mostrar el estado de "enviando"
            submitBtn.disabled = true;
            submitBtn.textContent = 'ENVIANDO...';

            // Crear un FormData con los datos del formulario
            const formData = new FormData(contactForm);
            formData.append('h-captcha-response', hcaptcha.getResponse()); // Usar hcaptcha en lugar de grecaptcha

            // Enviar el formulario usando Fetch API
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    // Mensaje de éxito
                    formStatus.textContent = 'Mensaje enviado correctamente. ¡Gracias!';
                    formStatus.classList.remove('error');
                    formStatus.classList.add('success');
                    contactForm.reset(); // Limpiar el formulario
                    hcaptcha.reset(); // Reiniciar hCaptcha
                    captchaValido = false; // Reiniciar el estado del captcha
                } else {
                    // Mensaje de error
                    formStatus.textContent = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
                    formStatus.classList.remove('success');
                    formStatus.classList.add('error');
                }
            })
            .catch(error => {
                // Mensaje de error
                formStatus.textContent = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
                formStatus.classList.remove('success');
                formStatus.classList.add('error');
            })
            .finally(() => {
                // Restaurar el botón
                submitBtn.disabled = false;
                submitBtn.textContent = 'ENVIAR MENSAJE';
            });
        });
    }
});