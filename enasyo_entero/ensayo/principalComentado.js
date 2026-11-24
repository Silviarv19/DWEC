// Nombre y apellidos: ______________________________

// Importa el array inicial de tareas desde el archivo datos.js.
// Así podemos empezar el tablero con algunas tareas ya creadas.
import { tareasIniciales } from './datos.js';

// ============================================================
// Constantes y elementos de la página (ya definidos: no los cambies)
// ============================================================
// Array con los tres estados posibles de una tarea.
// El orden importa: primero está «por hacer», después «en curso» y al final «hecha».
const ESTADOS = ['porhacer', 'encurso', 'hecha'];
// Número máximo de horas que se permite tener pendientes.
const LIMITE_HORAS = 40;

// Busca en el HTML el formulario usando su id.
const formularioTarea = document.querySelector('#formulario-tarea');
// Obtiene el campo «horas» que está dentro del formulario.
const campoHoras = formularioTarea.elements.horas;
// Busca el elemento del HTML donde se mostrarán mensajes del formulario.
const mensajeFormulario = document.querySelector('#mensaje-formulario');
// Busca el campo que permite escribir para filtrar las tareas.
const buscador = document.querySelector('#buscador');
// Busca el botón que sirve para archivar las tareas terminadas.
const botonArchivar = document.querySelector('#boton-archivar');
// Busca el contenedor general donde están las columnas del tablero.
const tablero = document.querySelector('#tablero');
// Busca la lista del HTML donde se mostrarán las horas agrupadas por asignatura.
const listaHoras = document.querySelector('#horas-asignatura');
// Busca el elemento donde se mostrará el progreso de las tareas.
const progreso = document.querySelector('#progreso');

// Objeto que relaciona cada estado con el elemento HTML de su columna.
const columnas = {
  porhacer: document.querySelector('#col-porhacer'),
  encurso: document.querySelector('#col-encurso'),
  hecha: document.querySelector('#col-hecha')
};
// Objeto que relaciona cada estado con el elemento HTML de su contador.
const contadores = {
  porhacer: document.querySelector('#num-porhacer'),
  encurso: document.querySelector('#num-encurso'),
  hecha: document.querySelector('#num-hecha')
};

// Desactiva los avisos automáticos del navegador para poder mostrar nuestros propios errores.
// Se desactiva la validación del navegador: los mensajes los muestras tú (apartado 1)
formularioTarea.noValidate = true;

// Crea una copia de cada tarea del array inicial para trabajar con ella sin modificar los datos importados.
// Tareas del tablero. Es una copia: los datos originales no se tocan
let tareas = tareasIniciales.map((tarea) => ({ ...tarea }));

// Función general que actualiza el contenido visible de la página.
// Repinta todo a partir del array de tareas (ya hecha: la usarás en el apartado 4)
// Define una función flecha llamada repintar.
const repintar = () => {
// Pinta las tareas que coinciden con lo escrito en el buscador.
  pintarTablero(buscarTareas(tareas, buscador.value));
// Actualiza también el resumen, usando todas las tareas y no solo las filtradas.
  pintarResumen(tareas);
};


// ============================================================
// En este apartado se controla el formulario: errores, validaciones y eventos.
// APARTADO 1 · Formulario y validación
// ============================================================

// Recibe un campo del formulario y averigua qué mensaje de error necesita.
// 1.1 · Devuelve el texto del error de un campo según su `validity` ('' si es válido)
// Guarda las comprobaciones de validez que hace el navegador para este campo.
const mensajeDeError = (campo) => {
  const validez = campo.validity

// valueMissing significa que el campo obligatorio está vacío.
  if (validez.valueMissing) {
    return 'Este campo es obligatorio'
  }

// tooShort significa que el texto no llega al mínimo de caracteres.
  if (validez.tooShort) {
    return `Escribe al menos ${campo.minLength} caracteres`
  }

// Comprueba si el valor está por debajo del mínimo o por encima del máximo permitido.
  if (validez.rangeUnderflow || validez.rangeOverflow) {
    return `Debe estar entre ${campo.min} y ${campo.max}`
  }

// customError indica que el propio código ha establecido un error personalizado.
  if (validez.customError) {
    return campo.validationMessage
  }
// Si no se cumple ninguna condición anterior, no hay mensaje de error.
  return ''
};

