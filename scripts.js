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

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Evitar el envío tradicional del formulario

            // Verificar si hCaptcha fue completado
            const hCaptchaResponse = grecaptcha.getResponse();
            if (!hCaptchaResponse) {
                formStatus.textContent = 'Por favor, completa el hCaptcha.';
                formStatus.classList.add('error');
                return;
            }

            // Mostrar el estado de "enviando"
            submitBtn.disabled = true;
            submitBtn.textContent = 'ENVIANDO...';

            // Crear un FormData con los datos del formulario
            const formData = new FormData(contactForm);
            formData.append('h-captcha-response', hCaptchaResponse); // Añadir la respuesta de hCaptcha

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
                    formStatus.classList.add('success');
                    contactForm.reset(); // Limpiar el formulario
                    grecaptcha.reset(); // Reiniciar hCaptcha
                } else {
                    // Mensaje de error
                    formStatus.textContent = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
                    formStatus.classList.add('error');
                }
            })
            .catch(error => {
                // Mensaje de error
                formStatus.textContent = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
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
