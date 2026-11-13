// Ejemplo 05.1s-02 · Sintaxis de JSON: qué es válido y qué no
// Ejecuta:  node 02_json_sintaxis.js

const textos = [
  '{"titulo":"Dune","anio":1965,"premios":["Hugo","Nebula"],"editorial":null}', // correcto
  "{'titulo':'Dune'}", // comillas simples
  '{titulo:"Dune"}', // clave sin comillas
  '{"titulo":"Dune",}', // coma final
  '{"editorial": undefined}', // undefined no existe en JSON
  'Dune', // texto sin comillas
  '"Dune"', // ¡una cadena entre comillas dobles SÍ es JSON válido!
  '42', // un número también
];

for (const texto of textos) {
  try {
    const valor = JSON.parse(texto);
    console.log('✔ válido  ', texto, '→', typeof valor);
  } catch (error) {
    console.log('✘ inválido', texto, '→', error.name);
  }
}
