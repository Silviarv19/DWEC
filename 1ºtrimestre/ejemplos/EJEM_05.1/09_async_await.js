// Ejemplo 05.1s-09 · async / await: esperar una promesa con un código que se lee de arriba abajo
// Ejecuta:  node 09_async_await.js

// "Servidor" simulado: devuelve una promesa que tarda 0,5 s
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

// Una función async: dentro podemos usar await
const mostrarLibro = async (id) => {
  try {
    console.log(`Buscando el libro ${id}...`);
    const libro = await buscarLibro(id); // espera a que la promesa se cumpla
    console.log('✔ Encontrado:', libro.titulo);
  } catch (error) {
    console.log('✘ Error:', error.message);
  } finally {
    console.log('Búsqueda terminada');
  }
};

console.log('--- 1. await pausa la función, no el programa');
const busqueda = mostrarLibro(1);
console.log('Esto se ejecuta mientras se busca el libro');
await busqueda; // esperamos aquí para que la salida salga en orden

console.log('--- 2. Si la promesa se rechaza, el catch recoge el error');
await mostrarLibro(99);

console.log('--- 3. Peticiones que dependen una de otra');
const primero = await buscarLibro(1);
const segundo = await buscarLibro(primero.id + 1); // necesita el resultado anterior
console.log(`${primero.titulo} → ${segundo.titulo}`);
