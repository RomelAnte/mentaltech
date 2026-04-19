/* ============================================================
   anagramas.js — Módulo 1: Anagramas
   ============================================================ */

const ANAGRAMAS = [
  {
    original: "CINEMATÓGRAFO",
    anagrama: "MECANÓGRAFO TÍO",
    pista: "Piensa en alguien que escribe en una máquina de escribir"
  },
  {
    original: "CALENDARIO",
    anagrama: "ACLARO EN DIA",
    pista: "Algo que haces con información confusa"
  },
  {
    original: "CONVERSACIÓN",
    anagrama: "CORONA DE VACAS",
    pista: "Una imagen insólita de la naturaleza"
  },
  {
    original: "EDUCACIÓN",
    anagrama: "UNA DOCENCIA",
    pista: "Relacionado con enseñar"
  },
  {
    original: "MATEMÁTICAS",
    anagrama: "ACTA MATÉMIS",
    pista: "Un documento con ciencia"
  }
];

let currentIndex = 0;
let aciertos = 0;
let intentos  = 0;
let revealed  = false;

function getEl(id) { return document.getElementById(id); }

function loadAnagrama() {
  const item = ANAGRAMAS[currentIndex];
  revealed = false;
  getEl('word-original').textContent = item.original;
  getEl('user-input').value = '';
  getEl('feedback-box').className = 'feedback-box';
  getEl('feedback-box').textContent = '';
  getEl('answer-reveal').style.display = 'none';
  getEl('btn-reveal').style.display = 'inline-flex';
  updateScores();
}

function checkAnswer() {
  const item    = ANAGRAMAS[currentIndex];
  const userVal = getEl('user-input').value.trim().toUpperCase();
  if (!userVal) return;

  intentos++;
  const fb = getEl('feedback-box');

  // Comparación normalizada (sin tildes, espacios, puntuación)
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f\s]/g,'').toUpperCase();

  if (normalize(userVal) === normalize(item.anagrama)) {
    aciertos++;
    fb.className = 'feedback-box correct show';
    fb.textContent = '✅ ¡Excelente! Eso es correcto.';
    animateScore();
  } else {
    fb.className = 'feedback-box wrong show';
    fb.textContent = `❌ No es correcto. Pista: ${item.pista}`;
  }

  updateScores();
}

function revealAnswer() {
  const item = ANAGRAMAS[currentIndex];
  revealed = true;
  getEl('answer-reveal').style.display = 'block';
  getEl('answer-text').textContent = item.anagrama;
  getEl('btn-reveal').style.display = 'none';

  const fb = getEl('feedback-box');
  fb.className = 'feedback-box info show';
  fb.textContent = `💡 Pista: ${item.pista}`;
}

function nextAnagrama() {
  currentIndex = (currentIndex + 1) % ANAGRAMAS.length;
  loadAnagrama();
}

function updateScores() {
  getEl('score-aciertos').textContent = aciertos;
  getEl('score-intentos').textContent  = intentos;
  const pct = intentos > 0 ? Math.round((aciertos / intentos) * 100) : 0;
  getEl('score-pct').textContent = pct + '%';
}

function animateScore() {
  const el = getEl('score-aciertos');
  el.style.transform = 'scale(1.4)';
  el.style.color     = 'var(--success)';
  setTimeout(() => {
    el.style.transform = '';
    el.style.color     = '';
  }, 400);
}

// Enter en input
document.addEventListener('DOMContentLoaded', () => {
  const input = getEl('user-input');
  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') checkAnswer();
    });
  }
  loadAnagrama();
});
