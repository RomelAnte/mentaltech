/* ============================================================
   anagramas.js - Modulo 1: Anagramas
   ============================================================ */

const ANAGRAMAS = [
  {
    original: "CINEMATOGRAFO",
    anagrama: "MECANOGRAFO TIO",
    pista: "Piensa en alguien que escribe en una maquina de escribir"
  },
  {
    original: "CALENDARIO",
    anagrama: "ACLARO EN DIA",
    pista: "Algo que haces con informacion confusa"
  },
  {
    original: "CONVERSACION",
    anagrama: "CORONA DE VACAS",
    pista: "Una imagen insolita de la naturaleza"
  }
];

let currentIndex = 0;
let aciertos = 0;
let intentos = 0;
let revealed = false;
let answered = false;
let completed = false;

function getEl(id) {
  return document.getElementById(id);
}

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getAlternatives(index) {
  const correcta = ANAGRAMAS[index].anagrama;
  const distractores = ANAGRAMAS
    .filter((_, i) => i !== index)
    .map((item) => item.anagrama);

  return shuffle([correcta, ...shuffle(distractores).slice(0, 2)]);
}

function renderOptions() {
  const optionsEl = getEl("answer-options");
  const alternativas = getAlternatives(currentIndex);

  optionsEl.innerHTML = alternativas
    .map((opcion) => (
      `<button class="answer-option" type="button" onclick="checkAnswer('${escapeForHtmlAttr(opcion)}')">${opcion}</button>`
    ))
    .join("");
}

function loadAnagrama() {
  const item = ANAGRAMAS[currentIndex];
  completed = false;
  revealed = false;
  answered = false;
  getEl("word-original").textContent = item.original;
  getEl("feedback-box").className = "feedback-box";
  getEl("feedback-box").textContent = "";
  getEl("answer-reveal").style.display = "none";
  getEl("btn-reveal").style.display = "inline-flex";
  getEl("btn-next").textContent = "Siguiente →";
  renderOptions();
  updateScores();
}

function checkAnswer(selectedAnswer) {
  if (answered) return;

  const item = ANAGRAMAS[currentIndex];
  answered = true;
  intentos++;

  const isCorrect = normalize(selectedAnswer) === normalize(item.anagrama);
  const fb = getEl("feedback-box");
  const buttons = document.querySelectorAll(".answer-option");

  buttons.forEach((button) => {
    button.disabled = true;
    const isRightOption = normalize(button.textContent) === normalize(item.anagrama);
    if (isRightOption) button.classList.add("correct");
    if (!isCorrect && normalize(button.textContent) === normalize(selectedAnswer)) {
      button.classList.add("wrong");
    }
  });

  if (isCorrect) {
    aciertos++;
    fb.className = "feedback-box correct show";
    fb.textContent = "Correcto. Elegiste el anagrama adecuado.";
    animateScore();
  } else {
    fb.className = "feedback-box wrong show";
    fb.textContent = `No es correcto. Pista: ${item.pista}`;
  }

  updateScores();
}

function revealAnswer() {
  const item = ANAGRAMAS[currentIndex];
  revealed = true;
  answered = true;

  getEl("answer-reveal").style.display = "block";
  getEl("answer-text").textContent = item.anagrama;
  getEl("btn-reveal").style.display = "none";

  document.querySelectorAll(".answer-option").forEach((button) => {
    button.disabled = true;
    if (normalize(button.textContent) === normalize(item.anagrama)) {
      button.classList.add("correct");
    }
  });

  const fb = getEl("feedback-box");
  fb.className = "feedback-box info show";
  fb.textContent = `Pista: ${item.pista}`;
}

function nextAnagrama() {
  if (completed) {
    restartActivity();
    return;
  }

  if (currentIndex === ANAGRAMAS.length - 1) {
    finishActivity();
    return;
  }

  currentIndex += 1;
  loadAnagrama();
}

function finishActivity() {
  completed = true;
  answered = true;
  revealed = true;

  const pct = intentos > 0 ? Math.round((aciertos / intentos) * 100) : 0;

  getEl("word-original").textContent = "Actividad terminada";
  getEl("answer-options").innerHTML =
    `<div class="feedback-box info show">Ya completaste todos los anagramas. Resultado final: ${aciertos} aciertos de ${intentos} intentos (${pct}%).</div>`;
  getEl("answer-reveal").style.display = "none";
  getEl("btn-reveal").style.display = "none";

  const fb = getEl("feedback-box");
  fb.className = "feedback-box correct show";
  fb.textContent = "Muy bien. Terminaste todas las palabras.";

  getEl("btn-next").textContent = "Reiniciar actividad";
}

function restartActivity() {
  currentIndex = 0;
  aciertos = 0;
  intentos = 0;
  completed = false;
  revealed = false;
  answered = false;
  loadAnagrama();
}

function updateScores() {
  getEl("score-aciertos").textContent = aciertos;
  getEl("score-intentos").textContent = intentos;
  const pct = intentos > 0 ? Math.round((aciertos / intentos) * 100) : 0;
  getEl("score-pct").textContent = `${pct}%`;
}

function animateScore() {
  const el = getEl("score-aciertos");
  el.style.transform = "scale(1.4)";
  el.style.color = "var(--success)";
  setTimeout(() => {
    el.style.transform = "";
    el.style.color = "";
  }, 400);
}

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f\s]/g, "").toUpperCase();
}

function escapeForHtmlAttr(value) {
  return value.replace(/&/g, "&amp;").replace(/'/g, "&#39;");
}

document.addEventListener("DOMContentLoaded", () => {
  loadAnagrama();
});
