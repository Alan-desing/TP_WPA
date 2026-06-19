if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("service-worker.js")
            .then(() => {
                console.log("Service Worker registrado.");
            })
            .catch(error => {
                console.error("Error al registrar Service Worker:", error);
            });

    });

    self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                console.log("Intentando cachear:", ARCHIVOS_CACHE);

                return cache.addAll(ARCHIVOS_CACHE);

            })
            .catch(error => {

                console.error("ERROR CACHE:", error);

            })

    );

});

}