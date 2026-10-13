// ================================================================
// RETO 2 · switch Y BUCLES                          (escribir funciones)
// ================================================================


// 2.1 descuentoPorCategoria
export const descuentoPorCategoria = (categoria) => {
  switch (categoria) {
    case categoria.estudiante: 
       console.log("0.2");
      break;

    case categoria.jubilado:
      console.log("0.2");
      break;
    case categoria.familiaNumerosa: 
      console.log("0.3");
      break;
    case categoria.socio:
     console.log("0.1")
      break;
    default:
      console.log("0");
      break;
  }
};

// 2.2 sumarHastaLimite
export const sumarHastaLimite = (numeros, limite) => {
 
};

// 2.3 contarVocales
export const contarVocales = (texto) => {
  for (const vocal of texto) {
    
  }
};
