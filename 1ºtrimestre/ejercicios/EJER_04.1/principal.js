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
const nombreColor = document.getElementById("nombre-color")

paleta.addEventListener("click", function(evento){
    if(evento.target.classList.contains("muestra")){
        const color = evento.target.getAttribute("data-color")
        const nombre = evento.target.getAttribute("data-nombre")

        lienzo.style.backgroundColor = color
        nombreColor.textContent = nombre
    }
})

// ---------- Ejercicio 6 · Grupo con foco ----------
const grupo = document.getElementById("grupo-contacto")
const mensajeFoco = document.getElementById("mensaje-foco")

grupo.addEventListener("focusin", function(evento){
    grupo.classList.add("activo")
    mensajeFoco.textContent = "Editando: " + evento.target.placeholder
})

grupo.addEventListener("focusout", function(evento){
    if(!grupo.contains(evento.relatedTarget)){
        grupo.classList.remove("activo")
        mensajeFoco.textContent = "Ningún campo activo"
    }
})

// ---------- Ejercicio 7 · Burbuja y captura ----------
const externa = document.getElementById("caja-externa")
const media = document.getElementById("caja-media")
const interna = document.getElementById("caja-interna")
const registro = document.getElementById("registro-flujo")
const limpiar = document.getElementById("boton-limpiar-flujo")

function registrar(nombre){
    const elemento = document.createElement("li")
    elemento.textContent = nombre
    registro.appendChild(elemento)
}

externa.addEventListener("click", function(){
    registrar("Externa")
})

media.addEventListener("click", function(){
    registrar("Media")
})

interna.addEventListener("click", function(){
    registrar("Interna")
})

externa.addEventListener("click", function(){
    registrar("Externa (captura)")
}, true )

media.addEventListener("click", function(){
    registrar("Media (captura)")
}, true)

interna.addEventListener("click", function(){
    registrar("Interna (captura)")
}, true)

limpiar.addEventListener("click", function(){
    registro.innerHTML = ""
})



// ---------- Ejercicio 8 · Detener y cancelar ----------
const tarjetaProducto = document.getElementById("tarjeta-producto")
const botonComprar = document.getElementById("boton-comprar")
const enlace = document.getElementById("enlace-info")
const mensajeEstado = document.getElementById("mensaje-estado")

function escribirMensaje(texto) {
    const linea = document.createElement("p")
    linea.textContent= texto
    mensajeEstado.appendChild(linea)
}

tarjetaProducto.addEventListener("click", function(){
    escribirMensaje("Has pulsado la tarjeta")
})

botonComprar.addEventListener("click", function(evento){
    evento.stopPropagation()
    escribirMensaje("Producto comprado")
})

enlace.addEventListener("click", function(evento){
    evento.preventDefault()
    escribirMensaje("Enlace bloqueado")
})



