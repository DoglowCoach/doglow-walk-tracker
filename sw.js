const CACHE_NAME = "doglow-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./walk-tracker.html",
  "./doglow-logo.png",
  "./manifest.webmanifest",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => Promise.resolve())
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(networkRes => {
          const cloned = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          return networkRes;
        })
        .catch(() => cached);
    })
  );
});
