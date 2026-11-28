/* Service worker: rede primeiro, cache como reserva (o app abre sem internet dentro do shopping). */
const CACHE = "megamapa-v23";
const FONTS = "megamapa-fontes-v1";
const ASSETS = ["./", "index.html", "core.js", "camera.js", "fuse.min.js", "config.js", "lojas-data.js", "planta-real.jpg", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== FONTS).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  /* fonte Archivo (Google Fonts): guardada no primeiro acesso, para a tipografia valer também sem sinal */
  if (u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then(k => k.match(e.request).then(hit => hit || fetch(e.request).then(r => { if (r.ok || r.type === "opaque") k.put(e.request, r.clone()); return r; }))));
    return;
  }
  if (u.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); } return r; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || (e.request.mode === "navigate" ? caches.match("index.html") : Response.error())))
  );
});
