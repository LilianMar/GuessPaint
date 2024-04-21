// Obtener elementos del DOM
const mainCanvas = document.getElementById("main-canvas");
const context = mainCanvas.getContext("2d");
const lineWidthInput = document.getElementById("line-width");
const lineWidthDisplay = document.getElementById("line-width-display");
const clearButton = document.getElementById("clear-btn");

let initialX;
let initialY;
let correccionX = 0;
let correccionY = 0;

// Ajustar tamaño del canvas al tamaño del contenedor
const resizeCanvas = () => {
  mainCanvas.width = mainCanvas.parentNode.offsetWidth;
  mainCanvas.height = mainCanvas.parentNode.offsetHeight;
};

// Llamar a resizeCanvas cuando se carga la página y se redimensiona la ventana
window.addEventListener("load", resizeCanvas);
window.addEventListener("resize", resizeCanvas);

// Inicializar el color y el grosor de la línea
let color = "#000";
let lineWidth = 5;

// Función para draw en el canvas
const draw = (cursorX, cursorY) => {
  context.beginPath();
  context.moveTo(initialX, initialY);
  context.lineWidth = lineWidth;
  context.strokeStyle = color;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineTo(cursorX, cursorY);
  context.stroke();

  initialX = cursorX;
  initialY = cursorY;
};

// Manejadores de eventos para draw
const mouseDown = (evt) => {
  evt.preventDefault();
  if (evt.changedTouches === undefined) {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
  } else {
    // Evitar desfase al draw
    initialX = evt.changedTouches[0].pageX - correccionX;
    initialY = evt.changedTouches[0].pageY - correccionY;
  }
  draw(initialX, initialY);
  mainCanvas.addEventListener("mousemove", mouseMoving);
  mainCanvas.addEventListener("touchmove", mouseMoving);
};

const mouseMoving = (evt) => {
  evt.preventDefault();
  if (evt.changedTouches === undefined) {
    draw(evt.offsetX, evt.offsetY);
  } else {
    draw(evt.changedTouches[0].pageX - correccionX, evt.changedTouches[0].pageY - correccionY);
  }
};

const mouseUp = () => {
  mainCanvas.removeEventListener("mousemove", mouseMoving);
  mainCanvas.removeEventListener("touchmove", mouseMoving);
};

mainCanvas.addEventListener("mousedown", mouseDown);
mainCanvas.addEventListener("mouseup", mouseUp);



// Control de grosor de la línea
lineWidthInput.addEventListener("input", (event) => {
  lineWidth = parseInt(event.target.value);
  lineWidthDisplay.textContent = `Grosor: ${lineWidth}`;
});

// Manejador de eventos para seleccionar color desde la paleta
const colorButtons = document.querySelectorAll(".color-option");
colorButtons.forEach(button => {
  button.addEventListener("click", () => {
    color = button.dataset.color;
  });
});

// Manejador de eventos para limpiar el canvas
clearButton.addEventListener("click", () => {
  context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
});

//boton back
document.getElementById("backBtn").addEventListener("click", function() {
  window.history.back();
});

// Función para iniciar el contador
function startTimer(duration, display) {
  let timer = duration;

  let intervalId = setInterval(function () {
    display.textContent = timer;

    // Si el tiempo llega a 0, se detiene el contador
    if (--timer < 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
  // Duración del contador en segundos
  let duration = 90;

  // Elemento donde se muestra el contador
  let display = document.getElementById("timer-text");

  // Iniciar el contador
  startTimer(duration, display);
});