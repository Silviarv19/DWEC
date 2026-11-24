// Nombre y apellidos: ______________________________

import { tareasIniciales } from './datos.js';

// ============================================================
// Constantes y elementos de la página (ya definidos: no los cambies)
// ============================================================
const ESTADOS = ['porhacer', 'encurso', 'hecha'];
const LIMITE_HORAS = 40;

const formularioTarea = document.querySelector('#formulario-tarea');
const campoHoras = formularioTarea.elements.horas;
const mensajeFormulario = document.querySelector('#mensaje-formulario');
const buscador = document.querySelector('#buscador');
const botonArchivar = document.querySelector('#boton-archivar');
const tablero = document.querySelector('#tablero');
const listaHoras = document.querySelector('#horas-asignatura');
const progreso = document.querySelector('#progreso');

const columnas = {
  porhacer: document.querySelector('#col-porhacer'),
  encurso: document.querySelector('#col-encurso'),
  hecha: document.querySelector('#col-hecha')
};
const contadores = {
  porhacer: document.querySelector('#num-porhacer'),
  encurso: document.querySelector('#num-encurso'),
  hecha: document.querySelector('#num-hecha')
};

// Se desactiva la validación del navegador: los mensajes los muestras tú (apartado 1)
formularioTarea.noValidate = true;

// Tareas del tablero. Es una copia: los datos originales no se tocan
let tareas = tareasIniciales.map((tarea) => ({ ...tarea }));

// Repinta todo a partir del array de tareas (ya hecha: la usarás en el apartado 4)
const repintar = () => {
  pintarTablero(buscarTareas(tareas, buscador.value));
  pintarResumen(tareas);
};


// ============================================================
// APARTADO 1 · Formulario y validación
// ============================================================

// 1.1 · Devuelve el texto del error de un campo según su `validity` ('' si es válido)
const mensajeDeError = (campo) => {
  const validez = campo.validity

  if (validez.valueMissing) {
    return 'Este campo es obligatorio'
  }

  if (validez.tooShort) {
    return `Escribe al menos ${campo.minLength} caracteres`
  }

  if (validez.rangeUnderflow || validez.rangeOverflow) {
    return `Debe estar entre ${campo.min} y ${campo.max}`
  }

  if (validez.customError) {
    return campo.validationMessage
  }
  return ''
};

// 1.2 · Muestra u oculta el error de un campo y devuelve si es válido
const validarCampo = (campo) => {
  const mensaje = mensajeDeError(campo)
  const error = campo.nextElementSibling

  error.textContent = mensaje
  campo.classList.toggle('invalido', mensaje !== '')

  return mensaje === ''
};

// 1.3 · Aplica (o quita) el error personalizado de #horas según el límite de horas pendientes
const comprobarHoras = () => {
  const horasPendientes = tareas
    .filter(tarea => tarea.estado !== 'hecha')
    .reduce((total, tarea) => total + tarea.horas, 0)

  const horasNuevas = Number(campoHoras.value) || 0

  if (horasPendientes + horasNuevas > LIMITE_HORAS) {
    campoHoras.setCustomValidity(
      `Superas el límite de ${LIMITE_HORAS} h pendientes (ahora hay ${horasPendientes} h)`
    )
  } else {
    campoHoras.setCustomValidity('')
  }
};

// 1.4 · Deja el formulario como recién cargado

const limpiarFormulario = () => {
  formularioTarea.reset();

  formularioTarea.querySelectorAll('.error').forEach(error => {
    error.textContent = '';
  });

  formularioTarea.querySelectorAll('.invalido').forEach(campo => {
    campo.classList.remove('invalido');
  });

  campoHoras.setCustomValidity('');
};


// 1.5 · Eventos del formulario (change, input y keydown)
formularioTarea.addEventListener('change', (evento) => {
  comprobarHoras()
  validarCampo(evento.target)
})

formularioTarea.addEventListener('input', (evento) => {
  if (evento.target.classList.contains('invalido')) {
    comprobarHoras()
    validarCampo(evento.target)
  }
});

formularioTarea.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') {
    limpiarFormulario()
  }
});


// ============================================================
// APARTADO 2 · Cálculos con los datos (funciones puras)
// ============================================================

// 2.1 · Tareas cuyo título o asignatura contienen el texto buscado
const buscarTareas = (lista, texto) => {
  const busqueda = texto.trim().toLowerCase()

  return lista.filter(tarea =>
    tarea.titulo.toLowerCase().includes(busqueda) ||
    tarea.asignatura.toLowerCase().includes(busqueda)
  )
};

// 2.2 · Reparte las tareas en un objeto con una lista por cada estado
const agruparPorEstado = (lista) => {
  return {
    porhacer: lista.filter(tarea => tarea.estado === 'porhacer'),
    encurso: lista.filter(tarea => tarea.estado === 'encurso'),
    hecha: lista.filter(tarea => tarea.estado === 'hecha')
  }
};

// 2.3 · Suma las horas de cada asignatura, de más a menos horas
const horasPorAsignatura = (lista) => {
  const horas = {};

  lista.forEach(tarea => {
    if (horas[tarea.asignatura] === undefined) {
      horas[tarea.asignatura] = 0
    }

    horas[tarea.asignatura] += tarea.horas
  });

  return Object.entries(horas)
    .map(([asignatura, horas]) => ({ asignatura, horas }))
    .sort((a, b) =>
      b.horas - a.horas ||
      a.asignatura.localeCompare(b.asignatura)
    )
};


