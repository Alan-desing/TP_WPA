self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Guardando archivos...");
                return cache.addAll(ARCHIVOS_CACHE);
            })
            .catch(error => {
                console.error("Error de caché:", error);
            })
    );

});