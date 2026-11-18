
// Módulo reutilizable de validación (Ejercicio 1.2, parte A)

// 1. MENSAJE DE ERROR

export function mensajeError(campo) {

    const validity = campo.validity;

    if (validity.valid) {
        return '';
    }

    if (validity.customError) {
        return campo.validationMessage;
    }

    if (validity.valueMissing) {

        if (campo.type === 'checkbox') {
            return 'Debes marcar esta casilla';
        }

        if (campo.type === 'radio') {
            return 'Debes seleccionar una opción';
        }

        if (campo.tagName === 'SELECT') {
            return 'Debes elegir una opción de la lista';
        }

        return 'Este campo es obligatorio';
    }

    if (validity.typeMismatch) {

        if (campo.type === 'email') {
            return 'Introduce una dirección de correo electrónico válida';
        }

        if (campo.type === 'url') {
            return 'Introduce una dirección URL válida';
        }

        return 'El formato introducido no es válido';
    }

    if (validity.patternMismatch) {
        return campo.title || 'El formato introducido no es correcto';
    }

    if (validity.tooShort) {
        return `Debes introducir al menos ${campo.minLength} caracteres`;
    }

    if (validity.tooLong) {
        return `No puedes introducir más de ${campo.maxLength} caracteres`;
    }

    if (validity.rangeUnderflow) {
        return `El valor debe ser igual o superior a ${campo.min}`;
    }

    if (validity.rangeOverflow) {
        return `El valor debe ser igual o inferior a ${campo.max}`;
    }

    if (validity.badInput) {
        return 'El valor introducido no es válido';
    }

    return campo.validationMessage;
}


// 2. MOSTRAR ERROR

export function mostrarError(campo) {

    const mensaje = mensajeError(campo);

    const zonaError = document.querySelector(
        `#error-${campo.name}`
    );

    if (zonaError) {
        zonaError.textContent = mensaje;
    }

    campo.classList.toggle('con-error', mensaje !== '');

    campo.setAttribute(
        'aria-invalid',
        mensaje !== '' ? 'true' : 'false'
    );

    return mensaje === '';
}


// 3. VALIDAR FORMULARIO

export function validarFormulario(formulario) {

    const campos = formulario.querySelectorAll(
        'input, select, textarea'
    );

    let primerInvalido = null;

    campos.forEach(campo => {

        const valido = mostrarError(campo);

        if (!valido && primerInvalido === null) {
            primerInvalido = campo;
        }

    });

    if (primerInvalido) {
        primerInvalido.focus();
        return false;
    }

    return true;
}


// 4. LIMPIAR ERRORES

export function limpiarErrores(formulario) {

    const campos = formulario.querySelectorAll(
        'input, select, textarea'
    );

    campos.forEach(campo => {

        campo.classList.remove('con-error');

        campo.setCustomValidity('');

        campo.setAttribute('aria-invalid', 'false');

        const zonaError = document.querySelector(
            `#error-${campo.name}`
        );

        if (zonaError) {
            zonaError.textContent = '';
        }

    });

}
