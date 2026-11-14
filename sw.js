const CACHE = "boets-v10";
const PRECACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./tokens.css",
  "./fonts.css",
  "./app.js",
  "./blocks.js",
  "./activity.js",
  "./food.js",
  "./icons.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-192.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./favicon.png",
  "./brand/logo-horizontal-tight.svg",
  "./brand/logo-compact.svg",
  "./brand/logo-compact-tight.svg",
  "./img/arseniy-mma.webp",
  "./img/arseniy-mma-cap.webp",
  "./img/emo-rage.webp",
  "./img/emo-focus.webp",
  "./img/emo-smile.webp",
  "./img/emo-tired.webp",
  "./img/emo-victory.webp",
  "./img/days/day-tennis.webp",
  "./img/days/day-press-shoulders.webp",
  "./img/days/day-shoulders-legs.webp",
  "./img/days/day-pullups.webp",
  "./img/days/day-home-mobility.webp",
  "./img/days/day-sunday-rest-prep.webp",
  "./data/recipes.json",
  "./data/menu-week.json",
  "./data/shopping-week.json",
  "./fonts/fira-sans-extra-condensed-600-cyr.woff2",
  "./fonts/fira-sans-extra-condensed-600-lat.woff2",
  "./fonts/fira-sans-extra-condensed-700-cyr.woff2",
  "./fonts/fira-sans-extra-condensed-700-lat.woff2",
  "./fonts/fira-sans-extra-condensed-800-cyr.woff2",
  "./fonts/fira-sans-extra-condensed-800-lat.woff2",
  "./fonts/golos-text-400-cyr.woff2",
  "./fonts/golos-text-400-lat.woff2",
  "./fonts/golos-text-500-cyr.woff2",
  "./fonts/golos-text-500-lat.woff2",
  "./fonts/golos-text-600-cyr.woff2",
  "./fonts/golos-text-600-lat.woff2",
  "./fonts/golos-text-700-cyr.woff2",
  "./fonts/golos-text-700-lat.woff2"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

async function cachedExerciseAsset(req) {
  const cache = await caches.open(CACHE);
  let stored = await cache.match(req.url);
  if (!stored) {
    const res = await fetch(req.url);
    if (!res || !res.ok) return res;
    await cache.put(req.url, res.clone());
    stored = await cache.match(req.url);
  }
  const type = stored.headers.get("Content-Type") || (req.url.endsWith(".mp4") ? "video/mp4" : "image/webp");
  const buf = await stored.arrayBuffer();
  const range = req.headers.get("Range");
  if (!range) {
    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Type": type,
        "Content-Length": String(buf.byteLength),
        "Accept-Ranges": "bytes"
      }
    });
  }
  const match = /bytes=(\d+)-(\d*)/.exec(range);
  if (!match || Number(match[1]) >= buf.byteLength) {
    return new Response(null, { status: 416, headers: { "Content-Range": "bytes */" + buf.byteLength } });
  }
  const start = Number(match[1]);
  const end = match[2] ? Math.min(Number(match[2]), buf.byteLength - 1) : buf.byteLength - 1;
  const slice = buf.slice(start, end + 1);
  return new Response(slice, {
    status: 206,
    headers: {
      "Content-Type": type,
      "Content-Range": "bytes " + start + "-" + end + "/" + buf.byteLength,
      "Content-Length": String(slice.byteLength),
      "Accept-Ranges": "bytes"
    }
  });
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) {
    if (url.hostname === "i.ytimg.com" || url.hostname === "img.youtube.com") {
      event.respondWith(
        caches.open(CACHE).then(async (cache) => {
          const hit = await cache.match(req);
          if (hit) return hit;
          try {
            const res = await fetch(req);
            if (res.ok) cache.put(req, res.clone());
            return res;
          } catch (e) {
            return hit || Promise.reject(e);
          }
        })
      );
    }
    return;
  }
  if (url.pathname.includes("/img/ex/") || url.pathname.includes("/img/food/")) {
    event.respondWith(cachedExerciseAsset(req));
    return;
  }
  if (url.pathname.endsWith(".json")) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }
  event.respondWith(
    caches.match(req).then((cached) => {
      const fresh = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fresh;
    })
  );
});
