const botonOCROCR = document.getElementById("btn-ocr");
const textoOCR = document.getElementById("texto-ocr");
const canvasOCR = document.getElementById("imagen-capturada");

async function extraerTexto() {

    try {

        textoOCR.value = "Procesando imagen...";

        const resultado = await Tesseract.recognize(
            canvasOCR,
            "spa"
        );

        textoOCR.value = resultado.data.text;

    } catch (error) {

        console.error("Error OCR:", error);

        textoOCR.value = "Error al procesar la imagen.";

    }
}

botonOCROCR.addEventListener("click", extraerTexto);