const CACHE = 'planner-v3';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const isHTML = e.request.mode === 'navigate' || e.request.url.endsWith('.html') || e.request.url.endsWith('/');
  if (isHTML){
    // network-first para el HTML: siempre intenta traer la versión más nueva
    e.respondWith(
      fetch(e.request).then(res => {
        caches.open(CACHE).then(cache => cache.put(e.request, res.clone()));
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fetchPromise = fetch(e.request).then(networkResponse => {
        if (networkResponse.ok && e.request.url.startsWith(self.location.origin)) {
          caches.open(CACHE).then(cache => cache.put(e.request, networkResponse.clone()));
        }
        return networkResponse;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
