const CACHE_NAME = 'portfolio-v3';
const OFFLINE_PAGE = '/offline.html';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/scripts.js',
  '/lib/aos/aos.css',
  '/lib/slick/slick.css',
  '/assets/Logo.png',
  '/assets/video-poster.jpg',
  '/offline.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Borrando cache antiguo:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Ignorar solicitudes que no sean GET o de otro origen
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Estrategia: Cache primero con fallback a red
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            // Solo cacheamos respuestas válidas
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // Fallback para páginas
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match(OFFLINE_PAGE);
            }
          });
      })
  );
});