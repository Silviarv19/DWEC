
// Ejercicio 1.1 · Registro de usuario (versión inicial)

const formulario = document.getElementById('registro');
const resultado = document.getElementById('resultado');

// 1. Desactivar la validación del navegador (noValidate)
formulario.noValidate = true;

// 2. Función mostrarError(campo): escribe campo.validationMessage en #error-<name>,
//    activa o quita la clase 'con-error' y devuelve true si el campo es válido
function mostrarError(campo) {
    const zonaError = document.querySelector(`#error-${campo.name}`);

    zonaError.textContent = campo.validationMessage;
    campo.classList.toggle('con-error', !campo.validity.valid);

    return campo.validity.valid;
}

// Obtener los campos input del formulario
function obtenerCampos() {
    return Array.from(formulario.elements)
        .filter(campo => campo.matches('input'));
}

// 3. Evento focusout en el formulario: valida el campo que se abandona
formulario.addEventListener('focusout', (evento) => {
    const campo = evento.target;

    if (campo.matches('input')) {
        mostrarError(campo);
    }
});

// 4. Evento input en el formulario: si el campo ya tenía error, se revalida
formulario.addEventListener('input', (evento) => {
    const campo = evento.target;

    if (
        campo.matches('input') &&
        campo.classList.contains('con-error')
    ) {
        mostrarError(campo);
    }
});

// 5. Evento submit: valida todos los campos; si hay errores, foco en el primero;
//    si no, muestra los datos en JSON sin la contraseña
formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const campos = obtenerCampos();

    const camposInvalidos = campos.filter(
        campo => !mostrarError(campo)
    );

    if (camposInvalidos.length > 0) {
        camposInvalidos[0].focus();
        return;
    }

    const datos = Object.fromEntries(new FormData(formulario));
    delete datos.clave;
    resultado.textContent = JSON.stringify(datos, null, 2);
});

// 6. Evento reset: limpia el resultado y todos los errores
formulario.addEventListener('reset', () => {
    resultado.textContent = '';

    obtenerCampos().forEach(campo => {
        campo.classList.remove('con-error');

        const zonaError = document.querySelector(
            `#error-${campo.name}`
        );

        if (zonaError) {
            zonaError.textContent = '';
        }
    });
});
