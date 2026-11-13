// Ejemplo 05.1s-10 · Varias promesas a la vez: Promise.all y Promise.allSettled
// Ejecuta:  node 10_varias_promesas.js

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

const segundosDesde = (inicio) => ((Date.now() - inicio) / 1000).toFixed(1);

console.log('--- 1. Una detrás de otra: el tiempo se suma');
let inicio = Date.now();
await buscarLibro(1);
await buscarLibro(2);
await buscarLibro(3);
console.log(`Tres libros en ${segundosDesde(inicio)} s`);

console.log('--- 2. Todas a la vez (Promise.all): el tiempo de la más lenta');
inicio = Date.now();
const libros = await Promise.all([buscarLibro(1), buscarLibro(2), buscarLibro(3)]);
console.log(`Tres libros en ${segundosDesde(inicio)} s`);
console.log(libros.map((libro) => libro.titulo));

console.log('--- 3. Si una falla, Promise.all falla');
try {
  await Promise.all([buscarLibro(1), buscarLibro(99)]);
} catch (error) {
  console.log('✘ Promise.all:', error.message);
}

console.log('--- 4. Promise.allSettled: el resultado de cada una');
const resultados = await Promise.allSettled([buscarLibro(1), buscarLibro(99)]);
for (const resultado of resultados) {
  if (resultado.status === 'fulfilled') {
    console.log('✔ cumplida :', resultado.value.titulo);
  } else {
    console.log('✘ rechazada:', resultado.reason.message);
  }
}
