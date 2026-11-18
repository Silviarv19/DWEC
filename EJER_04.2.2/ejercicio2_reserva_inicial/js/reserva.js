// Ejercicio 2.1 · Reserva de viaje (versión inicial)

const formulario = document.getElementById('reserva');
const total = document.getElementById('total');
const resultado = document.getElementById('resultado');
const precioPersonaNoche = 50;

const entrada = formulario.elements.entrada;
const salida = formulario.elements.salida;
const personas = formulario.elements.personas;

// 1. Desactivar la validación del navegador y fijar las fechas mínimas (hoy)
formulario.noValidate = true;

const hoy = new Date();
const fechaHoy = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, '0'),
    String(hoy.getDate()).padStart(2, '0')
].join('-');

entrada.min = fechaHoy;
salida.min = fechaHoy;

// 2. Función mostrarError(campo), como en el ejercicio 1.1
function mostrarError(campo) {
    const zonaError = document.querySelector(`#error-${campo.name}`);

    zonaError.textContent = campo.validationMessage;
    campo.classList.toggle('con-error', !campo.validity.valid);

    return campo.validity.valid;
}

// 3. Función comprobarReglas(): la salida debe ser posterior a la entrada (setCustomValidity)
function comprobarReglas() {
    salida.setCustomValidity('');

    if (entrada.value && salida.value) {
        if (salida.value <= entrada.value) {
            salida.setCustomValidity(
                'La fecha de salida debe ser posterior a la fecha de entrada.'
            );
        }
    }
}

// 4. Funciones calcularNoches() y calcularTotal()

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

function calcularTotal() {
    const numeroPersonas = personas.valueAsNumber;
    const noches = calcularNoches();

    const importe = Number.isFinite(numeroPersonas) && numeroPersonas > 0
        ? numeroPersonas * noches * precioPersonaNoche
        : 0;

    total.textContent = importe.toFixed(2) + ' €';

    return importe;
}

function obtenerCampos() {
    return Array.from(formulario.elements)
        .filter(campo => campo.matches('input'));
}

// 5. Eventos input y focusout en el formulario

formulario.addEventListener('focusout', (evento) => {
    const campo = evento.target;

    if (!campo.matches('input')) {
        return;
    }

    comprobarReglas();
    mostrarError(campo);

    if (campo === entrada && salida.value) {
        mostrarError(salida);
    }

    calcularTotal();
});

formulario.addEventListener('input', (evento) => {
    const campo = evento.target;

    if (!campo.matches('input')) {
        return;
    }

    comprobarReglas();

    if (campo.classList.contains('con-error')) {
        mostrarError(campo);
    }

    if (campo === entrada && salida.value) {
        mostrarError(salida);
    }

    calcularTotal();
});

// 6. Evento submit: valida todos los campos y muestra el resumen de la reserva
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    comprobarReglas();

    const campos = obtenerCampos();

    const camposInvalidos = campos.filter(
        campo => !mostrarError(campo)
    );

    if (camposInvalidos.length > 0) {
        camposInvalidos[0].focus();
        return;
    }

    const datos = Object.fromEntries(new FormData(formulario));

    const noches = calcularNoches();
    const importe = calcularTotal();

    const reserva = {
        nombre: datos.nombre,
        personas: personas.valueAsNumber,
        entrada: datos.entrada,
        salida: datos.salida,
        noches: noches,
        total: importe.toFixed(2) + ' €'
    };

    resultado.textContent = JSON.stringify(reserva, null, 2);
});

// 7. Evento reset
formulario.addEventListener('reset', () => {
    resultado.textContent = '';
    total.textContent = '0.00 €';

    obtenerCampos().forEach(campo => {
        campo.classList.remove('con-error');

        const zonaError = document.querySelector(
            `#error-${campo.name}`
        );

        if (zonaError) {
            zonaError.textContent = '';
        }
    });

    salida.setCustomValidity('');
});
