//crear array ciudades
const ciudades=["Madrid","Buenos Aires","Tokio", "Nueva York", "París"]

//añadir roma al final del array
ciudades.push("Roma")

//crear array y añadir todas 
let ciudadesMayusculas=ciudades.map(ciudades => ciudades.toUpperCase())

//array ciudadesFiltradas
let ciudadesFiltradas=ciudades.filter(ciudad => ciudad.length > 6)

//imprimir los arrays

console.log(ciudades)
console.log(ciudadesMayusculas)
console.log(ciudadesFiltradas)