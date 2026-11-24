const libros = [
  { titulo: "Cien años de soledad", autor: "García Márquez", paginas: 410, categoria: "Ficción", precio: 25.00 },
  { titulo: "El poder del ahora", autor: "Eckhart Tolle", paginas: 235, categoria: "Autoayuda", precio: 15.50 },
  { titulo: "El código Da Vinci", autor: "Dan Brown", paginas: 689, categoria: "Misterio", precio: 12.75 },
  { titulo: "1984", autor: "George Orwell", paginas: 328, categoria: "Ficción", precio: 18.00 },
  { titulo: "Sapiens", autor: "Yuval Noah Harari", paginas: 498, categoria: "Historia", precio: 30.00 }
];

//3.1 .reduce()

const totalPaginas = libros.reduce((total, libro) => total + libro.paginas, 0)
console.log(totalPaginas)

//3.2 .every() y .some()
const todosSonLargos = libros.every((libro)=> libro.paginas > 200)
console.log(todosSonLargos)

const algunoEsCaro = libros.some((libro)=> libro.precio > 28.00)
console.log(algunoEsCaro)