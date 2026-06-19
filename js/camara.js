// Obtener elementos del HTML
const video = document.getElementById("camara");
const botonIniciarCamara = document.getElementById("btn-iniciar-camara");
const botonCapturar = document.getElementById("btn-capturar");
const botonOCR = document.getElementById("btn-ocr");
const canvas = document.getElementById("imagen-capturada");

const contexto = canvas.getContext("2d");

// Variable para guardar el flujo de la cámara
let flujoCamara = null;


// Abrir la cámara
async function iniciarCamara() {
    try {
        flujoCamara = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            }
        });

        // Mostrar video en pantalla
        video.srcObject = flujoCamara;

        // Habilitar botón de captura
        botonCapturar.disabled = false;

        // Deshabilitar OCR hasta que haya una nueva captura
        botonOCR.disabled = true;

    } catch (error) {
        alert("No se pudo acceder a la cámara.");
        console.error("Error al abrir cámara:", error);
    }
}


// Capturar imagen
function capturarImagen() {

    // Ajustar tamaño del canvas al tamaño del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dibujar la imagen actual del video en el canvas
    contexto.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Mostrar el canvas con la imagen capturada
    canvas.style.display = "block";

    // Detener la cámara
    flujoCamara.getTracks().forEach(track => {
        track.stop();
    });

    video.srcObject = null;

    // Deshabilitar captura nuevamente
    botonCapturar.disabled = true;

    // Habilitar OCR porque ya existe una imagen capturada
    botonOCR.disabled = false;


    // Aquí después llamaremos a la ubicación automática
    // obtenerUbicacion();
}


// Eventos de botones
botonIniciarCamara.addEventListener("click", iniciarCamara);
botonCapturar.addEventListener("click", capturarImagen);