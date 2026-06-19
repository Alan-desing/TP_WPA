const CACHE_NAME = "relevamiento-v1";

const ARCHIVOS_CACHE = [
    "./",
    "./index.html",

    "./css/estilos.css",

    "./js/app.js",
    "./js/camara.js",
    "./js/ubicacion.js",
    "./js/ocr.js",
    "./js/copiar.js",

    "./manifest/manifest.json",

    "./assets/iconos/icono-192.jpeg",
    "./assets/iconos/icono-512.jpeg"
];


// Instalar Service Worker
self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ARCHIVOS_CACHE))
            .then(() => self.skipWaiting())
    );

});


// Activar Service Worker
self.addEventListener("activate", event => {

    event.waitUntil(

        Promise.all([

            caches.keys().then(cacheNames =>

                Promise.all(

                    cacheNames.map(cache => {

                        if (cache !== CACHE_NAME) {
                            return caches.delete(cache);
                        }

                    })

                )

            ),

            self.clients.claim()

        ])

    );

});


self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);

    const isTile = url.hostname.includes("tile.openstreetmap.org");

    event.respondWith((async () => {
        try {

            // TILES
            if (isTile) {
                const cache = await caches.open("tiles-cache");

                const cached = await cache.match(event.request);
                if (cached) return cached;

                const response = await fetch(event.request);

                if (response && response.status === 200) {
                    cache.put(event.request, response.clone());
                }

                return response;
            }

            // APP NORMAL
            const cached = await caches.match(event.request);
            if (cached) return cached;

            const response = await fetch(event.request);
            return response;

        } catch (err) {

            if (event.request.destination === "document") {
                return caches.match("./index.html");
            }

            return new Response("", { status: 503 });
        }
    })());
});