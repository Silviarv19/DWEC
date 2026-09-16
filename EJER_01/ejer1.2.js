//crear objeto coche
const coche= {
marca: "dodge",
modelo: "challenger",
año: 1975,
estaDisponible: false
}

//mostrar objeto en forma de tabla
console.table(coche)

//desestructurar para extraer marca y modelo
const {marca, modelo}= coche

//mostrar las variables separadas
console.log("marca: " + marca)
console.log("modelo: " + modelo)

//cambiar valor estaDisponible
coche.estaDisponible=true

//añadir propiedad color
coche.color="rojo"

//eliminar propiedad año
delete coche.año

//imprimir objeto modificado
console.table(coche)