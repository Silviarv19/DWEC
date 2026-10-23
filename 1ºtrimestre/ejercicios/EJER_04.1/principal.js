// ==========================================================
// EJER_04.1 · Eventos en JavaScript
// Escribe aquí tus soluciones (módulo ES6).
// - Nombres de variables y funciones en español.
// - Usa addEventListener (no onclick en el HTML).
// ==========================================================

// ---------- Ejercicio 1 · Contador de clics ----------
let contador = 0
const valor = document.getElementById("valor-contador")
const suma = document.getElementById("boton-sumar")
const resta = document.getElementById("boton-restar")
const reiniciar = document.getElementById("boton-reiniciar")

console.log("cargado")

suma.addEventListener("click", function() {
    contador++
    valor.textContent = contador

    if( contador < 0){
    valor.style.color = "red"
    } else {
    valor.style.color = "black"
    }
})

resta.addEventListener("click", function(){
    contador--
    valor.textContent = contador

    if( contador < 0){
    valor.style.color = "red"
    } else {
    valor.style.color = "black"
    }
})

reiniciar.addEventListener("click", function(){
    contador = 0
    valor.textContent = contador
    valor.style.color = "black"
})



// ---------- Ejercicio 2 · Tarjeta sensible al ratón ----------
const tarjeta = document.getElementById("tarjeta-raton")
const mensaje = document.getElementById("mensaje-raton")

tarjeta.addEventListener("mouseenter", function(){
    tarjeta.classList.add("activa")
    mensaje.textContent = "¡Estás dentro!"
})

tarjeta.addEventListener("mouseleave", function(){
    tarjeta.classList.remove("activa")
    mensaje.textContent = "Pasa el ratón por la tarjeta"
})

tarjeta.addEventListener("dblclick", function(){
    mensaje.textContent = "¡Doble clic!"
})

// ---------- Ejercicio 3 · Espejo de texto ----------
const texto = document.getElementById("campo-texto")
const eco = document.getElementById("eco-texto")
const restantes = document.getElementById("caracteres-restantes")

texto.addEventListener("input", function(){
    eco.textContent = texto.value 

    restantes.textContent = 30 - texto.value.length

    if(30 - texto.value.length <= 5){
        restantes.classList.add("poco")
    } else {
        restantes.classList.remove("poco")
    }
})


// ---------- Ejercicio 4 · Mover con el teclado ---------- NO HACER


// ---------- Ejercicio 5 · Paleta de colores ----------
const paleta = document.getElementById("paleta")
const lienzo = document.getElementById("lienzo")
const nombre = document.getElementById("nombre-color")



// ---------- Ejercicio 6 · Grupo con foco ----------


// ---------- Ejercicio 7 · Burbuja y captura ----------


// ---------- Ejercicio 8 · Detener y cancelar ----------
