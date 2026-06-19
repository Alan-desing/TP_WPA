let mapa;
let marcador;

function obtenerUbicacion() {

    if (!navigator.geolocation) {
        alert("La geolocalización no está disponible en este dispositivo.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        mostrarUbicacion,
        mostrarError
    );
}

function mostrarUbicacion(posicion) {

    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;

    // reiniciar mapa si ya existe
    if (mapa) {
        mapa.remove();
    }

    // crear mapa
    mapa = L.map("mapa").setView([latitud, longitud], 16);

    // capa de tiles con fallback seguro
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {

        attribution: "&copy; OpenStreetMap",

        maxZoom: 19,

        crossOrigin: true,

        errorTileUrl: "./assets/iconos/icono-192.jpeg",

        updateWhenIdle: true,
        keepBuffer: 2

    }).addTo(mapa);

    // marcador
    marcador = L.marker([latitud, longitud])
        .addTo(mapa)
        .bindPopup("Ubicación del relevamiento")
        .openPopup();

    console.log("Ubicación obtenida:");
    console.log("Latitud:", latitud);
    console.log("Longitud:", longitud);
}

function mostrarError(error) {

    switch (error.code) {

        case error.PERMISSION_DENIED:
            alert("El usuario rechazó el acceso a la ubicación.");
            break;

        case error.POSITION_UNAVAILABLE:
            alert("No se pudo obtener la ubicación.");
            break;

        case error.TIMEOUT:
            alert("La solicitud de ubicación tardó demasiado.");
            break;

        default:
            alert("Ocurrió un error desconocido.");
    }
}