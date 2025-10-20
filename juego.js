// Objetos correctos (componentes del PC)
const componentesCorrectos = [
  { nombre: "Placa Madre", icono: "🖥️" },
  { nombre: "CPU", icono: "⚙️" },
  { nombre: "RAM", icono: "💾" },
  { nombre: "la nuve", icono: "☁" },
  { nombre: "Tarjeta Gráfica", icono: "🎮" },
  { nombre: "Monitor", icono: "🖲️" },
  { nombre: "Teclado", icono: "⌨️" },
  { nombre: "Mouse", icono: "🖱️" }
];

// Objetos erróneos (que no pertenecen a un PC)
const objetosErroneos = [
  { nombre: "Planta", icono: "🪴" },
  { nombre: "Manzana", icono: "🍎" },
  { nombre: "Pelota", icono: "⚽" },
  { nombre: "Guitarra", icono: "🎸" },
  { nombre: "Libro", icono: "📚" },
  { nombre: "Reloj", icono: "⌚" },
  { nombre: "Taza", icono: "☕" },
  { nombre: "Zapato", icono: "👟" }
];

// Combina todos para mostrar en el juego
let todosLosObjetos = [];

const zonaJuego = document.getElementById("zonaJuego");
const listaObjetos = document.getElementById("listaObjetos");
const tiempoEl = document.getElementById("tiempo");
const mensajeFinal = document.getElementById("mensajeFinal");
const resultado = document.getElementById("resultado");

let tiempo = 60;
let encontrados = [];
let temporizador;

function iniciarJuego() {
  zonaJuego.innerHTML = "";
  listaObjetos.innerHTML = "";
  mensajeFinal.classList.add("oculto");
  encontrados = [];
  tiempo = 60;

  // Combinar correctos + erróneos y mezclarlos
  todosLosObjetos = [...componentesCorrectos, ...objetosErroneos]
    .sort(() => Math.random() - 0.5);

  // Mostrar lista (solo correctos)
  componentesCorrectos.forEach((c) => {
    const li = document.createElement("li");
    li.textContent = c.nombre;
    listaObjetos.appendChild(li);
  });

  // Colocar todos los objetos
  todosLosObjetos.forEach((c) => {
    const obj = document.createElement("div");
    obj.classList.add("objeto");
    obj.textContent = c.icono;
    obj.dataset.nombre = c.nombre;
    obj.dataset.correcto = componentesCorrectos.some(x => x.nombre === c.nombre);

    // Posición aleatoria
    obj.style.left = Math.random() * (zonaJuego.clientWidth - 60) + "px";
    obj.style.top = Math.random() * (zonaJuego.clientHeight - 60) + "px";

    obj.addEventListener("click", () => manejarClick(obj));
    zonaJuego.appendChild(obj);
  });

  iniciarTemporizador();
}

function manejarClick(obj) {
  if (obj.classList.contains("encontrado") || obj.classList.contains("erroneo")) return;

  const esCorrecto = obj.dataset.correcto === "true";

  if (esCorrecto) {
    obj.classList.add("encontrado");
    encontrados.push(obj.dataset.nombre);
    actualizarLista(obj.dataset.nombre);
  } else {
    obj.classList.add("erroneo");
    tiempo = Math.max(0, tiempo - 5); // penalización de 5 segundos
  }

  verificarEstado();
}

function actualizarLista(nombre) {
  [...listaObjetos.children].forEach(li => {
    if (li.textContent === nombre) li.style.textDecoration = "line-through";
  });
}

function verificarEstado() {
  if (encontrados.length === componentesCorrectos.length) {
    finalizarJuego(true);
  }
}

function iniciarTemporizador() {
  tiempoEl.textContent = `Tiempo: ${tiempo}s`;
  temporizador = setInterval(() => {
    tiempo--;
    tiempoEl.textContent = `Tiempo: ${tiempo}s`;
    if (tiempo <= 0) {
      clearInterval(temporizador);
      finalizarJuego(false);
    }
  }, 1000);
}

function finalizarJuego(ganaste) {
  clearInterval(temporizador);
  mensajeFinal.classList.remove("oculto");
  resultado.textContent = ganaste
    ? "🎉 ¡Ganaste! Encontraste todos los componentes del sistema."
    : "⏰ Se acabó el tiempo. Intenta de nuevo.";
}

document.getElementById("reiniciar").addEventListener("click", iniciarJuego);
document.getElementById("jugarOtraVez").addEventListener("click", iniciarJuego);

iniciarJuego();
