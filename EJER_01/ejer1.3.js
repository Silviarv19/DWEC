//crear objeto producto
const producto={
    nombre: "taza",
    precio: 10
}

//crear objeto cliente
const cliente={
    nombreCliente: "Silvia",
    esPremium: true
}

//combinar los dos objetos con Spread Operator
const pedido={
    ...cliente,
    ...producto
}

//mostrar pedido
console.log(pedido)

//crear otro producto

const producto2={
    nombre: "vaso",
    precio: 5
}

//combinar los dos productos
const pedido2={
    ...producto,
    ...producto2
}

console.log(pedido2)
//al combinar los productos se queda con los valores de el último