// Comprueba un campo, muestra su error si lo tiene y devuelve true o false.
// 1.2 · Muestra u oculta el error de un campo y devuelve si es válido
// La función recibe el campo que queremos validar.
const validarCampo = (campo) => {
// Obtiene el mensaje de error que corresponde a ese campo.
  const mensaje = mensajeDeError(campo)
// Busca el elemento HTML que está justo después del campo; ahí se escribe el error.
  const error = campo.nextElementSibling

// Escribe el mensaje en el elemento de error. Si está vacío, no se muestra texto.
  error.textContent = mensaje
// Añade la clase CSS «invalido» si hay error y la quita si el campo es correcto.
  campo.classList.toggle('invalido', mensaje !== '')

// Devuelve true si no hay mensaje de error; en caso contrario devuelve false.
  return mensaje === ''
};

// Calcula las horas que siguen pendientes y comprueba si añadir las nuevas supera el límite.
// 1.3 · Aplica (o quita) el error personalizado de #horas según el límite de horas pendientes
// No recibe parámetros porque utiliza las tareas y el campo de horas que ya existen.
const comprobarHoras = () => {
// Empieza calculando el total de horas pendientes.
  const horasPendientes = tareas
// filter crea una lista nueva que contiene solo tareas cuyo estado no es «hecha».
    .filter(tarea => tarea.estado !== 'hecha')
// reduce suma las horas de todas esas tareas. «total» acumula la suma.
    .reduce((total, tarea) => total + tarea.horas, 0)

// Convierte lo escrito en el campo a número; si está vacío o no da un número válido, usa 0.
  const horasNuevas = Number(campoHoras.value) || 0

// Si las horas pendientes más las nuevas superan las 40, hay que mostrar un error.
  if (horasPendientes + horasNuevas > LIMITE_HORAS) {
// Establece un error personalizado en el campo de horas.
    campoHoras.setCustomValidity(
      `Superas el límite de ${LIMITE_HORAS} h pendientes (ahora hay ${horasPendientes} h)`
    )
// Si no se supera el límite, elimina cualquier error personalizado anterior.
  } else {
    campoHoras.setCustomValidity('')
  }
};

// Restaura el formulario a su estado inicial y borra los mensajes y marcas de error.
// 1.4 · Deja el formulario como recién cargado

// Define la función que limpia el formulario.
const limpiarFormulario = () => {
// reset() devuelve los campos a sus valores iniciales.
  formularioTarea.reset();

// Busca todos los elementos que muestran mensajes de error dentro del formulario.
  formularioTarea.querySelectorAll('.error').forEach(error => {
// Vacía el texto de cada mensaje de error.
    error.textContent = '';
  });

// Busca los campos que tienen la clase que indica que son inválidos.
  formularioTarea.querySelectorAll('.invalido').forEach(campo => {
// Quita esa clase para que dejen de aparecer marcados como incorrectos.
    campo.classList.remove('invalido');
  });

// Borra también el error personalizado del campo de horas.
  campoHoras.setCustomValidity('');
};


// Añade eventos al formulario para reaccionar a los cambios, a la escritura y a la tecla Escape.
// 1.5 · Eventos del formulario (change, input y keydown)
// change se ejecuta cuando cambia el valor de un campo y se confirma el cambio.
formularioTarea.addEventListener('change', (evento) => {
// Vuelve a comprobar el límite de horas.
  comprobarHoras()
// Valida el campo que ha provocado el evento.
  validarCampo(evento.target)
})

