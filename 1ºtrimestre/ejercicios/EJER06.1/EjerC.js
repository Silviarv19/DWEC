//ejercicio 1
const temperaturas = [12, 5, 32, 100, 28, 0, -5]

const temperaturasOrdenadas = [...temperaturas].sort((a, b) => a - b)
console.log(temperaturasOrdenadas)

//ejercicio 2
const jugadores = [
  { nombre: "Erik", puntos: 450 },
  { nombre: "Valeria", puntos: 980 },
  { nombre: "Matias", puntos: 120 },
  { nombre: "Sandra", puntos: 750 }
];

const ranking = [...jugadores].sort((a, b) => b.puntos - a.puntos)
console.log(ranking)

//ejercicio 3
const alumnos = ["Íñigo", "Álvaro", "Berenice", "Ángela", "Niño", "Ñandú"];

const listadoOficial = [...alumnos].sort((a, b) => a.localeCompare(b))
console.log(listadoOficial)