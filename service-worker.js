const CACHE_NAME = "relevamiento-v1";

const ARCHIVOS_CACHE = [
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
            .then(cache => {
                return cache.addAll(ARCHIVOS_CACHE);
            })

    );

});


// Activar Service Worker
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()
            .then(cacheNames => {

                return Promise.all(

                    cacheNames.map(cache => {

                        if (cache !== CACHE_NAME) {
                            return caches.delete(cache);
                        }

                    })

                );

            })

    );

});


// Interceptar peticiones
self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                return response || fetch(event.request);

            })

    );

});