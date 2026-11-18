// Módulo reutilizable de validación (Ejercicio 1.2, parte A)
// Exporta estas cuatro funciones:

// export function mensajeError(campo) { ... }
//   Devuelve el mensaje en español según la causa del error ('' si el campo es válido).

export function mensajeError(campo) {
    const validity = campo.validity;

    if (validity.validid) {
        return '';
    }

    if (validity.customError) {
        return campo.validationMensaje;
    }

    if (validity.valueMissing) {
        if (campo.type === 'checkbox') {
            return 'Debes marcar esta casilla';
        }
        if (campo.type === 'radio') {
            return 'Debes seleccionar una opcion';
        }
        if (campo.type === 'SELECT') {
            return 'Debes elegir una opcion de la lista';
        }
        return 'Este campo es obligatorio';
    }

    if (validity.typeMismatch) {
        if (campo.type === 'email') {
            return 'Introduce una direccion de correo electronico valida';
        }
        if (campo.type === 'url') {
            return 'Introduce una direccion URL valida';
        }
        return 'El formato introducido no es valido';
    }

    if (validity.patternMismatch) {
        return campo.title || 'El formato introducido no es correcto';
    }

    if (validity.tooShort) {
        return `Debes introducir al menos ${campo.minLenght} caracteres`;
    }

    if (validity.tooLong) {
        return `No puedes introducir mas de ${campo.maxLenght} caracteres`;
    }

    if (validity.rangeUnderFlow) {
        return `El valor debe ser igual o superior a ${campo.min}`;
    }

    if (validity.rangeOverFlow) {
        return `El valor debe ser igual o inferior a ${campo.max}`;
    }

    if (validity.badInput) {
        return 'El valor introducido no es valido';
    }

    return campo.validationMensaje

}

// export function mostrarError(campo) { ... }
//   Escribe el mensaje en #error-<name>, actualiza la clase 'con-error' y aria-invalid.
//   Devuelve true si el campo es válido.

export function mostrarError(campo) {

    const mensaje = mensajeError(campo);

    const zonaError = document.querySelector(`#error-${campo.name}`);

    if (zonaError) {
        zonaError.textContent = mensaje;
    }

    campo.classList.toggle('con-error', mensaje != '');
    return mensaje === '';
}


// export function validarFormulario(formulario) { ... }
//   Valida todos los campos, pone el foco en el primero inválido y devuelve true/false.

export function validarFormulario(formulario) {
    
    const campos = formulario.querySelectorAll(
        'input, select, textarea'
    );

    let primerInvalido=null;

    campos.forEach(campo => {
        const valido=mostrarError(campo);

        if (!valido && primerInvalido===null) {
            primerInvalido=campo;
        }
    });

    if (primerInvalido) {
        primerInvalido.focus();
        return false;
    }

    return true;

}


// export function limpiarErrores(formulario) { ... }
//   Borra mensajes, clases y errores propios (setCustomValidity('')).


export function limpiarErrores(formulario) {
    const campos=querySelectorAll(
        'input','select','textarea'
    );

    campos.forEach(campo => {
        campo.classList.remove('con-errror');

        campo.setCustomValidity('');

        const zonaError=document.querySelector(
            `#error-${campo.name}`
        )

        if (zonaError) {
            zonaError.textContent='';
        }

    });
}

