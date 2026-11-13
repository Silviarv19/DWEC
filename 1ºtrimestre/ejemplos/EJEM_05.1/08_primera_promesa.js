// Ejemplo 05.1s-08 · Mi primera promesa: crearla y reaccionar con then / catch / finally
// Ejecuta:  node 08_primera_promesa.js    (cambia todoBien a false y vuelve a ejecutar)

const todoBien = true;

const promesa = new Promise((resolver, rechazar) => {
  setTimeout(() => {
    if (todoBien) resolver('¡Datos recibidos!');
    else rechazar(new Error('Ha fallado la conexión'));
  }, 1000);
});

console.log('Estado al crearla:', promesa); // Promise { <pending> }

promesa
  .then((mensaje) => console.log('✔ then:', mensaje))
  .catch((error) => console.log('✘ catch:', error.message))
  .finally(() => console.log('finally: se ejecuta siempre'));

console.log('Esto sale antes de que la promesa termine');
