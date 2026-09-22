//array con los estudiantes
estudiantes =[
    alumno1 ={
        nombre: "Silvia",
        apellidos: "Ruiz",
        calificacion: 8,
        aprobado: true
    },

    alumno2 ={
        nombre: "Pablo",
        apellidos: "Ruiz",
        calificacion: 9,
        aprobado: true
    },

    alumno3 ={
        nombre: "Sergio",
        apellidos: "Caramazana",
        calificacion: 1,
        aprobado: false
    }
]

//utilizar .map() para crear un array y añadir id utilizando index

const estudiantesId= estudiantes.map((estudiantes, index) =>({
    ...estudiantes, id: index +1
}))

//utilizar .filter() para obtener los estudiantes con un 5 o más

const estudiantesAprob= estudiantes.filter((estudiantes => estudiantes.calificacion >= 5))

//mostrar un mensaje a los alumnos filtrados

console.log(estudiantesAprob.forEach(estudiantes=> {
    `¡Felicidades ${estudiantes.nombre}, has aprobado con ${estudiantes.calificacion}`
}))

//comprobar que la propiedad aprobado es coherente
estudiantes.forEach(estudiante => {
    
});