// ============================================================
// APARTADO 3 · Pintar la página
// ============================================================

// 3.1 · Devuelve (sin insertarla) la tarjeta <li> de una tarea
const crearTarjeta = (tarea) => {
  const tarjeta = document.createElement('li')
  tarjeta.className = `tarjeta prioridad-${tarea.prioridad}`
  tarjeta.dataset.id = tarea.id

  const titulo = document.createElement('strong')
  titulo.className = 'titulo'
  titulo.textContent = tarea.titulo

  const meta = document.createElement('span')
  meta.className = 'meta'
  meta.textContent = `${tarea.asignatura} · ${tarea.horas} h`

  const retroceder = document.createElement('button')
  retroceder.type = 'button'
  retroceder.dataset.accion = 'retroceder'
  retroceder.textContent = '←'
  retroceder.disabled = ESTADOS.indexOf(tarea.estado) === 0

  const avanzar = document.createElement('button')
  avanzar.type = 'button'
  avanzar.dataset.accion = 'avanzar'
  avanzar.textContent = '→'
  avanzar.disabled = ESTADOS.indexOf(tarea.estado) === ESTADOS.length - 1

  tarjeta.append(titulo, meta, retroceder, avanzar)

  return tarjeta
};

// 3.2 · Reparte las tarjetas de lista en las tres columnas y actualiza los contadores

const pintarTablero = (lista) => {
  const grupos = agruparPorEstado(lista);

  ESTADOS.forEach(estado => {
    columnas[estado].textContent = '';

    grupos[estado].forEach(tarea => {
      columnas[estado].append(crearTarjeta(tarea));
    });

    contadores[estado].textContent = grupos[estado].length;
  });
};


// 3.3 · Pinta el resumen: horas por asignatura y progreso
const pintarResumen = (lista) => {
  listaHoras.textContent = '';

  horasPorAsignatura(lista).forEach(dato => {
    const elemento = document.createElement('li');
    elemento.textContent = `${dato.asignatura} — ${dato.horas} h`;

    listaHoras.append(elemento);
  });

  const hechas = lista.filter(tarea => tarea.estado === 'hecha').length;
  const total = lista.length;
  const porcentaje = total === 0 ? 0 : Math.round(hechas / total * 100);

  progreso.textContent = `Hechas: ${hechas} de ${total} (${porcentaje} %)`;

};


// ============================================================
// APARTADO 4 · Interacción
// ============================================================

// 4.1 · Mueve una tarea `paso` columnas (+1 avanza, -1 retrocede)
const moverTarea = (id, paso) => {
  const tarea = tareas.find(tarea => tarea.id === id);

  if (!tarea) {
    return;
  }

  const posicion = ESTADOS.indexOf(tarea.estado);
  const nuevaPosicion = posicion + paso;

  if (nuevaPosicion < 0 || nuevaPosicion >= ESTADOS.length) {
    return;
  }

  tarea.estado = ESTADOS[nuevaPosicion];
};

// 4.2 · Añade una tarea nueva al array y la devuelve
const anadirTarea = (datos) => {
  const mayorId = tareas.reduce((mayor, tarea) =>
    Math.max(mayor, tarea.id), 0
  );

  const nuevaTarea = {
    id: mayorId + 1,
    titulo: datos.titulo,
    asignatura: datos.asignatura,
    horas: datos.horas,
    estado: 'porhacer',
    prioridad: datos.prioridad
  };

  tareas.push(nuevaTarea);

  return nuevaTarea;
};

// 4.3 · Elimina del array las tareas hechas y devuelve cuántas eran
const archivarHechas = () => {
  const cantidad = tareas.filter(tarea => tarea.estado === 'hecha').length;

  tareas = tareas.filter(tarea => tarea.estado !== 'hecha');

  return cantidad;
};

// 4.4 · Eventos del tablero, del buscador y del botón «Archivar hechas», y primer pintado

tablero.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-accion]');

  if (!boton) {
    return;
  }

  const tarjeta = boton.closest('.tarjeta');
  const id = Number(tarjeta.dataset.id);

  if (boton.dataset.accion === 'avanzar') {
    moverTarea(id, 1);
  } else if (boton.dataset.accion === 'retroceder') {
    moverTarea(id, -1);
  }

  repintar();
});

buscador.addEventListener('input', () => {
  repintar();
});

botonArchivar.addEventListener('click', () => {
  archivarHechas();
  repintar();
});

repintar();


// 4.5 · Envío del formulario

formularioTarea.addEventListener('submit', (evento) => {
  evento.preventDefault();

  comprobarHoras();

  const campos = [
    formularioTarea.elements.titulo,
    formularioTarea.elements.asignatura,
    campoHoras,
    formularioTarea.elements.prioridad
  ];

  const resultados = campos.map(campo => validarCampo(campo));

  if (resultados.includes(false)) {
    campos.find(campo => !validarCampo(campo)).focus();
    return;
  }

  const titulo = formularioTarea.elements.titulo.value.trim();

  anadirTarea({
    titulo: titulo,
    asignatura: formularioTarea.elements.asignatura.value,
    horas: Number(campoHoras.value),
    prioridad: formularioTarea.elements.prioridad.value
  });

  limpiarFormulario();
  repintar();

  mensajeFormulario.textContent = `Tarea añadida: ${titulo}`;
});

