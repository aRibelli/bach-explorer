/* ═══════════════════════════════════════════════════════════════
   BACH EXPLORER — Logique applicative — v2
   ═══════════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────
// CALENDRIER LITURGIQUE
// ───────────────────────────────────────────────
const CALENDAR = [
  {
    season: "Avent", sigil: "I", color: "#9b7de8",
    occasions: [
      { name: "1er dimanche de l'Avent", bwvs: [61, 62, 36] },
      { name: "2e dimanche de l'Avent",  bwvs: [70] },
      { name: "3e dimanche de l'Avent",  bwvs: [186] },
      { name: "4e dimanche de l'Avent",  bwvs: [132] },
    ],
  },
  {
    season: "Noël", sigil: "✦", color: "#e8a832",
    occasions: [
      { name: "Oratorio de Noël",          bwvs: [248] },
      { name: "1er jour de Noël",          bwvs: [63, 91, 110] },
      { name: "2e jour de Noël",           bwvs: [40, 121] },
      { name: "3e jour de Noël",           bwvs: [64, 133] },
      { name: "Dim. après Noël",           bwvs: [122, 28] },
      { name: "Saint Étienne",             bwvs: [57] },
      { name: "Saint Jean l'Évangéliste",  bwvs: [154] },
    ],
  },
  {
    season: "Jour de l'An & Épiphanie", sigil: "✧", color: "#5bbce8",
    occasions: [
      { name: "Jour de l'An (Circoncision)", bwvs: [41, 143, 171] },
      { name: "Épiphanie",                   bwvs: [65, 123] },
      { name: "1er dim. après l'Épiphanie",  bwvs: [124] },
      { name: "2e dim. après l'Épiphanie",   bwvs: [3, 13] },
      { name: "3e dim. après l'Épiphanie",   bwvs: [72, 73] },
      { name: "4e dim. après l'Épiphanie",   bwvs: [81, 14] },
    ],
  },
  {
    season: "Pré-Carême", sigil: "✝", color: "#a89070",
    occasions: [
      { name: "Septuagésime",  bwvs: [144, 84, 92] },
      { name: "Sexagésime",    bwvs: [18, 181, 126] },
      { name: "Quinquagésime", bwvs: [22, 23, 127] },
    ],
  },
  {
    season: "Carême & Passion", sigil: "✚", color: "#7a6050",
    occasions: [
      { name: "Passion selon saint Matthieu", bwvs: [244] },
      { name: "Passion selon saint Jean",     bwvs: [245] },
      { name: "Oculi (3e dim. de Carême)",    bwvs: [54] },
      { name: "Annonciation",                 bwvs: [1] },
    ],
  },
  {
    season: "Pâques", sigil: "☀", color: "#f5a87e",
    occasions: [
      { name: "Oratorio de Pâques",          bwvs: [249] },
      { name: "Jour de Pâques",              bwvs: [4, 31] },
      { name: "Lundi de Pâques",             bwvs: [66] },
      { name: "Mardi de Pâques",             bwvs: [134, 145] },
      { name: "Quasimodo",                   bwvs: [67, 42] },
      { name: "Misericordias Domini",        bwvs: [104, 85] },
      { name: "Jubilate",                    bwvs: [12, 103] },
      { name: "Cantate",                     bwvs: [166, 108] },
    ],
  },
  {
    season: "Ascension & Pentecôte", sigil: "△", color: "#e8a832",
    occasions: [
      { name: "Oratorio de l'Ascension",        bwvs: [11] },
      { name: "Ascension",                       bwvs: [37, 43, 128] },
      { name: "Exaudi",                          bwvs: [44, 183] },
      { name: "Pentecôte (1er jour)",            bwvs: [172, 59, 74] },
      { name: "Pentecôte (2e jour)",             bwvs: [173, 68] },
      { name: "Pentecôte (3e jour)",             bwvs: [184, 175] },
      { name: "Trinité",                         bwvs: [165, 194, 176] },
    ],
  },
  {
    season: "Après la Trinité", sigil: "○", color: "#c8b48a",
    occasions: [
      { name: "1er dim. après la Trinité",       bwvs: [75, 20, 39] },
      { name: "2e dim.",                         bwvs: [76, 2] },
      { name: "3e dim.",                         bwvs: [21, 135] },
      { name: "4e dim.",                         bwvs: [185, 24] },
      { name: "5e dim.",                         bwvs: [93, 88] },
      { name: "6e dim.",                         bwvs: [170] },
      { name: "7e dim.",                         bwvs: [54, 186, 107] },
      { name: "8e dim.",                         bwvs: [136, 178, 45] },
      { name: "10e dim.",                        bwvs: [46, 101, 102] },
      { name: "12e dim.",                        bwvs: [69, 137, 35] },
      { name: "14e dim.",                        bwvs: [25, 78, 17] },
      { name: "20e dim.",                        bwvs: [162, 180, 49] },
      { name: "27e dim.",                        bwvs: [140] },
    ],
  },
  {
    season: "Grandes œuvres & Motets", sigil: "✦", color: "#c8922a",
    occasions: [
      { name: "Messe en si mineur",         bwvs: [232] },
      { name: "Magnificat",                 bwvs: [243] },
      { name: "Messes brèves",              bwvs: [233, 234, 235, 236] },
      { name: "Sanctus en ré majeur",       bwvs: [238] },
      { name: "Motets",                     bwvs: [225, 226, 227, 228, 229, 230] },
    ],
  },
];

const LOADING_MSGS = [
  "Consultation des partitions",
  "Lecture du livret",
  "Recherche dans le corpus",
  "Préparation des textes",
];

// ───────────────────────────────────────────────
// ÉLÉMENTS DOM
// ───────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

const els = {
  app:             $("app"),
  calendarToggle:  $("calendar-toggle"),
  calendarPanel:   $("calendar-panel"),
  calendarSeasons: $("calendar-seasons"),
  homeButton:      $("home-button"),
  searchInput:     $("search-input"),
  searchButton:    $("search-button"),
  loadingMessage:  $("loading-message"),
  loadingLabel:    $("loading-label"),
  errorMessage:    $("error-message"),
  errorBack:       $("error-back"),
  errorRetry:      $("error-retry"),
  workContent:     $("work-content"),
  screens: {
    home:    $("screen-home"),
    loading: $("screen-loading"),
    error:   $("screen-error"),
    work:    $("screen-work"),
  },
};

// ───────────────────────────────────────────────
// ÉTAT
// ───────────────────────────────────────────────
let currentScreen = "home";
let loadingInterval = null;
let calendarOverlay = null;
let lastQuery = null;          // mémorise la dernière requête pour « Réessayer »

// ───────────────────────────────────────────────
// NAVIGATION ENTRE ÉCRANS
// ───────────────────────────────────────────────
function showScreen(name) {
  currentScreen = name;
  for (const key of Object.keys(els.screens)) {
    els.screens[key].hidden = (key !== name);
  }
  if (name !== "loading" && loadingInterval) {
    clearInterval(loadingInterval);
    loadingInterval = null;
  }
}

function goHome() {
  closeCalendar();
  els.searchInput.value = "";
  showScreen("home");
  els.searchInput.focus();
}

// ───────────────────────────────────────────────
// CALENDRIER LITURGIQUE
// ───────────────────────────────────────────────
function renderCalendar() {
  els.calendarSeasons.innerHTML = "";
  for (const season of CALENDAR) {
    const block = document.createElement("div");
    block.className = "season-block";

    const header = document.createElement("div");
    header.className = "season-header";
    header.innerHTML = `
      <span class="season-sigil" style="color: ${season.color}">${season.sigil}</span>
      <span class="season-name">${season.season}</span>
    `;
    block.appendChild(header);

    for (const occ of season.occasions) {
      const btn = document.createElement("button");
      btn.className = "occasion-button";
      btn.innerHTML = `
        ${occ.name}
        <span class="occasion-bwvs">BWV ${occ.bwvs.join(", ")}</span>
      `;
      btn.addEventListener("click", () => {
        const first = occ.bwvs[0];
        els.searchInput.value = `BWV ${first}`;
        closeCalendar();
        loadWork(`BWV ${first}`);
      });
      block.appendChild(btn);
    }
    els.calendarSeasons.appendChild(block);
  }
}

function openCalendar() {
  els.calendarPanel.hidden = false;
  requestAnimationFrame(() => {
    els.calendarPanel.dataset.open = "true";
    if (!calendarOverlay) {
      calendarOverlay = document.createElement("div");
      calendarOverlay.className = "calendar-overlay";
      calendarOverlay.addEventListener("click", closeCalendar);
      document.body.appendChild(calendarOverlay);
    }
    calendarOverlay.dataset.visible = "true";
  });
}

function closeCalendar() {
  if (els.calendarPanel.dataset.open !== "true") return;
  els.calendarPanel.dataset.open = "false";
  if (calendarOverlay) calendarOverlay.dataset.visible = "false";
  setTimeout(() => {
    if (els.calendarPanel.dataset.open === "false") {
      els.calendarPanel.hidden = true;
    }
  }, 260);
}

// ───────────────────────────────────────────────
// CHARGEMENT D'UNE ŒUVRE — appel API via proxy
// ───────────────────────────────────────────────
async function loadWork(query) {
  if (!query || !query.trim()) return;
  query = query.trim();
  lastQuery = query;

  showScreen("loading");
  els.loadingLabel.textContent = query;

  let idx = 0;
  els.loadingMessage.textContent = LOADING_MSGS[0];
  loadingInterval = setInterval(() => {
    idx = (idx + 1) % LOADING_MSGS.length;
    els.loadingMessage.textContent = LOADING_MSGS[idx];
  }, 2200);

  try {
    const response = await fetch("/api/bach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    // On tente toujours de lire le corps en JSON : même en cas
    // d'erreur, le serveur renvoie { error: "..." } exploitable.
    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }

    if (!response.ok) {
      const msg = (data && data.error)
        ? data.error
        : "Le service est momentanément indisponible.";
      throw new Error(msg);
    }

    if (!data) {
      throw new Error("Réponse illisible du serveur.");
    }
    if (data.error) {
      // Erreur « propre » (œuvre non identifiée, etc.)
      throw new Error(data.error);
    }
    if (!data.work) {
      throw new Error("Réponse incomplète du serveur.");
    }

    renderWork(data.work);
    showScreen("work");
    window.scrollTo({ top: 0, behavior: "instant" });
  } catch (err) {
    console.error(err);
    showError(err.message || "Une erreur est survenue.");
  }
}

// ───────────────────────────────────────────────
// AFFICHAGE D'UNE ERREUR — épuré, sans JSON brut
// ───────────────────────────────────────────────
function showError(message) {
  // Nettoyage défensif : si un fragment de JSON a traversé,
  // on tente d'en extraire le message lisible.
  let clean = String(message).trim();
  const m = clean.match(/"error"\s*:\s*"([^"]+)"/);
  if (m) clean = m[1];
  // On retire d'éventuelles accolades ou guillemets résiduels.
  clean = clean.replace(/^[\s{"]+|[\s}"]+$/g, "");

  els.errorMessage.textContent = clean;

  // Le bouton « Réessayer » n'a de sens que si une requête existe.
  els.errorRetry.hidden = !lastQuery;

  showScreen("error");
}

// ───────────────────────────────────────────────
// RENDU — utilitaires
// ───────────────────────────────────────────────
function escapeHtml(s) {
  if (typeof s !== "string") return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function paragraphs(text) {
  if (!text) return "";
  return text
    .split(/\n\s*\n/)
    .filter(p => p.trim())
    .map(p => `<p>${escapeHtml(p.trim()).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function typeColor(type) {
  const t = (type || "").toLowerCase();
  if (t.includes("chœur") || t.includes("choeur") || t.includes("chorus")) return "var(--type-choeur)";
  if (t.includes("aria"))   return "var(--type-aria)";
  if (t.includes("récit") || t.includes("recit")) return "var(--type-recit)";
  if (t.includes("choral")) return "var(--type-choral)";
  if (t.includes("duo") || t.includes("duetto")) return "var(--type-duo)";
  return "var(--text-meta)";
}

// ───────────────────────────────────────────────
// RENDU — panneau Informations
// ───────────────────────────────────────────────
function renderMeta(meta) {
  // Bloc des données factuelles
  const facts = [];
  if (meta.date)       facts.push(`<div><strong>Date :</strong> ${escapeHtml(meta.date)}</div>`);
  if (meta.place)      facts.push(`<div><strong>Lieu :</strong> ${escapeHtml(meta.place)}</div>`);
  if (meta.occasion)   facts.push(`<div><strong>Occasion :</strong> ${escapeHtml(meta.occasion)}</div>`);
  if (meta.librettist) facts.push(`<div><strong>Livret :</strong> ${escapeHtml(meta.librettist)}</div>`);
  if (meta.scoring)    facts.push(`<div><strong>Effectif :</strong> ${escapeHtml(meta.scoring)}</div>`);

  let html = "";

  if (facts.length) {
    html += `
      <div class="work-meta-section">
        <p class="work-meta-facts">${facts.join("")}</p>
      </div>
    `;
  }

  // Sections rédigées : contexte théologique, musical, interprétations.
  // On reste compatible avec l'ancien champ « notes » au cas où.
  const sections = [
    ["Contexte théologique", meta.theological],
    ["Spécificités musicales", meta.musical],
    ["Interprétations de référence", meta.interpretations],
    ["Notes", meta.notes],
  ];

  for (const [heading, body] of sections) {
    if (body && String(body).trim()) {
      html += `
        <div class="work-meta-section">
          <p class="work-meta-heading">${escapeHtml(heading)}</p>
          <p class="work-meta-body">${escapeHtml(String(body).trim())}</p>
        </div>
      `;
    }
  }

  return html || `<p class="work-meta-body">Informations non disponibles pour cette œuvre.</p>`;
}

// ───────────────────────────────────────────────
// RENDU — œuvre complète
// ───────────────────────────────────────────────
function renderWork(work) {
  const meta = work.metadata || {};
  const mvts = work.movements || [];

  let html = `
    <div class="work-header">
      <div class="work-bwv">${escapeHtml(work.bwv || "")}</div>
      <h2 class="work-title-de">${escapeHtml(work.titleGerman || work.title || "")}</h2>
      ${work.titleFrench ? `<p class="work-title-fr">${escapeHtml(work.titleFrench)}</p>` : ""}
      <button class="work-meta-toggle" id="meta-toggle">▸ Informations</button>
    </div>
    <div class="work-meta" id="work-meta" hidden>
      ${renderMeta(meta)}
    </div>
  `;

  for (const m of mvts) {
    const color = typeColor(m.type);
    html += `
      <article class="movement">
        <header class="movement-header">
          ${m.number ? `<span class="movement-number">${escapeHtml(String(m.number))}</span>` : ""}
          ${m.type ? `<span class="movement-type" style="color: ${color}">${escapeHtml(m.type)}</span>` : ""}
          ${m.voice ? `<span class="movement-voice">${escapeHtml(m.voice)}</span>` : ""}
          ${m.scoring ? `<span class="movement-scoring">${escapeHtml(m.scoring)}</span>` : ""}
        </header>
        <div class="movement-text">
          <div class="text-german">${paragraphs(m.textGerman || m.textOriginal || "")}</div>
          <div class="text-french">${paragraphs(m.textFrench || "")}</div>
        </div>
      </article>
    `;
  }

  els.workContent.innerHTML = html;

  // Toggle du panneau Informations
  const toggle = $("meta-toggle");
  const metaEl = $("work-meta");
  if (toggle && metaEl) {
    toggle.addEventListener("click", () => {
      const isOpen = !metaEl.hidden;
      metaEl.hidden = isOpen;
      toggle.textContent = isOpen ? "▸ Informations" : "▾ Informations";
    });
  }
}

// ───────────────────────────────────────────────
// ÉVÉNEMENTS
// ───────────────────────────────────────────────
function setup() {
  renderCalendar();

  els.calendarToggle.addEventListener("click", openCalendar);
  els.homeButton.addEventListener("click", goHome);
  els.errorBack.addEventListener("click", goHome);

  // « Réessayer » relance la dernière requête mémorisée
  if (els.errorRetry) {
    els.errorRetry.addEventListener("click", () => {
      if (lastQuery) loadWork(lastQuery);
    });
  }

  els.searchButton.addEventListener("click", () => {
    loadWork(els.searchInput.value);
  });

  els.searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      loadWork(els.searchInput.value);
    }
  });

  els.searchInput.focus();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setup);
} else {
  setup();
}
