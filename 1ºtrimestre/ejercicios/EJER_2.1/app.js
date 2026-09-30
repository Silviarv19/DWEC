import { agregarLibro, obtenerLibros, buscarLibro, eliminarLibro, calcularTotalPaginas } from "./biblioteca.js"

//mostrar array
console.log(obtenerLibros())

//agregar libro
agregarLibro({
id: 11,
titulo:"Muerte a la oscuridad",
autor:"Stella Tack",
paginas: 695
})

//mostrar array
console.log(obtenerLibros())

//buscar libro
console.log(buscarLibro(11))

//eliminar libro
eliminarLibro(11)

//mostrar array
console.log(obtenerLibros())

//mostrar total paginas
console.log(`Total de páginas: ${calcularTotalPaginas()}`)