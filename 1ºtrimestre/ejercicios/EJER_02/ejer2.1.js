//crear un array con 6 numeros
const numeros=[2,5,7,12,13,15]

//crear nuevo array y multiplicar el primer array por 2
const dobles=numeros.map(numeros => numeros*2) 

//crear array pares usando .filter
const pares=numeros.filter(numeros=> numeros %2 ==0)

//con bucle forof imprimir numeros pares
for (const numeros of pares) {
    console.log(numeros)
}