// sw.js
// ===== CONFIGURACIÓN =====
const CACHE_NAME = 'v1'; // Versión del caché (actualizar en futuros cambios)
const OFFLINE_PAGE = 'offline.html'; // Ruta de la página offline

// Lista de recursos críticos para precachear (ajustar según estructura del proyecto)
const ASSETS = [
  '/',
  'offline.html',
  'index.html',
  'styles.css',
  'scripts.js',
  // Assets principales
  'assets/Logo.png',
  'assets/gerard.webp',
  'assets/Fondo_Portada.webp',
  'assets/Fondo_Portada2.webp',
  // Librerías
  'lib/aos/aos.css',
  'lib/aos/aos.js',
  'lib/slick/slick.min.js',
  'lib/slick/slick.css',
  'lib/fancybox/jquery.fancybox.min.css',
  'lib/fancybox/jquery.fancybox.min.js'
];

// ===== INSTALACIÓN (Precaché) =====
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Precacheando recursos críticos');
        return cache.addAll(ASSETS); // Almacena recursos en caché
      })
      .catch(err => console.error('[SW] Error al precachear:', err))
  );
});

// ===== ESTRATEGIA CACHE-FIRST =====
self.addEventListener('fetch', (event) => {
  // Solo manejar solicitudes de navegación (HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(OFFLINE_PAGE)) // Mostrar offline.html
        .then(response => response || caches.match(OFFLINE_PAGE))
    );
  } else {
    // Para otros recursos usar Cache-First
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});

// ===== LIMPIEZA DE CACHÉS ANTIGUOS =====
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME) // Elimina cachés obsoletos
          .map(name => {
            console.log('[SW] Eliminando caché antigua:', name);
            return caches.delete(name);
          })
      );
    })
  );
});
