// Ejemplo 05.1s-04 · Copiar objetos: igualar, copia superficial y copia profunda
// Ejecuta:  node 04_copiar_objetos.js

console.log('--- 1. Con números y textos, copiar copia el valor');
let a = 5;
let b = a;
b = 10;
console.log(a, b); // 5 10: son independientes

console.log('--- 2. Con objetos, igualar NO copia: es el mismo objeto');
const alumno = { nombre: 'Ana', notas: [7, 8] };
const otro = alumno;
otro.nombre = 'Luis';
console.log(alumno.nombre); // Luis: ¡también ha cambiado!
console.log(alumno === otro); // true: es el mismo objeto

console.log('--- 3. Copia superficial con el operador de propagación (...)');
const ana = { nombre: 'Ana', notas: [7, 8] };
const copia = { ...ana };
copia.nombre = 'Luis';
console.log(ana.nombre, copia.nombre); // Ana Luis: independientes
copia.notas.push(10);
console.log(ana.notas); // [7, 8, 10]: ¡el array interior SÍ se comparte!
console.log(ana.notas === copia.notas); // true

console.log('--- 4. Copia profunda con structuredClone');
const original = { nombre: 'Ana', notas: [7, 8] };
const profunda = structuredClone(original);
profunda.notas.push(10);
console.log(original.notas, profunda.notas); // [7, 8] [7, 8, 10]: independientes
console.log(original.notas === profunda.notas); // false

console.log('--- 5. Con funciones dentro, structuredClone falla');
try {
  structuredClone({ nombre: 'Ana', saludar() {} });
} catch (error) {
  console.log(error.name); // DataCloneError
}
