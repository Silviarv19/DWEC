// Ejercicio 1.2 · Registro de usuario (versión final)
// Copia aquí tu solución del ejercicio 1.1 y amplíala siguiendo el enunciado.
// import { mostrarError, validarFormulario, limpiarErrores } from './validaciones.js';

import { mostrarError, validarFormulario, limpiarErrores } from './validaciones.js';
const formulario = document.getElementById('registro');
const resultado = document.getElementById('resultado');

//Desactivar la validación del navegador (noValidate)
formulario.noValidate = true;

//Evento focusout: valida el campo que pierde el foco

formulario.addEventListener('focusout', (evento) => {
    const campo = evento.target;

    if (campo.matches('input, select, textarea')) {
        mostrarError(campo);
    }
})

//Evento input: revalida campos que ya tenían errores

formulario.addEventListener('input', (evento) => {
    const campo = evento.target;
    if (campo.matches('input, select, textarea') && campo.classList.contains('con-error')) {
        mostrarError(campo);
    }
})

// Evento change: permite actualizar también selects y radios

formulario.addEventListener('change', (evento) => {
    const campo = evento.target;
    if (campo.matches('input, select, textarea') && campo.classList.contains('con-error')) {
        mostrarError(campo);
    }
})

// Evento submit: valida y muestra los datos

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!validarFormulario(formulario)) {
        return;
    }
    const datos = Object.fromEntries(new FormData(formulario));

    //Con esto no se muestra la contraseña
    delete datos.clave;

    resultado.textContent = JSON.stringify(datos, null, 2)
})

// Evento reset: limpia errores y resultado

formulario, addEventListener('reset', (evento) => {
    resultado.textContent = '';
    // Esperar a que el navegador restablezca los valores
    setTimeout(() => {
        limpiarErrores(formulario)
    }, 0);
})
