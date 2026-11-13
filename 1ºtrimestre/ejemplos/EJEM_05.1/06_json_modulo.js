// Ejemplo 05.1s-06 · Importar un archivo JSON como módulo
// Ejecuta:  node 06_json_modulo.js   (necesita Node.js 22 o superior)

import libros from './datos/libros.json' with { type: 'json' };

console.log(`Hay ${libros.length} libros en el archivo:`);
for (const libro of libros) {
  console.log(`- ${libro.titulo} (${libro.anio})`);
}