// input se ejecuta mientras el usuario escribe o modifica el valor de un campo.
formularioTarea.addEventListener('input', (evento) => {
// Solo vuelve a validar si ese campo ya estaba marcado como inválido.
  if (evento.target.classList.contains('invalido')) {
// Actualiza la comprobación del límite por si el usuario ha corregido las horas.
    comprobarHoras()
// Actualiza el mensaje y la marca de error del campo.
    validarCampo(evento.target)
  }
});

// keydown detecta las teclas pulsadas mientras el foco está dentro del formulario.
formularioTarea.addEventListener('keydown', (evento) => {
// Comprueba si la tecla pulsada es Escape.
  if (evento.key === 'Escape') {
// Si es Escape, limpia el formulario.
    limpiarFormulario()
  }
});


// ============================================================
// Aquí se hacen cálculos y filtros sobre los datos. Estas funciones no pintan HTML.
// APARTADO 2 · Cálculos con los datos (funciones puras)
// ============================================================

// Devuelve solo las tareas cuyo título o asignatura contienen el texto buscado.
// 2.1 · Tareas cuyo título o asignatura contienen el texto buscado
// Recibe la lista completa y el texto que se ha escrito en el buscador.
const buscarTareas = (lista, texto) => {
// trim elimina espacios al principio y al final; toLowerCase pasa el texto a minúsculas.
  const busqueda = texto.trim().toLowerCase()

// filter recorre la lista y conserva las tareas que cumplen la condición.
  return lista.filter(tarea =>
// includes comprueba si el título contiene el texto buscado.
    tarea.titulo.toLowerCase().includes(busqueda) ||
// También comprueba la asignatura. || significa «o»: basta con que coincida una de las dos.
    tarea.asignatura.toLowerCase().includes(busqueda)
  )
};

// Organiza las tareas en tres grupos, uno por cada estado.
// 2.2 · Reparte las tareas en un objeto con una lista por cada estado
// Recibe una lista de tareas.
const agruparPorEstado = (lista) => {
// Devuelve un objeto con tres propiedades.
  return {
// Crea una lista solo con las tareas que están por hacer.
    porhacer: lista.filter(tarea => tarea.estado === 'porhacer'),
// Crea una lista solo con las tareas que están en curso.
    encurso: lista.filter(tarea => tarea.estado === 'encurso'),
// Crea una lista solo con las tareas que están hechas.
    hecha: lista.filter(tarea => tarea.estado === 'hecha')
  }
};

// Calcula cuántas horas corresponden a cada asignatura y ordena el resultado.
// 2.3 · Suma las horas de cada asignatura, de más a menos horas
// Recibe la lista de tareas que se quiere resumir.
const horasPorAsignatura = (lista) => {
// Crea un objeto vacío donde cada asignatura tendrá guardado su total de horas.
  const horas = {};

// Recorre una a una todas las tareas de la lista.
  lista.forEach(tarea => {
// Comprueba si todavía no existe una propiedad para esa asignatura.
    if (horas[tarea.asignatura] === undefined) {
// Si es la primera tarea de esa asignatura, empieza su contador en 0.
      horas[tarea.asignatura] = 0
    }

// Añade las horas de la tarea al total de su asignatura.
    horas[tarea.asignatura] += tarea.horas
  });

// Object.entries convierte el objeto en una lista de parejas: [asignatura, horas].
  return Object.entries(horas)
// map transforma cada pareja en un objeto con las propiedades asignatura y horas.
    .map(([asignatura, horas]) => ({ asignatura, horas }))
// sort ordena los objetos de la lista.
    .sort((a, b) =>
// Orden descendente por horas: las asignaturas con más horas aparecen primero.
      b.horas - a.horas ||
// Si tienen las mismas horas, ordena los nombres alfabéticamente.
      a.asignatura.localeCompare(b.asignatura)
    )
};


// ============================================================
// En este apartado se crean y actualizan elementos HTML para mostrar los datos.
// APARTADO 3 · Pintar la página
// ============================================================
 
