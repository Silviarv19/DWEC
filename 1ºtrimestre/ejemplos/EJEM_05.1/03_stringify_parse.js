// Ejemplo 05.1s-03 · JSON.stringify y JSON.parse: de objeto a texto y de texto a objeto
// Ejecuta:  node 03_stringify_parse.js

const libro = {
  titulo: 'Dune',
  anio: 1965,
  disponible: true,
  etiquetas: ['ciencia ficción', 'saga'],
};

console.log('--- 1. De objeto a texto: JSON.stringify');
const texto = JSON.stringify(libro);
console.log(texto);
console.log(typeof texto); // string

console.log('--- 2. Con sangría para leerlo mejor');
console.log(JSON.stringify(libro, null, 2));

console.log('--- 3. Quedarnos solo con algunas propiedades');
console.log(JSON.stringify(libro, ['titulo', 'anio']));

console.log('--- 4. De texto a objeto: JSON.parse');
const recuperado = JSON.parse(texto);
console.log(recuperado.titulo, '-', recuperado.etiquetas[0]);
console.log(typeof recuperado); // object

console.log('--- 5. Lo que se pierde por el camino');
const datos = {
  nombre: 'Ana',
  apodo: undefined, // se omite
  saludar() { return 'hola'; }, // se omite
  nota: NaN, // pasa a null
  registro: new Date('2026-01-15T10:00:00Z'), // pasa a texto
};
const ida = JSON.stringify(datos);
console.log(ida);
const vuelta = JSON.parse(ida);
console.log('La fecha vuelve como:', typeof vuelta.registro); // string
