//crear y exportar una funcion q duevulve un ojeto
export function crearPerfil(nombre, email, edad){
    return {
        nombre,
        email,
        edad
    }
}

//crear funcion que muestre perfil
function mostrarPerfil(usuario){
    console.log(`Nombre: ${nombre} Email: ${email} Edad: ${edad}`)
}

export default mostrarPerfil() 

//exportar nueva funcion

export function esMayorDeEdad(usuario){
    if(usuario.edad>=18){
        return true
    }else{
        return false
    }
}

export function obtenerMayorEdad(usuarios){
    return usuarios.filter(usuarios => esMayorDeEdad(usuario))
}

export function calcularPromedioEdad(usuarios){
    const promedio = usuarios.reduce(
  (acumulador, usuario) =>{ return acumulador + usuario.edad},
  0)
   return promedio/usuarios.lenght
}