// Crea una tarjeta HTML para una tarea, pero todavía no la añade a la página.
// 3.1 · Devuelve (sin insertarla) la tarjeta <li> de una tarea
// Recibe el objeto con los datos de una tarea.
const crearTarjeta = (tarea) => {
// Crea un elemento <li>, que será la tarjeta.
  const tarjeta = document.createElement('li')
// Asigna las clases CSS de la tarjeta y de su prioridad.
  tarjeta.className = `tarjeta prioridad-${tarea.prioridad}`
// Guarda el id de la tarea en data-id para poder identificarla después.
  tarjeta.dataset.id = tarea.id

// Crea un elemento <strong> para mostrar el título.
  const titulo = document.createElement('strong')
// Le asigna la clase CSS que permite darle estilo.
  titulo.className = 'titulo'
// Introduce el título como texto, sin interpretar etiquetas HTML.
  titulo.textContent = tarea.titulo

// Crea un <span> para mostrar información secundaria de la tarea.
  const meta = document.createElement('span')
// Le asigna la clase CSS correspondiente.
  meta.className = 'meta'
// Muestra la asignatura y las horas de la tarea.
  meta.textContent = `${tarea.asignatura} · ${tarea.horas} h`

// Crea el botón para retroceder la tarea al estado anterior.
  const retroceder = document.createElement('button')
// Evita que el botón envíe un formulario si estuviera dentro de uno.
  retroceder.type = 'button'
// Guarda «retroceder» como acción del botón en un atributo data.
  retroceder.dataset.accion = 'retroceder'
// Texto que se verá dentro del botón.
  retroceder.textContent = '←'
// Desactiva el botón si la tarea ya está en el primer estado.
  retroceder.disabled = ESTADOS.indexOf(tarea.estado) === 0

// Crea el botón para avanzar la tarea al siguiente estado.
  const avanzar = document.createElement('button')
// Hace que el botón no envíe formularios.
  avanzar.type = 'button'
// Guarda «avanzar» como acción del botón.
  avanzar.dataset.accion = 'avanzar'
// Texto visible del botón.
  avanzar.textContent = '→'
// Desactiva el botón si la tarea ya está en el último estado.
  avanzar.disabled = ESTADOS.indexOf(tarea.estado) === ESTADOS.length - 1

// Mete el título, los datos y los dos botones dentro de la tarjeta.
  tarjeta.append(titulo, meta, retroceder, avanzar)

// Devuelve la tarjeta creada para que otra función pueda añadirla al tablero.
  return tarjeta
};

// 3.2 · Reparte las tarjetas de lista en las tres columnas y actualiza los contadores

// Recibe la lista de tareas que se deben mostrar en las columnas.
const pintarTablero = (lista) => {
// Agrupa la lista en tres arrays: porhacer, encurso y hecha.
  const grupos = agruparPorEstado(lista);

// Recorre los tres nombres de estado definidos en ESTADOS.
  ESTADOS.forEach(estado => {
// Vacía la columna antes de volver a dibujar sus tarjetas.
    columnas[estado].textContent = '';

// Recorre las tareas que pertenecen al estado actual.
    grupos[estado].forEach(tarea => {
// Crea la tarjeta de esa tarea y la añade a la columna correspondiente.
      columnas[estado].append(crearTarjeta(tarea));
    });

// Actualiza el número que aparece junto al título de esa columna.
    contadores[estado].textContent = grupos[estado].length;
  });
};


