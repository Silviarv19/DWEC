
// Ejercicio 2.2 · Reserva de viaje (versión final)

import {
    mostrarError,
    limpiarErrores
} from './validaciones.js';

const formulario = document.getElementById('reserva');
const total = document.getElementById('total');
const contador = document.getElementById('contador');
const resultado = document.getElementById('resultado');

const entrada = formulario.elements.entrada;
const salida = formulario.elements.salida;
const personas = formulario.elements.personas;
const comentarios = formulario.elements.comentarios;
const actividades = formulario.elements.actividades;

// Desactivar validación del navegador
formulario.noValidate = true;


// Fijar fechas mínimas (hoy)
const hoy = new Date();

const fechaHoy = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, '0'),
    String(hoy.getDate()).padStart(2, '0')
].join('-');

entrada.min = fechaHoy;
salida.min = fechaHoy;


// 1. Comprobar reglas personalizadas

function comprobarReglas() {

    salida.setCustomValidity('');
    actividades.setCustomValidity('');

    // La salida debe ser posterior a la entrada
    if (entrada.value && salida.value) {

        if (salida.value <= entrada.value) {
            salida.setCustomValidity(
                'La fecha de salida debe ser posterior a la fecha de entrada.'
            );
        }
    }

    // Máximo 3 actividades
    if (actividades.selectedOptions.length > 3) {
        actividades.setCustomValidity(
            'Puedes seleccionar un máximo de 3 actividades.'
        );
    }
}


// 2. Calcular noches

function calcularNoches() {

    if (!entrada.value || !salida.value) {
        return 0;
    }

    const diferencia =
        new Date(salida.value) - new Date(entrada.value);

    const noches = diferencia / 86400000;

    return Number.isFinite(noches) && noches > 0
        ? noches
        : 0;
}


// 3. Calcular total

function calcularTotal() {

    const numeroPersonas = personas.valueAsNumber;
    const noches = calcularNoches();

    // Precio de la habitación
    const precioHabitacion = Number(
        formulario.elements.habitacion.value
    );

    // Sumar extras seleccionados
    const preciosExtras = Array.from(
        formulario.querySelectorAll(
            'input[name="extras"]:checked'
        ),
        casilla => Number(casilla.dataset.precio)
    );

    const sumarExtras = preciosExtras.reduce(
        (acumulado, precio) => acumulado + precio,
        0
    );

    // Calcular importe
    const importe =
        Number.isFinite(numeroPersonas) && numeroPersonas > 0
            ? (precioHabitacion + sumarExtras * numeroPersonas) * noches
            : 0;

    total.textContent = importe.toFixed(2) + ' €';

    return importe;
}


// 4. Contador de comentarios

function actualizarContador() {

    contador.textContent =
        `${comentarios.value.length}/120`;
}


// 5. Evento focusout

formulario.addEventListener('focusout', (evento) => {

    const campo = evento.target;

    if (!campo.matches('input, select, textarea')) {
        return;
    }

    comprobarReglas();

    mostrarError(campo);

    // Si cambia la entrada, comprobar también la salida
    if (campo === entrada && salida.value) {
        mostrarError(salida);
    }

    calcularTotal();
});


// 6. Evento input

formulario.addEventListener('input', (evento) => {

    const campo = evento.target;

    if (!campo.matches('input, select, textarea')) {
        return;
    }

    comprobarReglas();

    // Revalidar campo actual si tenía error
    if (campo.classList.contains('con-error')) {
        mostrarError(campo);
    }

    // Revalidar salida si cambia la entrada
    if (campo === entrada && salida.value) {
        mostrarError(salida);
    }

    // Revalidar actividades
    if (campo === actividades) {
        mostrarError(actividades);
    }

    actualizarContador();

    calcularTotal();
});


// 7. Evento invalid (capturado)

formulario.addEventListener('invalid', (evento) => {

    mostrarError(evento.target);

}, true);


// 8. Evento submit

formulario.addEventListener('submit', (evento) => {

    evento.preventDefault();

    comprobarReglas();

    // Comprobar todos los campos
    if (!formulario.checkValidity()) {

        const primerInvalido = formulario.querySelector(
            'input:invalid, select:invalid, textarea:invalid'
        );

        if (primerInvalido) {
            primerInvalido.focus();
        }

        return;
    }

    // Recoger datos del formulario
    const datos = new FormData(formulario);

    const nombre = datos.get('nombre');
    const entradaReserva = datos.get('entrada');
    const salidaReserva = datos.get('salida');
    const personasReserva = datos.get('personas');
    const habitacion = datos.get('habitacion');

    const actividadesReserva = datos.getAll('actividades');
    const extrasReserva = datos.getAll('extras');

    const observaciones = datos.get('comentarios');

    const noches = calcularNoches();
    const importe = calcularTotal();

    // Crear resumen
    const reserva = `
RESUMEN DE LA RESERVA

Nombre: ${nombre}

Entrada: ${entradaReserva}
Salida: ${salidaReserva}

Personas: ${personasReserva}
Noches: ${noches}

Habitación: ${habitacion}

Actividades: ${actividadesReserva.length
            ? actividadesReserva.join(', ')
            : 'ninguna'
        }

Extras: ${extrasReserva.length
            ? extrasReserva.join(', ')
            : 'ninguno'
        }

Comentarios: ${observaciones || 'ninguno'}

Total estimado: ${importe.toFixed(2)} €
    `;

    resultado.textContent = reserva;
});


// 9. Evento reset

formulario.addEventListener('reset', () => {

    limpiarErrores(formulario);

    resultado.textContent = '';

    total.textContent = '0.00 €';

    contador.textContent = '0/120';

});
