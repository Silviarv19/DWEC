// Objetos - Destructuring de dos o más objetos
const producto = {
    nombre : "Tablet",
    precio: 300,
    disponible: true
}

const cliente = {
    nombre: "Juan",
    premium: true
}

// mete el objeto producto
const carrito = {
    cantidad: 1,
    producto 
}
console.log(carrito)

// mete los claves y sus valores
//MUY IMPORTANTE
const carrito2 = {
    cantidad: 1,
    ...producto // spread operator
}
console.log(carrito2)

//DESTRUCTURANDO DOS OBJETOS
const nuevoObjeto = {
    ...producto,
    ...cliente,
}
console.log(nuevoObjeto)

//OTRA FORMA DE HACER LO MISMO DE ARRIBA

// const nuevoObjeto2 = Object.assign(producto, cliente)
// console.log(nuevoObjeto2)