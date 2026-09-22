//crear funcion que a partir de base y altura devuelva el area
function calcularAreaRectangulo(base=4, altura=2) {
    return area=(base*altura)
}

//crear constante con la misma funcion
const calcularAreaTriangulo = function(base=4, altura=2) {
    return area=((base*altura)/2)
}

//convertir funcion anterior en arrow function y añadir valores por defecto
const calcularAreaTriangulo2 = (base=4, altura=2) => {
    return area=((base*altura)/2)
}

console.log(calcularAreaRectangulo())
console.log(calcularAreaTriangulo())
console.log(calcularAreaTriangulo2())