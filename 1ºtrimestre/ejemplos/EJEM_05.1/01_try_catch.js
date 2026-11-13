// Ejemplo 05.1s-01 · try / catch / finally: controlar los errores para que el programa no se detenga
// Ejecuta:  node 01_try_catch.js

console.log('--- 1. try / catch: el programa continúa');
try {
  console.log('Antes del error');
  console.log(usuarioInexistente); // ReferenceError: esa variable no existe
  console.log('Esta línea no se ejecuta');
} catch (error) {
  console.log('Error capturado:', error.name, '-', error.message);
}
console.log('El programa continúa');

console.log('--- 2. Otros errores habituales');
const persona = null;
try {
  console.log(persona.nombre); // TypeError: no se puede leer una propiedad de null
} catch (error) {
  console.log(error.name, '-', error.message);
}
try {
  JSON.parse('{titulo: "Dune"}'); // SyntaxError: ese texto no es JSON válido
} catch (error) {
  console.log(error.name);
}

console.log('--- 3. finally: se ejecuta siempre');
const leerEdad = (texto) => {
  try {
    const datos = JSON.parse(texto);
    return datos.edad;
  } catch (error) {
    console.log('  No se pudo leer el texto:', error.name);
    return null;
  } finally {
    console.log('  (finally) fin de la lectura');
  }
};
console.log('Edad:', leerEdad('{"edad": 19}'));
console.log('Edad:', leerEdad('{edad: 19}'));

console.log('--- 4. Lanzar nuestros propios errores con throw');
const comprobarEdad = (edad) => {
  if (typeof edad !== 'number') throw new TypeError('La edad debe ser un número');
  if (edad < 0) throw new RangeError('La edad no puede ser negativa');
  return `Edad correcta: ${edad}`;
};
for (const valor of [25, -3, 'veinte']) {
  try {
    console.log(comprobarEdad(valor));
  } catch (error) {
    console.log(`${error.name}: ${error.message}`);
  }
}
