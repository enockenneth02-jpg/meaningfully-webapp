/* Print Shop POS — service worker
   - Makes the app installable and usable offline.
   - The page itself is fetched network-first, so a new deploy shows up on the next open.
   - Icons and other static files are cache-first.
   - Requests to other sites (Gemini AI, Supabase sync) are never cached. */
const CACHE = 'printshop-pos-v29';
const CORE = [
  './',
  './manifest.webmanifest',
  './favicon.ico',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', (event) => {
  // add files one by one so a single missing file never stops the app from installing
  event.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // AI + cloud sync go straight to the network

  const isPage = req.mode === 'navigate' || url.pathname === '/' || url.pathname.endsWith('.html');
  if (isPage) {
    // network first: always get the newest version when online, fall back to the saved copy offline
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put('./', copy));
          }
          return res;
        })
        .catch(() => caches.match('./').then((r) => r || caches.match(req)))
    );
    return;
  }

  // static files: cache first, then network (and save it for next time)
  event.respondWith(
    caches.match(req).then((hit) =>
      hit ||
      fetch(req).then((res) => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
    )
  );
});
