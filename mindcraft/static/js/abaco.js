/* ============================================================
   abaco.js — Módulo 3: Ábaco – Generador de Números
   ============================================================ */

let lastNumbers  = [];
let lastResult   = null;
let resultShown  = false;

/* ── Generar un número aleatorio hasta 4 cifras ── */
function generarNumero() {
  const num = Math.floor(Math.random() * 900) + 100; // 100–999
  displaySingleNumber(num);
  playEffect();
}

/* ── Generar suma de 3 números ── */
function generarSuma() {
  const nums = [
    Math.floor(Math.random() * 900) + 100,
    Math.floor(Math.random() * 900) + 100,
    Math.floor(Math.random() * 900) + 100
  ];
  lastNumbers = nums;
  lastResult  = nums.reduce((a, b) => a + b, 0);
  resultShown = false;

  displaySuma(nums);
  playEffect();
}

/* ── Mostrar resultado de la suma ── */
function mostrarResultado() {
  if (!lastResult) return;

  const resultRow = document.getElementById('result-row');
  resultRow.style.display = '';
  document.getElementById('result-num').textContent = lastResult;
  resultShown = true;

  // Animación brillo
  resultRow.style.animation = 'none';
  resultRow.offsetHeight;
  resultRow.style.animation = 'fade-in .4s ease';
}

/* ── Renderizar número único ── */
function displaySingleNumber(num) {
  const area = document.getElementById('display-area');
  area.innerHTML = `
    <div class="card fade-in" style="text-align:center; padding:3rem 2rem;">
      <p style="font-size:.8rem; text-transform:uppercase; letter-spacing:.1em; color:var(--text-muted); margin-bottom:1rem;">
        Representa este número en tu ábaco
      </p>
      <div class="abaco-number animate" id="main-number">${num}</div>
      <div style="margin-top:1.5rem; display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
        ${digitBadges(num)}
      </div>
    </div>
  `;
}

/* ── Renderizar tabla de suma ── */
function displaySuma(nums) {
  const area = document.getElementById('display-area');
  const rows = nums.map((n, i) => `
    <tr>
      <td class="plus-col">${i === 0 ? '' : '+'}</td>
      <td class="num-row">${n}</td>
    </tr>
  `).join('');

  area.innerHTML = `
    <div class="card fade-in">
      <p style="font-size:.8rem; text-transform:uppercase; letter-spacing:.1em; color:var(--text-muted); margin-bottom:.5rem;">
        Realiza esta suma en tu ábaco
      </p>
      <table class="suma-table">
        <tbody>
          ${rows}
          <tr id="result-row" style="display:none">
            <td class="plus-col">=</td>
            <td class="result-row" id="result-num"></td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top:1rem; text-align:center;">
        <button class="btn btn-warn" onclick="mostrarResultado()">
          👁 Mostrar resultado
        </button>
      </div>
    </div>
  `;
}

/* ── Badges por dígito ── */
function digitBadges(num) {
  const s     = num.toString().padStart(4, '0');
  const names = ['Millares', 'Centenas', 'Decenas', 'Unidades'];
  return s.split('').map((d, i) => `
    <div style="text-align:center;">
      <div style="font-size:.7rem; color:var(--text-muted); margin-bottom:.25rem;">${names[i]}</div>
      <div class="badge badge-blue" style="font-size:1.2rem; padding:.4rem .9rem;">${d}</div>
    </div>
  `).join('');
}

/* ── Efecto visual al generar ── */
function playEffect() {
  // Breve flash en el fondo
  const flash = document.createElement('div');
  flash.style.cssText = `
    position:fixed; inset:0; pointer-events:none; z-index:999;
    background:radial-gradient(ellipse at center, rgba(99,179,237,0.12), transparent 70%);
    animation:fade-in .15s ease reverse;
  `;
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 300);
}

document.addEventListener('DOMContentLoaded', () => {
  // Mostrar número inicial al cargar
  generarNumero();
});
