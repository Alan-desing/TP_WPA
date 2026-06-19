const CACHE_NAME = "relevamiento-v1";

const ARCHIVOS_CACHE = [
    "./index.html"

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