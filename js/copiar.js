const botonCopiar = document.getElementById("btn-copiar");
const textoOCRCopiar = document.getElementById("texto-ocr");

async function copiarTexto() {

    try {

        await navigator.clipboard.writeText(
            textoOCRCopiar.value
        );

        alert("Texto copiado al portapapeles.");

    } catch (error) {

        console.error("Error al copiar:", error);

        alert("No se pudo copiar el texto.");
    }
}

botonCopiar.addEventListener("click", copiarTexto);