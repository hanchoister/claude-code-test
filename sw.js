/* Daily Journal · service worker · network-first for HTML, cache-first for assets */
const VERSION = "v6";
const CACHE = `journal-${VERSION}`;
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-maskable.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  /* Never intercept the GitHub API — must always hit network */
  if (url.hostname === "api.github.com") return;
  /* Only handle same-origin GETs */
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;

  const isHTML = e.request.mode === "navigate"
    || (e.request.destination === "document")
    || url.pathname.endsWith(".html")
    || url.pathname === "/" || url.pathname.endsWith("/");

  if (isHTML) {
    /* Network-first for HTML so code updates propagate on the next reload. */
    e.respondWith(
      fetch(e.request)
        .then((resp) => {
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return resp;
        })
        .catch(() => caches.match(e.request).then((c) => c || caches.match("./index.html")))
    );
    return;
  }

  /* Cache-first for static assets. */
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const net = fetch(e.request)
        .then((resp) => {
          if (resp && resp.ok) {
            const copy = resp.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return resp;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});
