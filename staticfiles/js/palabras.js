/* ============================================================
   palabras.js — Módulo 2: Palabras Concretas y Abstractas
   ============================================================ */

const PALABRAS = [
  { palabra: "TRISTEZA",      tipo: "abstracta", emoji: "😢" },
  { palabra: "CANTAR",        tipo: "concreta",  emoji: "🎵" },
  { palabra: "MESA",          tipo: "concreta",  emoji: "🪑" },
  { palabra: "LIBRO",         tipo: "concreta",  emoji: "📚" },
  { palabra: "MONTAÑA",       tipo: "concreta",  emoji: "⛰️"  },
  { palabra: "TELÉFONO",      tipo: "concreta",  emoji: "📱" },
  { palabra: "JUSTICIA",      tipo: "abstracta", emoji: "⚖️"  },
  { palabra: "AMOR",          tipo: "abstracta", emoji: "❤️"  },
  { palabra: "CONOCIMIENTO",  tipo: "abstracta", emoji: "🧠" },
  { palabra: "LIBERTAD",      tipo: "abstracta", emoji: "🕊️"  },
  { palabra: "FELICIDAD",     tipo: "abstracta", emoji: "😊" },
  { palabra: "ÁRBOL",         tipo: "concreta",  emoji: "🌳" },
  { palabra: "ESPERANZA",     tipo: "abstracta", emoji: "🌟" },
  { palabra: "SILLA",         tipo: "concreta",  emoji: "🪑" },
  { palabra: "SABIDURÍA",     tipo: "abstracta", emoji: "🦉" }
];

let queue         = [];
let currentWord   = null;
let aciertos      = 0;
let errores       = 0;
let answered      = false;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startGame() {
  queue    = shuffle(PALABRAS);
  aciertos = 0;
  errores  = 0;
  nextWord();
}

function nextWord() {
  if (queue.length === 0) {
    showResults();
    return;
  }
  currentWord = queue.pop();
  answered    = false;

  // Resetear botones
  document.querySelectorAll('.category-btn').forEach(b => {
    b.classList.remove('selected', 'correct-flash', 'wrong-flash');
    b.disabled = false;
  });

  const fb = document.getElementById('feedback-box');
  fb.className = 'feedback-box';
  fb.textContent = '';

  // Mostrar palabra con animación
  const el = document.getElementById('current-word');
  el.style.animation = 'none';
  el.offsetHeight;   // reflow
  el.style.animation = '';

  document.getElementById('word-emoji').textContent  = currentWord.emoji;
  document.getElementById('word-text').textContent   = currentWord.palabra;
  document.getElementById('score-aciertos').textContent = aciertos;
  document.getElementById('score-errores').textContent  = errores;

  const total      = PALABRAS.length;
  const done       = total - queue.length - 1;
  const progress   = Math.round((done / total) * 100);
  document.getElementById('progress-bar').style.width = progress + '%';
  document.getElementById('progress-text').textContent = `${done} / ${total}`;
}

function answer(tipo) {
  if (answered) return;
  answered = true;

  const correct = tipo === currentWord.tipo;
  const fb      = document.getElementById('feedback-box');

  document.querySelectorAll('.category-btn').forEach(b => b.disabled = true);

  // Marcar botón seleccionado
  const btn = document.querySelector(`.category-btn.${tipo}`);
  btn.classList.add('selected');

  if (correct) {
    aciertos++;
    fb.className  = 'feedback-box correct show';
    fb.innerHTML  = `✅ ¡Correcto! <strong>${currentWord.palabra}</strong> es una palabra <strong>${tipo}</strong>.`;
  } else {
    errores++;
    fb.className  = 'feedback-box wrong show';
    fb.innerHTML  = `❌ No es correcto. <strong>${currentWord.palabra}</strong> es <strong>${currentWord.tipo}</strong>.`;
    // Marcar cuál era la respuesta correcta
    document.querySelector(`.category-btn.${currentWord.tipo}`).classList.add('selected');
  }

  setTimeout(() => {
    nextWord();
  }, 1800);
}

function showResults() {
  const total = PALABRAS.length;
  const pct   = Math.round((aciertos / total) * 100);

  const container = document.getElementById('game-area');
  container.innerHTML = `
    <div class="card fade-in" style="text-align:center; padding:3rem;">
      <div style="font-size:4rem; margin-bottom:1rem;">${pct >= 70 ? '🏆' : '💪'}</div>
      <h2 class="presentation-title" style="font-size:2rem; margin-bottom:.5rem;">
        ${pct >= 70 ? '¡Excelente resultado!' : '¡Buen intento!'}
      </h2>
      <p style="color:var(--text-muted); margin-bottom:2rem;">
        Respondiste correctamente ${aciertos} de ${total} palabras (${pct}%)
      </p>
      <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; margin-bottom:2rem;">
        <div class="score-item">
          <div class="score-label">Aciertos</div>
          <div class="score-value" style="color:var(--success)">${aciertos}</div>
        </div>
        <div class="score-item">
          <div class="score-label">Errores</div>
          <div class="score-value" style="color:var(--danger)">${errores}</div>
        </div>
        <div class="score-item">
          <div class="score-label">Precisión</div>
          <div class="score-value">${pct}%</div>
        </div>
      </div>
      <button class="btn btn-primary btn-lg" onclick="startGame()">
        🔄 Jugar de nuevo
      </button>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', startGame);
