const libros=[
    {id: 1, titulo: "Hasta que nos quedemos sin estrellas", autor: "Inma Rubiales", paginas: 552},
    {id: 2, titulo: "A un lado de la carretera", autor: "Paul Pen", paginas: 332},
    {id: 3, titulo: "Nunca mientas", autor: "Freida McFadden", paginas: 320},
    {id: 4, titulo: "Éxtasis", autor: "Tracy Wolf", paginas: 780},
    {id: 5, titulo: "Hechizo", autor: "Tracy Wolf", paginas: 800},
    {id: 6, titulo: "Anhelo", autor: "Tracy Wolf", paginas: 712},
    {id: 7, titulo: "Furia", autor: "Tracy Wolf", paginas: 815},
    {id: 8, titulo: "Fulgor", autor: "Tracy Wolf", paginas: 830},
    {id: 9, titulo: "Ansia", autor: "Trazy Wolf", paginas: 802},
    {id: 10, titulo: "El círculo", autor: "Roberto Santiago", paginas: 315}
]

//funcion para añadir nuevo libro
export function agregarLibro(nuevoLibro){
    libros.push(nuevoLibro)
}

//crear funcion que devuelva la coleccion completa
export function obtenerLibros(){
    return libros
}

//buscar libro por id
export function buscarLibro(id){
    return libros.find((libro)=> libro.id === id)
}

//eliminar libro por id
export function eliminarLibro(id){
const indice= libros.findIndex((libro)=> libro.id === id)

if(indice !== -1){
    libros.splice(indice, 1)
}
}


//funcion calcular paginas
export function calcularTotalPaginas(){
return libros.reduce((total, libro)=> total + libro.paginas,0)
}