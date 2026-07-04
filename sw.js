// GuitarFlow Service Worker — caches all app files for full offline use.
// On first visit the CDN scripts (React) are cached here,
// so every subsequent visit — even with no internet — works perfectly.

const CACHE = "guitarflow-v2";
const PRECACHE = [
  "./index.html",
  "./manifest.json",
  "./icon.svg",
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
];

// Install: cache everything upfront
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first for the app shell (HTML) so deployed updates are picked
// up immediately instead of being masked forever by a stale cached copy;
// cache-first for everything else (CDN libs, icons) since those are static
// and benefit from instant, offline-capable loading.
self.addEventListener("fetch", e => {
  const isAppShell = e.request.mode === "navigate" || e.request.destination === "document";

  if (isAppShell) {
    e.respondWith(
      fetch(e.request).then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        // Cache successful GET responses
        if (res && res.status === 200 && e.request.method === "GET") {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached); // fall back to cache on network fail
    })
  );
});
