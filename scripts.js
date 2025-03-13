// Ejemplo de interacción básica
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            alert('Ver detalles del proyecto');
        });
    });
});
