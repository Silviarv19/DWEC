//importar desde gestorUusarios
import {crearPerfil, mostrarPerfil, esMayorDeEdad, obtenerMayorEdad, calcularPromedioEdad} from "gestorUsuarios.js"

// crear array con los usuarios
const usuarios=[
    crearPerfil("Silvia", "silviarv", 18),
    crearPerfil("Sergio", "sergio22", 12),
    crearPerfil("Pablo", "pablo2", 5),
    crearPerfil("Brandon", "brandon33333", 19),
    crearPerfil("Isaac", "isaac2", 19)
]


usuarios.forEach(usuario => {
    mostrarPerfil(usuario)
});

const mayores= obtenerMayorEdad(usuarios)

// mostrar encabezado y array

