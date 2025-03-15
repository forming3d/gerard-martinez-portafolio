document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle del menú móvil
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('open');
        });
    });

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    let captchaValido = false; // Variable para rastrear si el captcha está completado

    // Función que se llama cuando el captcha se completa correctamente
    window.onCaptchaSuccess = function () {
        captchaValido = true;
    };

    // Función que se llama si hay un error en el captcha
    window.onCaptchaError = function () {
        captchaValido = false;
    };

    if (contactForm) {
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
            formData.append('h-captcha-response', grecaptcha.getResponse()); // Añadir la respuesta de hCaptcha

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
                    grecaptcha.reset(); // Reiniciar hCaptcha
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
});
