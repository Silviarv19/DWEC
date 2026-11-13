// Ejemplo 05.1s-11 · Encadenar promesas con then (el estilo que verás en código antiguo)
// Ejecuta:  node 11_encadenar_then.js

const titulos = {
  1: 'El nombre de la rosa',
  2: 'Cien años de soledad',
  3: 'Fahrenheit 451',
};
const buscarLibro = (id) =>
  new Promise((resolver, rechazar) => {
    setTimeout(() => {
      if (titulos[id]) resolver({ id, titulo: titulos[id] });
      else rechazar(new Error(`No existe ningún libro con id ${id}`));
    }, 500);
  });

console.log('--- 1. Cada then devuelve una promesa');
await buscarLibro(1)
  .then((libro) => {
    console.log('1.º:', libro.titulo);
    return buscarLibro(2); // devolvemos la promesa: la cadena espera
  })
  .then((libro) => {
    console.log('2.º:', libro.titulo);
    return buscarLibro(99); // este libro no existe: la promesa se rechaza
  })
  .then((libro) => console.log('3.º:', libro.titulo)) // no se ejecuta
  .catch((error) => console.log('✘ Error:', error.message))
  .finally(() => console.log('Cadena terminada'));

console.log('--- 2. Error típico: olvidar el return');
await buscarLibro(1)
  .then((libro) => {
    buscarLibro(2); // ¡sin return! la cadena no espera
  })
  .then((resultado) => console.log('El siguiente then recibe:', resultado));
