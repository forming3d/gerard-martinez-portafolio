// sw.js
// ===== CONFIGURACIÓN =====
const CACHE_NAME = 'v1'; // Versión del caché (actualizar en futuros cambios)
const OFFLINE_PAGE = '/offline.html'; // Ruta de la página offline

// Lista de recursos críticos para precachear (ajustar según estructura del proyecto)
const ASSETS = [
  '/',
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
  event.respondWith(
    caches.match(event.request) // 1. Busca en caché
      .then(response => {
        if (response) {
          console.log(`[SW] Sirviendo desde caché: ${event.request.url}`);
          return response; // Devuelve recurso en caché
        }
        // 2. Si no está en caché, consulta red
        return fetch(event.request)
          .then(networkResponse => {
            // Opcional: Almacena nuevos recursos en caché
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
          .catch(() => {
            // 3. Si falla, muestra página offline
            console.log('[SW] Mostrando página offline');
            return caches.match(OFFLINE_PAGE);
          });
      })
  );
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