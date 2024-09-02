/* Variables */
const botonConvertir = document.getElementById("convertir");
const resultado = document.getElementById("resultado");
const inputPesos = document.getElementById("pesos");
const selectMoneda = document.getElementById("monedas");

/* función asincrónica en try catch */
async function getValores() {
    try {
        const res = await fetch("https://mindicador.cl/api/");
        const data = await res.json();
        console.log(data);
        
        /* Parsea el valor de CLP ingresado */
        const pesos = parseFloat(inputPesos.value);

        /* Selecciona el tipo de moneda y la inicializa */
        const moneda = selectMoneda.value;
        let valorMoneda = 0;

        if (moneda === "uf") {
            valorMoneda = data.uf.valor;
        } else if (moneda === "euro") {
            valorMoneda = data.euro.valor;
        } else if (moneda === "utm") {
            valorMoneda = data.utm.valor;
        }

        /* conversión */
        const conversion = pesos / valorMoneda;

        /* resultado */
        resultado.textContent = `Resultado: ${conversion.toFixed(2)} ${moneda.toUpperCase()}`;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        resultado.textContent = "Error al obtener los datos: " + error.message;
    }
}

/* Llama la función con el botón */
botonConvertir.addEventListener("click", getValores);
