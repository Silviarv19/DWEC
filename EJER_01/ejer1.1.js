const nombre="Silvia"
let edad= 18
const TieneMascota= true

edad=19
let mascota= false
if(mascota==true){
    mascota="si"
}else mascota="no"

console.log("nombre: " + nombre + ", " + typeof(nombre))
console.log("edad: " + edad + ", " +  typeof(edad))
console.log(mascota + " tiene mascota, " + typeof(TieneMascota))

console.log(`${nombre} tiene ${edad} años y ${mascota} tiene mascota`)
