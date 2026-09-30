const empleados =[
    {id:1, nombre:"Silvia", departamento:"informática", salario:24.000},
    {id:2, nombre:"Jessica", departamento:"informática", salario:24.000},
    {id:3, nombre:"Sergio", departamento:"informática", salario:24.000},
    {id:4, nombre:"Pablo", departamento:"informática", salario:24.000},
    {id:5, nombre:"Jorge", departamento:"informática", salario:24.000},
]

//funcion para añadir nuevo empleado
export function agregarEmpleado(Empleado){
    empleados.push(Empleado)
}

//eliminar empleado por id
export function eliminarEmpleado(id){
const indice= empleados.findIndex((empleado)=> empleado.id === id)

if(indice !== -1){
    empleado.splice(indice, 1)
}
}

//buscar por departamento
export function buscarPorDepartamento(departamento){
    return empleados.filter((empleado)=> empleado.departamento == departamento)
}

//funcion calcular media salario
export function calcularSalarioPromedio(){
return empleados.reduce((total, empleado)=> total + empleado.salario,0)
}

//funcion ordenar por salario de mayor a menor
export function ordenarPorSalario(){
    return empleados.sort((a,b)=> a.salario - b.salario)
}