// Actualiza el resumen de horas por asignatura y el porcentaje de tareas terminadas.
// 3.3 · Pinta el resumen: horas por asignatura y progreso
// Recibe la lista de tareas que se usará para calcular el resumen.
const pintarResumen = (lista) => {
// Borra el resumen anterior para no acumular resultados repetidos.
  listaHoras.textContent = '';

// Calcula las horas por asignatura y recorre cada resultado.
  horasPorAsignatura(lista).forEach(dato => {
// Crea un elemento de lista para una asignatura.
    const elemento = document.createElement('li');
// Escribe el nombre de la asignatura y sus horas.
    elemento.textContent = `${dato.asignatura} — ${dato.horas} h`;

// Añade ese elemento a la lista visible del resumen.
    listaHoras.append(elemento);
  });

// Cuenta cuántas tareas tienen el estado «hecha».
  const hechas = lista.filter(tarea => tarea.estado === 'hecha').length;
// Guarda el número total de tareas de la lista.
  const total = lista.length;
// Calcula el porcentaje completado. Si no hay tareas, evita dividir entre cero.
  const porcentaje = total === 0 ? 0 : Math.round(hechas / total * 100);

// Muestra el número de tareas hechas, el total y el porcentaje.
  progreso.textContent = `Hechas: ${hechas} de ${total} (${porcentaje} %)`;

};


// ============================================================
// Aquí se añaden las acciones del usuario: mover, crear y archivar tareas.
// APARTADO 4 · Interacción
// ============================================================

// Mueve una tarea un puesto según el valor de paso: 1 avanza y -1 retrocede.
// 4.1 · Mueve una tarea `paso` columnas (+1 avanza, -1 retrocede)
// Recibe el id de la tarea y el número de posiciones que debe moverse.
const moverTarea = (id, paso) => {
// find busca la primera tarea cuyo id coincide con el recibido.
  const tarea = tareas.find(tarea => tarea.id === id);

// Si no encuentra ninguna tarea, no hay nada que mover.
  if (!tarea) {
// return termina la función inmediatamente.
    return;
  }

// Busca la posición actual del estado dentro del array ESTADOS.
  const posicion = ESTADOS.indexOf(tarea.estado);
// Calcula la posición nueva sumando el paso.
  const nuevaPosicion = posicion + paso;

// Comprueba que la nueva posición no quede antes del primer estado ni después del último.
  if (nuevaPosicion < 0 || nuevaPosicion >= ESTADOS.length) {
// Si se sale de los límites, termina sin cambiar la tarea.
    return;
  }

// Cambia el estado de la tarea al que corresponde a la nueva posición.
  tarea.estado = ESTADOS[nuevaPosicion];
};

// Crea una tarea nueva a partir de los datos que llegan del formulario.
// 4.2 · Añade una tarea nueva al array y la devuelve
// Recibe un objeto con el título, la asignatura, las horas y la prioridad.
const anadirTarea = (datos) => {
// reduce calcula el id más alto que existe actualmente.
  const mayorId = tareas.reduce((mayor, tarea) =>
// Math.max compara el id mayor encontrado con el id de la tarea actual.
    Math.max(mayor, tarea.id), 0
  );

// Construye el objeto que representará la nueva tarea.
  const nuevaTarea = {
// El nuevo id será uno más que el id más alto.
    id: mayorId + 1,
// Guarda el título recibido.
    titulo: datos.titulo,
// Guarda la asignatura recibida.
    asignatura: datos.asignatura,
// Guarda las horas como número.
    horas: datos.horas,
// Todas las tareas nuevas empiezan en el estado «porhacer».
    estado: 'porhacer',
// Guarda la prioridad elegida en el formulario.
    prioridad: datos.prioridad
  };

// push añade la nueva tarea al final del array tareas.
  tareas.push(nuevaTarea);

// Devuelve el objeto recién creado.
  return nuevaTarea;
};

// Elimina del array las tareas terminadas y devuelve cuántas ha eliminado.
// 4.3 · Elimina del array las tareas hechas y devuelve cuántas eran
// No necesita parámetros porque trabaja directamente con el array tareas.
const archivarHechas = () => {
// Cuenta cuántas tareas están hechas antes de eliminarlas.
  const cantidad = tareas.filter(tarea => tarea.estado === 'hecha').length;

// Conserva solo las tareas que NO están hechas; las terminadas quedan archivadas.
  tareas = tareas.filter(tarea => tarea.estado !== 'hecha');

// Devuelve el número de tareas que se han archivado.
  return cantidad;
};

