const valor = document.getElementById("valor");
const origen = document.getElementById("origen");
const destino = document.getElementById("destino");
const boton = document.getElementById("convertir");
const form = document.getElementById("formTemperatura");
const resultado = document.getElementById("resultado");

// Habilitar el botón solo si se completan los campos
function validarCampos() {
    boton.disabled = !(
        valor.value.trim() !== "" &&
        Number.isFinite(Number(valor.value)) &&
        origen.value !== "" &&
        destino.value !== ""
    );
}

valor.addEventListener("input", validarCampos);
origen.addEventListener("change", validarCampos);
destino.addEventListener("change", validarCampos);

// Realizar la conversión
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const numero = Number(valor.value);

    let celsius;

    if (origen.value === "C") {
        celsius = numero;
    } else if (origen.value === "F") {
        celsius = (numero - 32) * 5 / 9;
    } else {
        celsius = numero - 273.15;
    }

    if (origen.value === "K" && numero < 0) {
        resultado.textContent =
            "Kelvin no puede ser menor que cero.";
        return;
    }

    let conversion;

    if (destino.value === "C") {
        conversion = celsius;
    } else if (destino.value === "F") {
        conversion = celsius * 9 / 5 + 32;
    } else {
        conversion = celsius + 273.15;
    }

    if (destino.value === "K" && conversion < 0) {
        resultado.textContent =
            "El resultado está por debajo del cero absoluto.";
        return;
    }

    const unidades = {
        C: "°C",
        F: "°F",
        K: "K"
    };

    resultado.textContent =
        `${numero} ${unidades[origen.value]} = ` +
        `${conversion.toFixed(2)} ${unidades[destino.value]}`;
});