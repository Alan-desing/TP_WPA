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

    // Si el mapa ya existe, se elimina para actualizarlo
    if (mapa) {
        mapa.remove();
    }

    // Crear mapa centrado en la ubicación actual
    mapa = L.map("mapa").setView([latitud, longitud], 16);

    // Cargar mapa de OpenStreetMap
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap"
    }).addTo(mapa);

    // Crear marcador
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