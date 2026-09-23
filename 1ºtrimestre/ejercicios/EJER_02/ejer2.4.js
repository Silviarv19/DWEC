//crear un ojeto
const usuario={
    nombre,
    email
}

const perfil={
    puesto,
    empresa
}

//combinar ambos objetos
const empleado={...usuario, ...perfil}

//comprobar si en perfil hay una direccion con una ciudad
const ciudad= empleado.perfil?.direccion?.ciudad ?? "Ciudad no especificada"