// 4.4 · Eventos del tablero, del buscador y del botón «Archivar hechas», y primer pintado

// Escucha los clics que ocurran dentro del tablero.
tablero.addEventListener('click', (evento) => {
// closest busca el botón más cercano al elemento pulsado que tenga data-accion.
  const boton = evento.target.closest('button[data-accion]');

// Si el clic no se ha hecho en un botón de acción, no hace nada.
  if (!boton) {
// Termina el evento para evitar ejecutar el resto del código.
    return;
  }

// Desde el botón, busca la tarjeta que lo contiene.
  const tarjeta = boton.closest('.tarjeta');
// Lee el id guardado en data-id y lo convierte a número.
  const id = Number(tarjeta.dataset.id);

// Si el botón pulsado tiene la acción «avanzar»...
  if (boton.dataset.accion === 'avanzar') {
// ...mueve la tarea una posición hacia delante.
    moverTarea(id, 1);
// Si no, comprueba si la acción es «retroceder».
  } else if (boton.dataset.accion === 'retroceder') {
// ...y mueve la tarea una posición hacia atrás.
    moverTarea(id, -1);
  }

// Vuelve a dibujar el tablero y el resumen con el estado actualizado.
  repintar();
});

// Cada vez que cambia el texto del buscador, actualiza lo que se muestra.
buscador.addEventListener('input', () => {
// Llama a repintar para aplicar el filtro escrito.
  repintar();
});

// Escucha los clics en el botón «Archivar hechas».
botonArchivar.addEventListener('click', () => {
// Elimina del array las tareas cuyo estado sea «hecha».
  archivarHechas();
// Actualiza la página para que ya no aparezcan las tareas archivadas.
  repintar();
});

// Primera actualización de la página al cargar el archivo JavaScript.
repintar();


// 4.5 · Envío del formulario

// Escucha el envío del formulario, por ejemplo al pulsar el botón de añadir.
formularioTarea.addEventListener('submit', (evento) => {
// Evita que el navegador recargue la página al enviar el formulario.
  evento.preventDefault();

// Comprueba primero que las horas nuevas no superen el límite permitido.
  comprobarHoras();

// Guarda en un array los cuatro campos que deben validarse.
  const campos = [
// Campo del título.
    formularioTarea.elements.titulo,
// Campo de la asignatura.
    formularioTarea.elements.asignatura,
// Campo de las horas.
    campoHoras,
// Campo de la prioridad.
    formularioTarea.elements.prioridad
  ];

// map ejecuta validarCampo para cada campo y guarda los resultados true/false.
  const resultados = campos.map(campo => validarCampo(campo));

// includes(false) comprueba si hay algún campo que no haya pasado la validación.
  if (resultados.includes(false)) {
// Busca el primer campo inválido y coloca ahí el cursor con focus().
    campos.find(campo => !validarCampo(campo)).focus();
// Sale de la función para no añadir una tarea si hay errores.
    return;
  }

// Obtiene el título y elimina los espacios sobrantes de los extremos.
  const titulo = formularioTarea.elements.titulo.value.trim();

// Llama a anadirTarea para crear y guardar la nueva tarea.
  anadirTarea({
// Pasa el título limpio.
    titulo: titulo,
// Pasa el valor seleccionado en el campo de asignatura.
    asignatura: formularioTarea.elements.asignatura.value,
// Convierte las horas del formulario de texto a número.
    horas: Number(campoHoras.value),
// Pasa la prioridad seleccionada.
    prioridad: formularioTarea.elements.prioridad.value
  });

// Deja el formulario limpio después de añadir correctamente la tarea.
  limpiarFormulario();
// Actualiza el tablero y el resumen para mostrar la tarea nueva.
  repintar();

// Muestra un mensaje confirmando qué tarea se ha añadido.
  mensajeFormulario.textContent = `Tarea añadida: ${titulo}`;
});