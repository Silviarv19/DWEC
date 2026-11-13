// Ejemplo 05.1s-05 · No te fíes de los datos externos: lectura segura y validación
// Ejecuta:  node 05_validar_json.js

// 1. Lectura segura: JSON.parse lanza un error si el texto está mal escrito
const leerJSON = (texto) => {
  try {
    return JSON.parse(texto);
  } catch (error) {
    console.log('   (el texto no es JSON válido)');
    return null;
  }
};

// 2. Validación: que sea JSON válido no garantiza que tenga la forma que esperamos
const esLibroValido = (libro) => {
  if (typeof libro !== 'object' || libro === null) return false;
  if (typeof libro.titulo !== 'string' || libro.titulo === '') return false;
  if (typeof libro.anio !== 'number') return false;
  return true;
};

const entradas = [
  '{"titulo":"Dune","anio":1965}', // correcto
  '{"titulo":"Dune","anio":"1965"}', // JSON válido, pero el año es un texto
  '{"titulo":"","anio":1965}', // JSON válido, pero el título está vacío
  '{"titulo":"Dune","anio":1965', // JSON roto (falta la llave final)
  'null', // JSON válido, pero no es un objeto
];

for (const texto of entradas) {
  const libro = leerJSON(texto);
  console.log(esLibroValido(libro) ? '✔ aceptado ' : '✘ rechazado', texto);
}
