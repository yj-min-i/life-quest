const CACHE = 'fq-f2c855f828';
const PRECACHE = ["./","assets/GowunBatang-Bold-CdtiTu-P.woff2","assets/GowunBatang-Regular-B2LT0b9t.woff2","assets/GowunDodum-Regular-Cxe_ZoEc.woff2","assets/index-B5g_wgsf.css","assets/index-ByeSLQGX.js","icon-180.png","icon-192.png","icon-512.png","index.html","manifest.webmanifest"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') { e.respondWith(fetch(req).catch(() => caches.match('./index.html'))); return; }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })));
});
