self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("seedream-cache").then((cache) => {
      return cache.addAll([
        "index.html",
        "manifest.json",
        "Logo.jpg",
        "icons/icon-192.png",
        "icons/icon-512.png"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
