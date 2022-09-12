const CACHE_NAME  = 'Audio Notes';

let resourcesToCache = [
    '/',
    '/index.html',
    '/app.css',
    '/app.js',
    '/shadow-components.js',
];

// Installing Service Worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(CACHE_NAME);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(resourcesToCache);
    })());
  });

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) return r;
        const response = await fetch(e.request);
        const cache = await caches.open(CACHE_NAME);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
    })());
});