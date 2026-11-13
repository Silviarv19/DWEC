// Ejemplo 05.1s-07 · setTimeout: ejecutar código más tarde (y simular que algo tarda)
// Ejecuta:  node 07_settimeout.js

console.log('A: empiezo');

setTimeout(() => {
  console.log('B: han pasado 1000 ms');
}, 1000);

console.log('C: sigo trabajando');

// Con 0 ms también va después: primero termina el código que se está ejecutando
setTimeout(() => {
  console.log('D: setTimeout con 0 ms');
}, 0);

// Simular que pedimos datos a un servidor lento (tarda 2 segundos)
console.log('Pidiendo datos al "servidor"...');
setTimeout(() => {
  const usuario = { nombre: 'Ana', edad: 19 };
  console.log('Datos recibidos:', usuario);
}, 2000);

console.log('Mientras tanto, el programa sigue funcionando');

// Error muy común: PASAR la función frente a LLAMARLA
// const saludar = () => console.log('¡hola!');
// setTimeout(saludar(), 100);  // MAL: se ejecuta ya y se pasa undefined
// setTimeout(saludar, 100);    // BIEN: se pasa la función, sin paréntesis
