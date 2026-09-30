import { agregarLibro, obtenerLibros, buscarLibro, eliminarLibro, calcularTotalPaginas, ordenarPorPaginas, hayLibrosLargos, todosSonLibrosCortos } from "./biblioteca.js"

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

//ordenar por páginas
console.log(ordenarPorPaginas())

//comprobar libro largo
console.log(`Hay libros con más de 800 páginas: ${hayLibrosLargos(800)}`)

//comprobar si todos libros tienen menos paginas que
console.log(`Todos los libros menos de 900 páginas: ${todosSonLibrosCortos(900)}`)