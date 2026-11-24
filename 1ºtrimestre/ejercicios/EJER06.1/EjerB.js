const tareas = [
  { id: 1, descripcion: "Comprar suministros de oficina", completada: false },
  { id: 2, descripcion: "Revisar código del proyecto Beta", completada: true },
  { id: 3, descripcion: "Planificar reunión semanal", completada: false },
  { id: 4, descripcion: "Responder correos urgentes", completada: false }
];

//1.1
const tareasConNueva = [...tareas, { id: 5, descripcion: "Investigar nueva librería JS", completada: false } ]

//2.1 leer tareas pendientes
const pendientes = tareas.filter((tarea)=> tarea.completada === false) //!tarea.completada

//2.2 leer una tarea especifica
const tareaEspecifica = tareas.filter((tarea) => tarea.id === 3)

//3.1 marcar como completada
const tareasActualizadas = tareas.map((tarea) => tarea.id === 4 ? {...tarea, completada : true} : tarea)