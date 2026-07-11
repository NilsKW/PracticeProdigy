import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────

const STRINGS = {
  en: {
    appSub: "Practice Session Planner",
    navLibrary: "Library", navPresets: "Presets", navSession: "Session", navActive: "▶ Active",
    headerEnd: "↩ End", headerLibrary: "Library", headerStats: "Statistics", headerSettings: "Settings",
    sessionPaused: "Session paused", resumeBtn: "Resume ▶",
    needsPractice: "Needs Practice", leastWorkedOn: "· least worked on",
    neverPractised: "never practised", mPractised: "m practised", hPractised: "h", mPractisedUnit: "m practised",
    allCat: "All",
    emptySession: "Your session queue is empty.", emptySessionSub: "Library → tap + to add exercises, or Presets to load a saved session.",
    totalSessionTime: "Total Session Time", exercises: "exercises", exercise: "exercise",
    returnToSession: "▶ Return to Session", startSession: "▶ Start Session",
    saveAsPreset: "💾", savePresetTitle: "Save as preset", cancelBtn: "Cancel", savePresetBtn: "💾 Save Preset",
    noPresetsTitle: "No presets yet.", noPresetsSub: "Build a session in the Session tab, then come back here to save it.",
    saveCurrentPreset: "💾 Save Current Session as Preset", saveCurrentEmpty: " (queue is empty)",
    presetName: "Preset name", saveBtn: "💾 Save", loadBtn: "Load ▶", keepBtn: "Keep", deleteBtn: "Delete",
    nowPlaying: "Now Playing", exerciseOf: "of", remaining: "remaining",
    skipBtn: "Skip →", previousBtn: "← Previous", pauseBtn: "⏸ Pause", resumePlayBtn: "▶ Resume", playBtn: "▶ Play",
    refVideo: "Reference Video", opensYoutube: "Opens YouTube ↗",
    sessionSetlist: "Session Setlist", done: "done", overallProgress: "Overall Progress",
    backToMenu: "↩ Back to Main Menu",
    sessionComplete: "Session Complete!", sessionCompleteMsg: "exercises", sessionCompleteTime: "",
    consistency: "Keep it up — consistency builds mastery. 🎸",
    backToSession: "Back to Session", mainMenu: "↩ Main Menu",
    exerciseOf2: "Exercise", of2: "of",
    statsTitle: "Total Practice", statsDone: "Exercises Done", statsSessions: "Sessions",
    statsMostPractised: "Most Practised", statsReset: "Reset Statistics",
    statsConfirmTitle: "Reset all statistics?", statsConfirmMsg: "This will permanently delete all your practice history. This cannot be undone.",
    statsConfirmYes: "Yes, reset", statsEmpty: "No stats yet.", statsEmptySub: "Complete at least one exercise to start tracking.",
    settingsExercises: "exercises", settingsCategories: "categories", settingsSound: "sound", settingsLanguage: "language", settingsDisplay: "display",
    newExercise: "+ New Exercise", editExercise: "Edit Exercise", newExerciseTitle: "New Exercise",
    iconLabel: "Icon", nameLabel: "Name", descLabel: "Description", youtubeLabel: "YouTube Reference Video (optional)",
    youtubePlaceholder: "https://youtube.com/watch?v=...", youtubeError: "⚠ URL not recognised — try a standard youtube.com or youtu.be link",
    youtubeOk: "✓ Video ID: ", durationLabel: "Default Duration (minutes)", categoryLabel: "Category",
    addExercise: "Add Exercise", saveChanges: "Save Changes", deleteExercise: "Delete Exercise",
    newCategory: "+ New Category", editCategory: "Edit Category", newCategoryTitle: "New Category",
    colorLabel: "Color", preview: "Preview", addCategory: "Add Category",
    deleteCategoryMsg: "Delete Category & Its Exercises",
    volumeLabel: "Master Volume", volumeDesc: "Controls the volume of all in-app sounds (exercise bell, session complete chord).",
    langLabel: "Language", langDesc: "Choose the app display language.",
    metronomeLabel: "Metronome", bpmLabel: "BPM", timeSigLabel: "Time signature",
    metronomeOn: "🟢 Metro ON", metronomeOff: "🔴 Metro OFF",
    exercisesCount: (n) => n === 1 ? "1 exercise" : `${n} exercises`,
    sessionsCount: (n) => n === 1 ? "1 session" : `${n} sessions`,
    noExercisesInCategory: "No exercises in this category yet.", unknownCategory: "Unknown",
    addExercisesFirst: "Add exercises to your session first",
    presetPlaceholder: "e.g. Morning Warm-Up",
    exerciseNamePlaceholder: "Exercise name", exerciseDescPlaceholder: "What does this exercise focus on?",
    categoryNamePlaceholder: "Category name", bpmHint: "(BPM, 0 = off)", beatsPerBarHint: "(beats per bar)",
    displayLabel: "Display size", displayDesc: "Adjust the size of text and buttons throughout the app.",
    sizeSmall: "Small", sizeMedium: "Medium", sizeLarge: "Large",
    subExercisesLabel: "Sub-exercises", subExercisePlaceholder: "e.g. Ascending in 3rds",
    addSubExercise: "+ Add sub-exercise", subExercisesTitle: "Sub-exercises",
    resetProgress: "↺ Reset", resetProgressConfirm: "Reset?",
  },
  fr: {
    appSub: "Planificateur de séances",
    navLibrary: "Bibliothèque", navPresets: "Modèles", navSession: "Séance", navActive: "▶ En cours",
    headerEnd: "↩ Fin", headerLibrary: "Bibliothèque", headerStats: "Statistiques", headerSettings: "Réglages",
    sessionPaused: "Séance en pause", resumeBtn: "Reprendre ▶",
    needsPractice: "À travailler", leastWorkedOn: "· les moins pratiqués",
    neverPractised: "jamais pratiqué", mPractised: "min pratiqué", hPractised: "h", mPractisedUnit: "min pratiqué",
    allCat: "Tout",
    emptySession: "Votre file d'exercices est vide.", emptySessionSub: "Bibliothèque → appuyez sur + pour ajouter des exercices, ou Modèles pour charger une séance.",
    totalSessionTime: "Durée totale", exercises: "exercices", exercise: "exercice",
    returnToSession: "▶ Reprendre la séance", startSession: "▶ Démarrer",
    saveAsPreset: "💾", savePresetTitle: "Enregistrer comme modèle", cancelBtn: "Annuler", savePresetBtn: "💾 Enregistrer",
    noPresetsTitle: "Aucun modèle.", noPresetsSub: "Construisez une séance dans l'onglet Séance, puis revenez ici pour l'enregistrer.",
    saveCurrentPreset: "💾 Enregistrer la séance comme modèle", saveCurrentEmpty: " (file vide)",
    presetName: "Nom du modèle", saveBtn: "💾 Enregistrer", loadBtn: "Charger ▶", keepBtn: "Garder", deleteBtn: "Supprimer",
    nowPlaying: "En cours", exerciseOf: "sur", remaining: "restant",
    skipBtn: "Passer →", previousBtn: "← Précédent", pauseBtn: "⏸ Pause", resumePlayBtn: "▶ Reprendre", playBtn: "▶ Démarrer",
    refVideo: "Vidéo de référence", opensYoutube: "Ouvrir YouTube ↗",
    sessionSetlist: "Setlist de séance", done: "terminé(s)", overallProgress: "Progression globale",
    backToMenu: "↩ Retour au menu",
    sessionComplete: "Séance terminée !", sessionCompleteMsg: "exercices", sessionCompleteTime: "",
    consistency: "Continuez — la régularité construit la maîtrise. 🎸",
    backToSession: "Retour à la séance", mainMenu: "↩ Menu principal",
    exerciseOf2: "Exercice", of2: "sur",
    statsTitle: "Temps total", statsDone: "Exercices faits", statsSessions: "Séances",
    statsMostPractised: "Les plus pratiqués", statsReset: "Réinitialiser les statistiques",
    statsConfirmTitle: "Réinitialiser les statistiques ?", statsConfirmMsg: "Ceci supprimera définitivement tout votre historique de pratique. Cette action est irréversible.",
    statsConfirmYes: "Oui, réinitialiser", statsEmpty: "Pas encore de statistiques.", statsEmptySub: "Terminez au moins un exercice pour commencer le suivi.",
    settingsExercises: "exercices", settingsCategories: "catégories", settingsSound: "son", settingsLanguage: "langue", settingsDisplay: "affichage",
    newExercise: "+ Nouvel exercice", editExercise: "Modifier l'exercice", newExerciseTitle: "Nouvel exercice",
    iconLabel: "Icône", nameLabel: "Nom", descLabel: "Description", youtubeLabel: "Vidéo YouTube de référence (optionnel)",
    youtubePlaceholder: "https://youtube.com/watch?v=...", youtubeError: "⚠ URL non reconnue — essayez un lien youtube.com ou youtu.be standard",
    youtubeOk: "✓ ID vidéo : ", durationLabel: "Durée par défaut (minutes)", categoryLabel: "Catégorie",
    addExercise: "Ajouter l'exercice", saveChanges: "Enregistrer", deleteExercise: "Supprimer l'exercice",
    newCategory: "+ Nouvelle catégorie", editCategory: "Modifier la catégorie", newCategoryTitle: "Nouvelle catégorie",
    colorLabel: "Couleur", preview: "Aperçu", addCategory: "Ajouter la catégorie",
    deleteCategoryMsg: "Supprimer la catégorie et ses exercices",
    volumeLabel: "Volume général", volumeDesc: "Contrôle le volume de tous les sons de l'appli (cloche d'exercice, accord de fin de séance).",
    langLabel: "Langue", langDesc: "Choisissez la langue d'affichage de l'application.",
    metronomeLabel: "Métronome", bpmLabel: "BPM", timeSigLabel: "Mesure",
    metronomeOn: "🟢 Métro ON", metronomeOff: "🔴 Métro OFF",
    exercisesCount: (n) => n === 1 ? "1 exercice" : `${n} exercices`,
    sessionsCount: (n) => n === 1 ? "1 séance" : `${n} séances`,
    noExercisesInCategory: "Aucun exercice dans cette catégorie pour l'instant.", unknownCategory: "Inconnue",
    addExercisesFirst: "Ajoutez d'abord des exercices à votre séance",
    presetPlaceholder: "ex. Échauffement du matin",
    exerciseNamePlaceholder: "Nom de l'exercice", exerciseDescPlaceholder: "Sur quoi porte cet exercice ?",
    categoryNamePlaceholder: "Nom de la catégorie", bpmHint: "(BPM, 0 = désactivé)", beatsPerBarHint: "(temps par mesure)",
    displayLabel: "Taille d'affichage", displayDesc: "Ajuste la taille du texte et des boutons dans toute l'application.",
    sizeSmall: "Petit", sizeMedium: "Moyen", sizeLarge: "Grand",
    subExercisesLabel: "Sous-exercices", subExercisePlaceholder: "ex. Montée en tierces",
    addSubExercise: "+ Ajouter un sous-exercice", subExercisesTitle: "Sous-exercices",
    resetProgress: "↺ Réinitialiser", resetProgressConfirm: "Confirmer ?",
  },
};

// T() is the translation function — call with a string key to get the current language's string.
// Lang is provided by App via React context so every component can access it without prop-drilling.
const LangContext = React.createContext("fr");
function translate(lang, key, ...args) {
  const val = STRINGS[lang]?.[key] ?? STRINGS["en"]?.[key] ?? key;
  return typeof val === "function" ? val(...args) : val;
}
function useT() {
  const lang = React.useContext(LangContext);
  return (key, ...args) => translate(lang, key, ...args);
}
function useLang() {
  return React.useContext(LangContext);
}


// ─── PERSISTENT STORAGE ───────────────────────────────────────────────────────
// Uses window.storage (artifact API) with a localStorage fallback.

async function storageSet(key, value) {
  try {
    if (window.storage) { await window.storage.set(key, JSON.stringify(value)); return; }
  } catch {}
  try { localStorage.setItem("gf_" + key, JSON.stringify(value)); } catch {}
}

async function storageGet(key) {
  try {
    if (window.storage) {
      const r = await window.storage.get(key);
      return r ? JSON.parse(r.value) : null;
    }
  } catch {}
  try {
    const v = localStorage.getItem("gf_" + key);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}

// Load a value once on mount; writes handled manually for full control.
function usePersisted(key, defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    storageGet(key).then(v => {
      if (v !== null) setValue(v);
      setLoaded(true);
    });
  }, [key]);
  const set = useCallback((updater) => {
    setValue(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      storageSet(key, next);
      return next;
    });
  }, [key]);
  return [value, set, loaded];
}

// ─── STATS SCREEN ─────────────────────────────────────────────────────────────
// stats shape: { [exerciseId]: { name, icon, totalSec, sessions } }

function StatsScreen({ stats, exercises, onClear }) {
  const T = useT();
  const lang = useLang();
  const [confirmClear, setConfirmClear] = useState(false);
  const entries = Object.values(stats)
    .filter(s => s.totalSec > 0)
    .sort((a, b) => b.totalSec - a.totalSec);

  const maxSec = entries[0]?.totalSec || 1;

  function fmtSec(s) {
    if (s < 60) return `${s}s`;
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m ${s % 60}s`;
  }

  if (entries.length === 0) return (
    <div style={{ textAlign: "center", padding: "60px 24px", color: "#3A3A3A" }}>
      <div style={{ fontSize: 46, marginBottom: 12 }}>📊</div>
      <div style={{ fontSize: 14, lineHeight: 1.6 }}>
        {T("statsEmpty")}<br />{T("statsEmptySub")}
      </div>
    </div>
  );

  const totalSessionSec = entries.reduce((s, e) => s + e.totalSec, 0);
  const totalSessions   = Math.max(...entries.map(e => e.sessions));

  return (
    <div style={{ padding: "12px 16px 40px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", maxHeight: "calc(100dvh - 110px)" }}>
      {/* Summary row */}
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { label: T("statsTitle"), value: fmtSec(totalSessionSec) },
          { label: T("statsDone"), value: entries.length },
          { label: T("statsSessions"), value: totalSessions },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: "#151208", border: "1px solid #2A1E08", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#C8873A", fontFamily: "monospace" }}>{s.value}</div>
            <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4A4A5A", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Per-exercise bars */}
      <div style={{ background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid #1A1A1A" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#4A4A5A" }}>{T("statsMostPractised")}</span>
        </div>
        {entries.map((e, i) => (
          <div key={e.exerciseId || i} style={{ padding: "10px 14px", borderBottom: "1px solid #111" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{e.icon}</span>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "#F5EDD6", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{exerciseName(e, lang)}</span>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#C8873A", flexShrink: 0 }}>{fmtSec(e.totalSec)}</span>
            </div>
            <div style={{ height: 4, background: "#1A1A1A", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.round((e.totalSec / maxSec) * 100)}%`, background: i === 0 ? "linear-gradient(90deg,#6B3A0A,#C8873A)" : "linear-gradient(90deg,#2A2A3A,#4A4A6A)", borderRadius: 2, transition: "width 0.6s ease-out" }} />
            </div>
            <div style={{ fontSize: 10, color: "#4A4A5A", marginTop: 4 }}>{T("sessionsCount", e.sessions)}</div>
          </div>
        ))}
      </div>

      {!confirmClear ? (
        <button
          onClick={() => setConfirmClear(true)}
          style={{ background: "none", border: "1px solid #3A1A1A", borderRadius: 8, padding: "9px", color: "#F87171", fontSize: 12, cursor: "pointer", textAlign: "center" }}
        >
          {T("statsReset")}
        </button>
      ) : (
        <div style={{ background: "#1A0A0A", border: "1px solid #5A1A1A", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#F87171", marginBottom: 4 }}>{T("statsConfirmTitle")}</div>
          <div style={{ fontSize: 11, color: "#6A4A4A", marginBottom: 12 }}>{T("statsConfirmMsg")}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setConfirmClear(false)}
              style={{ flex: 1, background: "#222", border: "1px solid #333", borderRadius: 8, padding: "9px", color: "#888", fontSize: 12, cursor: "pointer" }}
            >
              {T("cancelBtn")}
            </button>
            <button
              onClick={() => { onClear(); setConfirmClear(false); }}
              style={{ flex: 1, background: "#5A0A0A", border: "1px solid #8A1A1A", borderRadius: 8, padding: "9px", color: "#F87171", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              {T("statsConfirmYes")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// ─── AUDIO ENGINE ─────────────────────────────────────────────────────────────
// Synthesise sounds via Web Audio API – no external files needed

function createAudioContext() {
  try { return new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; }
}

// Warm "ding-dong" bell for exercise complete
function playExerciseDone(ctx, masterGain) {
  if (!ctx) return;
  const dest = masterGain || ctx.destination;
  const t = ctx.currentTime;
  const freqs = [880, 660];
  freqs.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(dest);
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t + i * 0.22);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.98, t + i * 0.22 + 0.4);
    gain.gain.setValueAtTime(0, t + i * 0.22);
    gain.gain.linearRampToValueAtTime(0.7, t + i * 0.22 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.22 + 1.1);
    osc.start(t + i * 0.22);
    osc.stop(t + i * 0.22 + 1.2);
  });
}

// Fender Rhodes e-piano — Bb sus4 chord (Bb2, F3, Eb4, Bb4)
// Rhodes tone model: two detuned sine oscillators (chorus) + a bell partial
// (sine at 2x freq, decays faster) + a tremolo LFO, all through a soft limiter.
function playSessionDone(ctx, extMaster) {
  if (!ctx) return;
  const t = ctx.currentTime;

  // Bb sus4: Bb2, F3, Eb4, Bb4
  const notes = [116.54, 174.61, 311.13, 466.16];
  const masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0.7, t);
  masterGain.connect(extMaster || ctx.destination);

  // Tremolo LFO (5 Hz, depth 15%) — classic Rhodes wobble
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.setValueAtTime(5, t);
  lfoGain.gain.setValueAtTime(0.15, t);
  lfo.connect(lfoGain);
  lfo.start(t); lfo.stop(t + 4);

  notes.forEach((freq, i) => {
    const strum = i * 0.055; // slight strum delay
    const attackEnd = t + strum + 0.008;
    const decayEnd  = t + strum + 3.5;

    // ── Fundamental (two slightly detuned sines for chorus) ──
    [-0.5, 0.5].forEach(detune => {
      const osc  = ctx.createOscillator();
      const env  = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * Math.pow(2, detune / 1200), t + strum);
      // Bell-curve amplitude: fast attack, slow exponential decay
      env.gain.setValueAtTime(0, t + strum);
      env.gain.linearRampToValueAtTime(0.18, attackEnd);
      env.gain.exponentialRampToValueAtTime(0.001, decayEnd);
      // Hook up tremolo: lfoGain modulates env amplitude
      lfoGain.connect(env.gain);
      osc.connect(env);
      env.connect(masterGain);
      osc.start(t + strum); osc.stop(decayEnd + 0.05);
    });

    // ── Bell partial (2nd harmonic, decays 3× faster — gives Rhodes "clank") ──
    const bell     = ctx.createOscillator();
    const bellEnv  = ctx.createGain();
    bell.type = "sine";
    bell.frequency.setValueAtTime(freq * 2, t + strum);
    bellEnv.gain.setValueAtTime(0, t + strum);
    bellEnv.gain.linearRampToValueAtTime(0.07, attackEnd);
    bellEnv.gain.exponentialRampToValueAtTime(0.001, t + strum + 0.9);
    bell.connect(bellEnv);
    bellEnv.connect(masterGain);
    bell.start(t + strum); bell.stop(t + strum + 1);
  });
}


// ─── METRONOME ────────────────────────────────────────────────────────────────
// Schedules click sounds using Web Audio API lookahead scheduling.
// First beat of each bar = high click (1200 Hz), others = low click (600 Hz).
// Returns a stop() function.

function startMetronome(ctx, masterGain, bpm, beatsPerBar, onBeat) {
  if (!ctx) return () => {};
  const dest       = masterGain || ctx.destination;
  const interval   = 60 / bpm;       // seconds per beat
  const lookahead  = 0.1;            // schedule this far ahead (seconds)
  const scheduleAhead = 0.2;         // schedule window size (seconds)

  let nextBeatTime = ctx.currentTime + 0.05;
  let beat         = 0;
  let stopped      = false;

  function scheduleClick(time, isFirst) {
    const freq    = isFirst ? 1200 : 600;
    const gainVal = isFirst ? 0.5  : 0.3;
    const dur     = 0.03;

    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(gain); gain.connect(dest);
    osc.start(time); osc.stop(time + dur + 0.01);
  }

  function scheduler() {
    if (stopped) return;
    while (nextBeatTime < ctx.currentTime + scheduleAhead) {
      scheduleClick(nextBeatTime, beat % beatsPerBar === 0);
      if (onBeat) onBeat(beat % beatsPerBar);
      beat++;
      nextBeatTime += interval;
    }
    setTimeout(scheduler, lookahead * 1000);
  }

  scheduler();
  return () => { stopped = true; };
}

// ─── DEFAULT DATA ─────────────────────────────────────────────────────────────

const DEFAULT_CATEGORIES = [
  { id: "cat-warmup",   name: "Warm-Up",      color: "#C8873A" },
  { id: "cat-scales",   name: "Scales",        color: "#4FC3F7" },
  { id: "cat-chords",   name: "Chords",        color: "#A78BFA" },
  { id: "cat-tech",     name: "Technique",     color: "#F87171" },
  { id: "cat-improv",   name: "Improv",        color: "#34D399" },
  { id: "cat-song",     name: "Song Work",     color: "#FBBF24" },
  { id: "cat-ear",      name: "Ear Training",  color: "#FB923C" },
];

// ─── SUB-EXERCISES ────────────────────────────────────────────────────────────
// Any exercise can be broken down into checkable sub-exercises (see ExerciseEditor
// and ActiveSessionScreen). Scale exercises ship with a standard practice
// checklist: ascending/descending through each interval up to a 9th, plus
// note-groupings from 3 to 7 notes.
const INTERVAL_NAMES = {
  en: { 2: "2nds", 3: "3rds", 4: "4ths", 5: "5ths", 6: "6ths", 7: "7ths", 8: "octaves", 9: "9ths" },
  fr: { 2: "secondes", 3: "tierces", 4: "quartes", 5: "quintes", 6: "sixtes", 7: "septièmes", 8: "octaves", 9: "neuvièmes" },
};
const SUBEXERCISE_I18N = {};
[2, 3, 4, 5, 6, 7, 8, 9].forEach(n => {
  SUBEXERCISE_I18N[`sub-${n}-up`]   = { en: `Ascending in ${INTERVAL_NAMES.en[n]}`,  fr: `Montée en ${INTERVAL_NAMES.fr[n]}` };
  SUBEXERCISE_I18N[`sub-${n}-down`] = { en: `Descending in ${INTERVAL_NAMES.en[n]}`, fr: `Descente en ${INTERVAL_NAMES.fr[n]}` };
});
[3, 4, 5, 6, 7].forEach(n => {
  SUBEXERCISE_I18N[`sub-grp${n}-up`]   = { en: `Group of ${n} ascending`,  fr: `Groupe de ${n} montant` };
  SUBEXERCISE_I18N[`sub-grp${n}-down`] = { en: `Group of ${n} descending`, fr: `Groupe de ${n} descendant` };
});
// Stored labels are always the English default text (matching how exercise
// name/description defaults work) — subExerciseLabel() below translates them.
function makeScaleSubExercises() {
  return Object.keys(SUBEXERCISE_I18N).map(id => ({ id, label: SUBEXERCISE_I18N[id].en }));
}

const DEFAULT_EXERCISES = [
  { id: "warm1", categoryId: "cat-warmup", name: "Finger Stretches",        defaultMin: 3,  icon: "✋", description: "Gently stretch each finger to prevent injuries." },
  { id: "warm2", categoryId: "cat-warmup", name: "Chromatic Crawl",          defaultMin: 5,  icon: "🐛", description: "Play 1-2-3-4 across all strings, ascending and descending." },
  { id: "warm3", categoryId: "cat-warmup", name: "Spider Exercise",           defaultMin: 5,  icon: "🕷️", description: "Cross-string pattern to build independence." },
  { id: "scale1", categoryId: "cat-scales", name: "Pentatonic (A minor)",    defaultMin: 10, icon: "🎵", description: "Run the Am pentatonic in all 5 positions.", subExercises: makeScaleSubExercises() },
  { id: "scale2", categoryId: "cat-scales", name: "Major Scale Modes",       defaultMin: 10, icon: "🎶", description: "Practice Ionian, Dorian, Phrygian across the neck.", subExercises: makeScaleSubExercises() },
  { id: "scale3", categoryId: "cat-scales", name: "Blues Scale",             defaultMin: 8,  icon: "🎸", description: "Add the b5 note to your pentatonic for bluesy feel.", subExercises: makeScaleSubExercises() },
  { id: "chord1", categoryId: "cat-chords", name: "Barre Chord Transitions", defaultMin: 10, icon: "🤘", description: "Switch between F, B, and Bm shapes fluidly." },
  { id: "chord2", categoryId: "cat-chords", name: "Open Chord Shapes",       defaultMin: 7,  icon: "🔵", description: "Clean up G, C, D, Em, Am transitions." },
  { id: "chord3", categoryId: "cat-chords", name: "Jazz Voicings",           defaultMin: 12, icon: "🎷", description: "Learn ii-V-I progressions with 7th chord voicings." },
  { id: "riff1", categoryId: "cat-tech",   name: "Alternate Picking",        defaultMin: 10, icon: "⚡", description: "Strict down-up picking at various tempos with metronome." },
  { id: "riff2", categoryId: "cat-tech",   name: "Legato & Hammer-Ons",      defaultMin: 8,  icon: "🔨", description: "Build smooth phrasing with hammer-ons and pull-offs." },
  { id: "riff3", categoryId: "cat-tech",   name: "Bending & Vibrato",        defaultMin: 8,  icon: "〰️", description: "Accurate bends to pitch, controlled vibrato width and speed." },
  { id: "riff4", categoryId: "cat-tech",   name: "Palm Muting",              defaultMin: 7,  icon: "🤚", description: "Control the mute tightness across different rhythms." },
  { id: "improv1", categoryId: "cat-improv", name: "Jam over Backing Track", defaultMin: 15, icon: "🎤", description: "Free improvisation over a chosen key backing track." },
  { id: "improv2", categoryId: "cat-improv", name: "Solo Construction",      defaultMin: 12, icon: "🌟", description: "Build a solo with motif, development, and climax." },
  { id: "song1", categoryId: "cat-song",   name: "Riff Memorization",        defaultMin: 15, icon: "📝", description: "Learn a new riff from memory, no tabs." },
  { id: "song2", categoryId: "cat-song",   name: "Full Run-Through",         defaultMin: 20, icon: "▶️", description: "Play the song top to bottom without stopping." },
  { id: "ear1",  categoryId: "cat-ear",    name: "Interval Recognition",     defaultMin: 10, icon: "👂", description: "Identify intervals by ear, then find them on the neck." },
];

// FR/EN translations for the built-in categories and exercises above, keyed by id.
// User-created (custom) exercises/categories have no entry here, so exerciseName()/
// exerciseDesc()/categoryName() fall back to the literal stored name/description.
const CATEGORY_I18N = {
  "cat-warmup": { en: "Warm-Up",     fr: "Échauffement" },
  "cat-scales": { en: "Scales",      fr: "Gammes" },
  "cat-chords": { en: "Chords",      fr: "Accords" },
  "cat-tech":   { en: "Technique",   fr: "Technique" },
  "cat-improv": { en: "Improv",      fr: "Improvisation" },
  "cat-song":   { en: "Song Work",   fr: "Travail sur morceau" },
  "cat-ear":    { en: "Ear Training", fr: "Oreille musicale" },
};

const EXERCISE_I18N = {
  warm1:   { en: { name: "Finger Stretches",         description: "Gently stretch each finger to prevent injuries." },
             fr: { name: "Étirements des doigts",      description: "Étirez doucement chaque doigt pour éviter les blessures." } },
  warm2:   { en: { name: "Chromatic Crawl",           description: "Play 1-2-3-4 across all strings, ascending and descending." },
             fr: { name: "Gamme chromatique",          description: "Jouez 1-2-3-4 sur toutes les cordes, en montant et en descendant." } },
  warm3:   { en: { name: "Spider Exercise",           description: "Cross-string pattern to build independence." },
             fr: { name: "Exercice de l'araignée",     description: "Motif croisé entre les cordes pour développer l'indépendance des doigts." } },
  scale1:  { en: { name: "Pentatonic (A minor)",      description: "Run the Am pentatonic in all 5 positions." },
             fr: { name: "Pentatonique (La mineur)",   description: "Parcourez la gamme pentatonique de La mineur dans les 5 positions." } },
  scale2:  { en: { name: "Major Scale Modes",         description: "Practice Ionian, Dorian, Phrygian across the neck." },
             fr: { name: "Modes de la gamme majeure",  description: "Travaillez les modes ionien, dorien et phrygien sur tout le manche." } },
  scale3:  { en: { name: "Blues Scale",               description: "Add the b5 note to your pentatonic for bluesy feel." },
             fr: { name: "Gamme blues",                description: "Ajoutez la quinte diminuée à votre pentatonique pour une couleur blues." } },
  chord1:  { en: { name: "Barre Chord Transitions",   description: "Switch between F, B, and Bm shapes fluidly." },
             fr: { name: "Transitions d'accords barrés", description: "Enchaînez fluidement les accords Fa, Si et Si mineur en barré." } },
  chord2:  { en: { name: "Open Chord Shapes",         description: "Clean up G, C, D, Em, Am transitions." },
             fr: { name: "Accords ouverts",            description: "Nettoyez les transitions entre Sol, Do, Ré, Mi mineur et La mineur." } },
  chord3:  { en: { name: "Jazz Voicings",             description: "Learn ii-V-I progressions with 7th chord voicings." },
             fr: { name: "Voicings jazz",              description: "Apprenez les progressions ii-V-I avec des voicings d'accords de septième." } },
  riff1:   { en: { name: "Alternate Picking",         description: "Strict down-up picking at various tempos with metronome." },
             fr: { name: "Aller-retour (alternate picking)", description: "Médiator strict aller-retour à différents tempos avec métronome." } },
  riff2:   { en: { name: "Legato & Hammer-Ons",       description: "Build smooth phrasing with hammer-ons and pull-offs." },
             fr: { name: "Legato et hammer-ons",       description: "Construisez un phrasé fluide avec des hammer-ons et pull-offs." } },
  riff3:   { en: { name: "Bending & Vibrato",         description: "Accurate bends to pitch, controlled vibrato width and speed." },
             fr: { name: "Bends et vibrato",           description: "Bends précis en hauteur, vibrato à amplitude et vitesse contrôlées." } },
  riff4:   { en: { name: "Palm Muting",               description: "Control the mute tightness across different rhythms." },
             fr: { name: "Palm muting",                description: "Contrôlez l'intensité de l'étouffement sur différents rythmes." } },
  improv1: { en: { name: "Jam over Backing Track",    description: "Free improvisation over a chosen key backing track." },
             fr: { name: "Improviser sur un backing track", description: "Improvisation libre sur un backing track dans une tonalité choisie." } },
  improv2: { en: { name: "Solo Construction",         description: "Build a solo with motif, development, and climax." },
             fr: { name: "Construction de solo",       description: "Construisez un solo avec motif, développement et point culminant." } },
  song1:   { en: { name: "Riff Memorization",         description: "Learn a new riff from memory, no tabs." },
             fr: { name: "Mémorisation d'un riff",     description: "Apprenez un nouveau riff de mémoire, sans tablature." } },
  song2:   { en: { name: "Full Run-Through",          description: "Play the song top to bottom without stopping." },
             fr: { name: "Morceau en entier",          description: "Jouez le morceau du début à la fin sans vous arrêter." } },
  ear1:    { en: { name: "Interval Recognition",      description: "Identify intervals by ear, then find them on the neck." },
             fr: { name: "Reconnaissance d'intervalles", description: "Identifiez les intervalles à l'oreille, puis retrouvez-les sur le manche." } },
};

// Look up the translated name/description for a built-in exercise (by id or exerciseId).
// Only applied while the stored text still matches the original English default —
// if the user has renamed/edited it, their text is kept as-is in any language.
// Custom user-created exercises have no i18n entry and always fall back to stored text.
function exerciseName(ex, lang) {
  if (!ex) return "";
  const id = ex.exerciseId || ex.id;
  const i18n = EXERCISE_I18N[id];
  if (i18n && ex.name === i18n.en.name) return i18n[lang]?.name ?? ex.name;
  return ex.name;
}
function exerciseDesc(ex, lang) {
  if (!ex) return "";
  const id = ex.exerciseId || ex.id;
  const i18n = EXERCISE_I18N[id];
  if (i18n && ex.description === i18n.en.description) return i18n[lang]?.description ?? ex.description;
  return ex.description;
}
function categoryName(cat, lang) {
  if (!cat) return "";
  const i18n = CATEGORY_I18N[cat.id];
  if (i18n && cat.name === i18n.en) return i18n[lang] ?? cat.name;
  return cat.name;
}
function subExerciseLabel(sub, lang) {
  if (!sub) return "";
  const i18n = SUBEXERCISE_I18N[sub.id];
  if (i18n && sub.label === i18n.en) return i18n[lang] ?? sub.label;
  return sub.label;
}

const ICONS =["🎸","🎵","🎶","🎤","🎷","🎺","🥁","🎹","⚡","🔥","🌟","💥","🤘","✋","🕷️","🐛","🔨","〰️","🤚","🔵","📝","▶️","👂","🏆","🎯","⚙️","🧠","💡","🎯","🎼"];

function formatTime(s) { const m = Math.floor(s/60); return `${String(m).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`; }
function formatTotalMin(s) { const h = Math.floor(s/3600); const m = Math.floor((s%3600)/60); return h > 0 ? `${h}h ${m}m` : `${m} min`; }
function uid() { return `id-${Date.now()}-${Math.random().toString(36).slice(2,7)}`; }

// Extract YouTube video ID from any common URL format
function extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?.*v=)([A-Za-z0-9_-]{11})/,
    /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const C = { bg: "#0F0F0F", surface: "#151515", border: "#1E1E1E", amber: "#C8873A", amberDim: "#6B3A0A", cream: "#F5EDD6", muted: "#4A4A5A", navInactive: "#8D8D9C", faint: "#1A1A1A" };

// Display size setting: a single CSS `zoom` factor scales the whole app
// (text, icons, spacing) uniformly without touching every font-size value.
const DISPLAY_ZOOM = { small: 0.95, medium: 1.15, large: 1.35 };

const base = {
  app: { background: C.bg, minHeight: "100dvh", maxWidth: 430, margin: "0 auto", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.cream, position: "relative" },
  header: { background: "linear-gradient(180deg,#1A1208 0%,#0F0F0F 100%)", padding: "16px 20px 12px", borderBottom: "1px solid #2A2008", display: "flex", alignItems: "center", justifyContent: "space-between" },
  headerLeft: { display: "flex", flexDirection: "column", gap: 2 },
  headerTitle: { fontSize: 17, fontWeight: 700, color: C.amber, letterSpacing: "0.04em", textTransform: "uppercase", margin: 0 },
  headerSub: { fontSize: 10, color: "#6B5A3A", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 },
  iconBtn: (col) => ({ background: "none", border: "none", color: col || C.muted, fontSize: 18, cursor: "pointer", padding: "4px 6px", borderRadius: 6, display: "flex", alignItems: "center" }),
  navBar: { display: "flex", background: "#0A0A0A", borderBottom: `1px solid ${C.border}` },
  navBtn: (a) => ({ flex: 1, padding: "11px 6px", background: "none", border: "none", borderBottom: a ? `2px solid ${C.amber}` : "2px solid transparent", color: a ? C.amber : C.navInactive, fontSize: 10, fontWeight: a ? 700 : 500, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }),
  scrollArea: (pb) => ({ padding: `8px 16px ${pb||100}px`, display: "flex", flexDirection: "column", gap: 8, overflowY: "auto", maxHeight: "calc(100dvh - 175px)" }),
  catChip: (a, col) => ({ padding: "5px 13px", borderRadius: 20, border: `1px solid ${a ? col : "#2A2A2A"}`, background: a ? col+"22" : "transparent", color: a ? col : "#888", fontSize: 12, fontWeight: a ? 600 : 400, cursor: "pointer", whiteSpace: "nowrap" }),
  exCard: (col) => ({ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${col}`, borderRadius: 10, padding: "11px 13px", display: "flex", alignItems: "center", gap: 11, cursor: "pointer", userSelect: "none" }),
  pillBtn: (primary) => ({ padding: primary ? "13px" : "10px 16px", borderRadius: 10, border: primary ? "none" : `1px solid #2A2A2A`, background: primary ? `linear-gradient(135deg,${C.amber},#A86020)` : C.surface, color: primary ? "#0F0F0F" : "#888", fontSize: primary ? 14 : 12, fontWeight: primary ? 800 : 500, cursor: "pointer", letterSpacing: "0.06em", width: primary ? "100%" : "auto" }),
  input: { background: "#1A1A1A", border: `1px solid #2A2A2A`, borderRadius: 8, padding: "9px 12px", color: C.cream, fontSize: 13, width: "100%", boxSizing: "border-box", outline: "none", fontFamily: "inherit" },
  label: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: 5, display: "block" },
  sectionTitle: { fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted, padding: "16px 16px 6px", borderTop: `1px solid ${C.faint}` },
  card: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" },
  row: { display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", borderBottom: `1px solid ${C.faint}` },
};

// ─── EXERCISE COMPLETE FLASH ──────────────────────────────────────────────────

function FlashOverlay({ show, color }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999,
      background: color || "#C8873A", opacity: show ? 0.22 : 0,
      transition: show ? "opacity 0.05s" : "opacity 0.6s ease-out" }} />
  );
}

// ─── YOUTUBE PLAYER ──────────────────────────────────────────────────────────

function YouTubeCard({ videoId }) {
  const T = useT();
  if (!videoId) return null;
  const thumb = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  const url   = `https://www.youtube.com/watch?v=${videoId}`;
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #2A1E08", background: "#0A0800" }}>
      <a href={url} target="_blank" rel="noopener noreferrer"
         style={{ display: "block", position: "relative", textDecoration: "none" }}>
        <img
          src={thumb}
          alt="Reference video"
          style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover", filter: "brightness(0.65)" }}
          onError={e => { e.target.style.minHeight = "120px"; e.target.style.background = "#1A1208"; }}
        />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#FF0000ee", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 24px #000a" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="white"><polygon points="7,3 19,11 7,19"/></svg>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px 8px", background: "linear-gradient(0deg,#000e 0%,transparent 100%)", display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", flex: 1 }}>{T("refVideo")}</span>
          <span style={{ fontSize: 10, color: "#ffffff99" }}>{T("opensYoutube")}</span>
        </div>
      </a>
    </div>
  );
}

// ─── SESSION COMPLETE ANIMATION ───────────────────────────────────────────────

function Spark({ x, y, color, delay }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 6, height: 6,
      borderRadius: "50%", background: color, pointerEvents: "none",
      animation: `spark ${0.9 + Math.random() * 0.4}s ease-out ${delay}s forwards` }} />
  );
}

function Fireworks({ active }) {
  const sparks = useRef([]);
  if (sparks.current.length === 0) {
    const cols = [C.amber, "#F87171", "#4FC3F7", "#34D399", "#FBBF24", "#A78BFA", "#FB923C"];
    for (let i = 0; i < 60; i++) {
      sparks.current.push({ id: i, x: `${10 + Math.random() * 80}%`, y: `${5 + Math.random() * 70}%`, color: cols[i % cols.length], delay: Math.random() * 1.2 });
    }
  }
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100 }}>
      <style>{`
        @keyframes spark {
          0%   { transform: scale(0) translate(0,0); opacity: 1; }
          60%  { opacity: 1; }
          100% { transform: scale(1) translate(var(--tx,${Math.random()*80-40}px), var(--ty,${Math.random()*80+20}px)); opacity: 0; }
        }
        @keyframes pulseAmber {
          0%,100% { box-shadow: 0 0 0 0 #C8873A44; }
          50%      { box-shadow: 0 0 0 24px #C8873A00; }
        }
      `}</style>
      {sparks.current.map(s => <Spark key={s.id} {...s} />)}
    </div>
  );
}

// ─── LIBRARY SCREEN ───────────────────────────────────────────────────────────

function LibraryScreen({ exercises, categories, tasks, onAdd, stats, subProgress }) {
  const T = useT();
  const lang = useLang();
  const [catId, setCatId] = useState("all");
  const catColor = (id) => categories.find(c => c.id === id)?.color || C.amber;
  const filtered = catId === "all" ? exercises : exercises.filter(e => e.categoryId === catId);
  const inSession = new Set(tasks.map(t => t.exerciseId));

  // Build a stable ordered pool of up to 6 candidates (memo ignores tasks/inSession).
  // At render time we filter out already-queued items and show the first 3 remaining —
  // so adding an item removes it from the box and the next candidate slides in,
  // without any reshuffling.
  const exerciseKey = exercises.map(e => e.id).join(",");
  const statsKey    = exercises.map(e => stats[e.id]?.totalSec || 0).join(",");

  const candidatePool = useMemo(() => {
    const unpractised = exercises.filter(ex => !stats[ex.id] || stats[ex.id].totalSec === 0);
    const practised   = exercises
      .filter(ex => stats[ex.id] && stats[ex.id].totalSec > 0)
      .sort((a, b) => stats[a.id].totalSec - stats[b.id].totalSec);
    let pool;
    if (unpractised.length >= 6) {
      pool = [...unpractised].sort(() => Math.random() - 0.5).slice(0, 6);
    } else {
      pool = [...unpractised, ...practised].slice(0, 6);
    }
    // Sort pool: unpractised (0s) first, then ascending practice time
    return pool.sort((a, b) => (stats[a.id]?.totalSec || 0) - (stats[b.id]?.totalSec || 0));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseKey, statsKey]);

  // Visible suggestions = first 3 from the pool that aren't already in the session queue
  const suggestions = candidatePool.filter(ex => !inSession.has(ex.id)).slice(0, 3);


  function fmtSuggestTime(ex) {
    const s = stats[ex.id]?.totalSec || 0;
    if (s === 0) return T("neverPractised");
    const m = Math.floor(s / 60);
    return m < 60 ? `${m}${T("mPractised")}` : `${Math.floor(m/60)}${T("hPractised")} ${m%60}${T("mPractised")}`;
  }

  return (
    <>
      <div style={{ display: "flex", gap: 8, padding: "10px 16px", overflowX: "auto", scrollbarWidth: "none", borderBottom: `1px solid ${C.faint}` }}>
        <button style={base.catChip(catId === "all", C.amber)} onClick={() => setCatId("all")}>{T("allCat")}</button>
        {categories.map(c => (
          <button key={c.id} style={base.catChip(catId === c.id, c.color)} onClick={() => setCatId(c.id)}>{categoryName(c, lang)}</button>
        ))}
      </div>
      <div style={base.scrollArea(24)}>
        {/* Suggestions box — always shown at top */}
        {suggestions.length > 0 && (
          <div style={{ background: "linear-gradient(135deg,#1A1208 0%,#0F1A0F 100%)", border: "1px solid #2A2008", borderRadius: 12, padding: "12px 14px", marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <span style={{ fontSize: 13 }}>🎯</span>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: C.amber }}>{T("needsPractice")}</span>
              <span style={{ fontSize: 10, color: C.muted }}>{T("leastWorkedOn")}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {suggestions.map((ex, rank) => {
                const cat = categories.find(c => c.id === ex.categoryId);
                const col = cat?.color || "#888";
                const added = inSession.has(ex.id);
                return (
                  <div key={ex.id}
                    onClick={() => !added && onAdd(ex)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                      background: added ? "#111" : "#0F0F0F", borderRadius: 8,
                      border: `1px solid ${rank === 0 ? C.amber + "44" : "#222"}`,
                      cursor: added ? "default" : "pointer", opacity: added ? 0.5 : 1 }}>
                    {/* Rank badge */}
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: rank === 0 ? "#C8873A44" : "#1A1A1A",
                      border: `1px solid ${rank === 0 ? C.amber : "#333"}`,
                      color: rank === 0 ? C.amber : C.muted,
                      fontSize: 9, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {rank + 1}
                    </div>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{ex.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: C.cream, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{exerciseName(ex, lang)}</div>
                      <div style={{ fontSize: 10, color: col, marginTop: 1, fontWeight: 600 }}>{categoryName(cat, lang)} · <span style={{ color: "#4A5A4A", fontWeight: 400 }}>{fmtSuggestTime(ex)}</span></div>
                    </div>
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: added ? "transparent" : "#C8873A22",
                      border: `1px solid ${added ? "#2A2A2A" : C.amber}`, color: added ? C.muted : C.amber,
                      fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {added ? "✓" : "+"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {(() => {
          if (filtered.length === 0) return (
            <div style={{ textAlign: "center", padding: "40px 20px", color: C.muted, fontSize: 13 }}>{T("noExercisesInCategory")}</div>
          );
          // When "All" is selected, group by category with section headers
          if (catId === "all") {
            const groups = [];
            let lastCatId = null;
            filtered.forEach(ex => {
              if (ex.categoryId !== lastCatId) {
                groups.push({ type: "header", cat: categories.find(c => c.id === ex.categoryId) });
                lastCatId = ex.categoryId;
              }
              groups.push({ type: "ex", ex });
            });
            return groups.map((item, idx) => {
              if (item.type === "header") {
                const cat = item.cat;
                return (
                  <div key={"h-" + (cat?.id || idx)} style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: idx === 0 ? 4 : 12, paddingBottom: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: cat?.color || "#888", flexShrink: 0 }} />
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: cat?.color || "#888" }}>{cat ? categoryName(cat, lang) : T("unknownCategory")}</span>
                    <div style={{ flex: 1, height: 1, background: (cat?.color || "#888") + "33" }} />
                  </div>
                );
              }
              const ex = item.ex;
              const cat = categories.find(c => c.id === ex.categoryId);
              const col = cat?.color || "#888";
              const added = inSession.has(ex.id);
              return (
                <div key={ex.id} style={{ ...base.exCard(col), opacity: added ? 0.5 : 1 }} onClick={() => !added && onAdd(ex)}>
                  <span style={{ fontSize: 20, width: 28, textAlign: "center", flexShrink: 0 }}>{ex.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.cream }}>{exerciseName(ex, lang)}</div>
                    {ex.description && <div style={{ fontSize: 11, color: C.muted, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{exerciseDesc(ex, lang)}</div>}
                  </div>
                  {ex.subExercises?.length > 0 && (
                    <span style={{ fontSize: 10, color: "#34D399", background: "#34D39922", border: "1px solid #34D39944", borderRadius: 5, padding: "2px 6px", flexShrink: 0, marginRight: 4, fontWeight: 700 }}>
                      {(subProgress[ex.id] || []).length}/{ex.subExercises.length}
                    </span>
                  )}
                  <span style={{ fontSize: 11, color: C.muted, flexShrink: 0, marginRight: 4 }}>{ex.defaultMin}m</span>
                  {ex.youtubeUrl && extractYouTubeId(ex.youtubeUrl) && (
                    <span style={{ fontSize: 10, background: "#FF000033", border: "1px solid #FF000066", color: "#FF6666", borderRadius: 4, padding: "2px 5px", flexShrink: 0, marginRight: 4, fontWeight: 700 }}>▶</span>
                  )}
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#C8873A22", border: `1px solid ${C.amber}`, color: C.amber, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: added ? 0 : 1, pointerEvents: added ? "none" : "auto" }}>+</div>
                </div>
              );
            });
          }
          // Single category — flat list (category already obvious from filter)
          return filtered.map(ex => {
            const cat = categories.find(c => c.id === ex.categoryId);
            const col = cat?.color || "#888";
            const added = inSession.has(ex.id);
            return (
              <div key={ex.id} style={{ ...base.exCard(col), opacity: added ? 0.5 : 1 }} onClick={() => !added && onAdd(ex)}>
                <span style={{ fontSize: 20, width: 28, textAlign: "center", flexShrink: 0 }}>{ex.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.cream }}>{exerciseName(ex, lang)}</div>
                  {ex.description && <div style={{ fontSize: 11, color: C.muted, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{exerciseDesc(ex, lang)}</div>}
                </div>
                {ex.subExercises?.length > 0 && (
                  <span style={{ fontSize: 10, color: "#34D399", background: "#34D39922", border: "1px solid #34D39944", borderRadius: 5, padding: "2px 6px", flexShrink: 0, marginRight: 4, fontWeight: 700 }}>
                    {(subProgress[ex.id] || []).length}/{ex.subExercises.length}
                  </span>
                )}
                <span style={{ fontSize: 11, color: C.muted, flexShrink: 0, marginRight: 4 }}>{ex.defaultMin}m</span>
                {ex.youtubeUrl && extractYouTubeId(ex.youtubeUrl) && (
                  <span style={{ fontSize: 10, background: "#FF000033", border: "1px solid #FF000066", color: "#FF6666", borderRadius: 4, padding: "2px 5px", flexShrink: 0, marginRight: 4, fontWeight: 700 }}>▶</span>
                )}
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#C8873A22", border: `1px solid ${C.amber}`, color: C.amber, fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: added ? 0 : 1, pointerEvents: added ? "none" : "auto" }}>+</div>
              </div>
            );
          });
        })()}
      </div>
    </>
  );
}

// ─── PRESETS SCREEN ───────────────────────────────────────────────────────────

function PresetsScreen({ presets, setPresets, tasks, setTasks, onLoadGoToSession }) {
  const T = useT();
  const lang = useLang();
  const [saveName, setSaveName] = useState("");
  const [saveOpen, setSaveOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const savePreset = () => {
    if (!saveName.trim() || tasks.length === 0) return;
    const preset = { id: uid(), name: saveName.trim(), tasks: tasks.map(t => ({ ...t })), createdAt: Date.now() };
    setPresets(prev => [preset, ...prev]);
    setSaveName(""); setSaveOpen(false);
  };

  const loadPreset = (preset) => {
    setTasks(preset.tasks.map(t => ({ ...t, id: uid() })));
    onLoadGoToSession();
  };

  const deletePreset = (id) => { setPresets(prev => prev.filter(p => p.id !== id)); setDeleteId(null); };

  return (
    <div style={base.scrollArea(24)}>
      {/* Save current queue as preset */}
      {!saveOpen ? (
        <button
          style={{ ...base.pillBtn(false), width: "100%", textAlign: "center", padding: "12px",
            color: tasks.length > 0 ? C.amber : C.muted,
            border: `1px solid ${tasks.length > 0 ? C.amber + "55" : "#222"}`,
            cursor: tasks.length > 0 ? "pointer" : "default" }}
          onClick={() => tasks.length > 0 && setSaveOpen(true)}
          title={tasks.length === 0 ? T("addExercisesFirst") : ""}
        >
          {T("saveCurrentPreset")}{tasks.length === 0 ? T("saveCurrentEmpty") : ""}
        </button>
      ) : (
        <div style={{ background: "#151208", border: "1px solid #2A1E08", borderRadius: 10, padding: "14px" }}>
          <label style={base.label}>{T("presetName")}</label>
          <input
            style={{ ...base.input, marginBottom: 10 }} autoFocus
            value={saveName} onChange={e => setSaveName(e.target.value)}
            placeholder={T("presetPlaceholder")}
            autoComplete="off" autoCorrect="off" spellCheck={false}
            onKeyDown={e => { if (e.key === "Enter") savePreset(); if (e.key === "Escape") setSaveOpen(false); }}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ ...base.pillBtn(false), flex: 1, textAlign: "center" }} onClick={() => setSaveOpen(false)}>{T("cancelBtn")}</button>
            <button style={{ ...base.pillBtn(true), flex: 2 }} onClick={savePreset}>{T("saveBtn")}</button>
          </div>
        </div>
      )}

      {presets.length === 0 && (
        <div style={{ textAlign: "center", padding: "44px 20px", color: "#3A3A3A" }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>📋</div>
          <div style={{ fontSize: 13, lineHeight: 1.7 }}>{T("noPresetsTitle")}<br />{T("noPresetsSub")}</div>
        </div>
      )}

      {presets.map(p => {
        const totalMin = p.tasks.reduce((s, t) => s + (t.minutes || 0), 0);
        const isDeleting = deleteId === p.id;
        return (
          <div key={p.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.cream }}>{p.name}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{T("exercisesCount", p.tasks.length)} · {totalMin}m</div>
              </div>
              {!isDeleting ? (
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => loadPreset(p)} style={{ padding: "6px 12px", background: "#C8873A22", border: `1px solid ${C.amber}55`, borderRadius: 7, color: C.amber, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                    {T("loadBtn")}
                  </button>
                  <button onClick={() => setDeleteId(p.id)} style={{ width: 28, height: 28, borderRadius: 7, background: "none", border: "1px solid #2A2A2A", color: C.muted, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => setDeleteId(null)} style={{ padding: "5px 10px", background: "#222", border: "1px solid #333", borderRadius: 7, color: "#888", fontSize: 11, cursor: "pointer" }}>{T("keepBtn")}</button>
                  <button onClick={() => deletePreset(p.id)} style={{ padding: "5px 10px", background: "#3A0A0A", border: "1px solid #6A1A1A", borderRadius: 7, color: "#F87171", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{T("deleteBtn")}</button>
                </div>
              )}
            </div>
            <div style={{ padding: "6px 14px 10px", display: "flex", flexWrap: "wrap", gap: 5 }}>
              {p.tasks.map((t, i) => (
                <span key={i} style={{ fontSize: 10, background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 5, padding: "3px 7px", color: "#888" }}>
                  {t.icon} {exerciseName(t, lang)} · {t.minutes}m
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── SESSION SCREEN ───────────────────────────────────────────────────────────

function SessionScreen({ tasks, setTasks, onStart, sessionInProgress, onReturnToSession, presets, setPresets }) {
  const T = useT();
  const lang = useLang();
  const [saveName, setSaveName] = useState("");
  const [saveOpen, setSaveOpen] = useState(false);
  const totalSec = tasks.reduce((s, t) => s + t.minutes * 60, 0);
  const upd = (id, d) => setTasks(prev => prev.map(t => t.id === id ? { ...t, minutes: Math.max(1, t.minutes + d) } : t));
  const rm  = (id) => setTasks(prev => prev.filter(t => t.id !== id));

  // ── Drag-and-drop reordering of the session queue ──────────────────────────
  // Pointer Events (not HTML5 DnD) so this works with touch as well as mouse.
  // setPointerCapture on the handle keeps routing move/up events to it even
  // once the finger/cursor leaves the element, so no window listeners needed.
  const rowRefs = useRef({});
  const dragInfo = useRef(null); // { id, pointerId }
  const [draggingId, setDraggingId] = useState(null);

  const handleDragStart = (e, id) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragInfo.current = { id, pointerId: e.pointerId };
    setDraggingId(id);
  };
  const handleDragMove = (e) => {
    if (!dragInfo.current) return;
    const draggedId = dragInfo.current.id;
    const y = e.clientY;
    let overIdx = null;
    for (let i = 0; i < tasks.length; i++) {
      const node = rowRefs.current[tasks[i].id];
      if (!node) continue;
      const rect = node.getBoundingClientRect();
      if (y >= rect.top && y <= rect.bottom) { overIdx = i; break; }
    }
    if (overIdx === null) return;
    const draggedIdx = tasks.findIndex(t => t.id === draggedId);
    if (draggedIdx === -1 || draggedIdx === overIdx) return;
    setTasks(prev => {
      const fromIdx = prev.findIndex(t => t.id === draggedId);
      if (fromIdx === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(overIdx, 0, moved);
      return next;
    });
  };
  const handleDragEnd = () => {
    dragInfo.current = null;
    setDraggingId(null);
  };

  const savePreset = () => {
    if (!saveName.trim() || tasks.length === 0) return;
    const preset = { id: uid(), name: saveName.trim(), tasks: tasks.map(t => ({ ...t })), createdAt: Date.now() };
    setPresets(prev => [preset, ...prev]);
    setSaveName(""); setSaveOpen(false);
  };

  return (
    <>
      {tasks.length === 0 ? (
        <div style={{ textAlign: "center", padding: "52px 20px", color: "#3A3A3A" }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>🎸</div>
          <div style={{ fontSize: 13, lineHeight: 1.8 }}>
            {T("emptySession")}<br />
            {T("emptySessionSub")}
          </div>
        </div>
      ) : (
        <div style={base.scrollArea(180)}>
          {tasks.map((task, i) => (
            <div
              key={task.id}
              ref={node => { if (node) rowRefs.current[task.id] = node; else delete rowRefs.current[task.id]; }}
              style={{ background: C.surface, border: `1px solid ${draggingId === task.id ? C.amber : C.border}`, borderRadius: 10, padding: "11px 13px", display: "flex", alignItems: "center", gap: 9, opacity: draggingId === task.id ? 0.6 : 1, transition: "opacity 0.15s, border-color 0.15s" }}
            >
              <span
                onPointerDown={e => handleDragStart(e, task.id)}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
                onPointerCancel={handleDragEnd}
                style={{ fontSize: 15, flexShrink: 0, color: C.muted, cursor: "grab", touchAction: "none", padding: "4px 2px", lineHeight: 1 }}
                aria-label="drag to reorder"
              >☰</span>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#2A2A2A", color: "#6B5A3A", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{task.icon}</span>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{exerciseName(task, lang)}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <button style={{ width: 22, height: 22, borderRadius: "50%", background: "#222", border: `1px solid #333`, color: C.cream, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }} onClick={() => upd(task.id, -1)}>−</button>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: C.amber, width: 34, textAlign: "center", fontWeight: 700 }}>{task.minutes}m</span>
                <button style={{ width: 22, height: 22, borderRadius: "50%", background: "#222", border: `1px solid #333`, color: C.cream, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }} onClick={() => upd(task.id, 1)}>+</button>
              </div>
              <button style={{ width: 22, height: 22, borderRadius: "50%", background: "none", border: `1px solid #2A2A2A`, color: C.muted, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }} onClick={() => rm(task.id)}>×</button>
            </div>
          ))}
        </div>
      )}

      {/* Save-as-preset inline panel */}
      {saveOpen && (
        <div style={{ margin: "0 16px 8px", padding: "12px 14px", background: "#151208", border: "1px solid #2A1E08", borderRadius: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={base.label}>{T("savePresetTitle")}</label>
          <input style={base.input} autoFocus value={saveName} onChange={e => setSaveName(e.target.value)}
            placeholder={T("presetPlaceholder")}
            autoComplete="off" autoCorrect="off" spellCheck={false}
            onKeyDown={e => { if (e.key === "Enter") savePreset(); if (e.key === "Escape") setSaveOpen(false); }} />
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ ...base.pillBtn(false), flex: 1, textAlign: "center" }} onClick={() => setSaveOpen(false)}>{T("cancelBtn")}</button>
            <button style={{ ...base.pillBtn(true), flex: 2 }} onClick={savePreset}>{T("savePresetBtn")}</button>
          </div>
        </div>
      )}

      {/* Sticky footer */}
      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "linear-gradient(0deg,#0A0A0A 85%,transparent)", padding: "10px 16px 22px" }}>
        {tasks.length > 0 && (
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted }}>{T("totalSessionTime")}</div>
            <div style={{ fontSize: 24, fontFamily: "monospace", fontWeight: 700, color: C.amber }}>{formatTotalMin(totalSec)}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{T("exercisesCount", tasks.length)}</div>
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          {tasks.length > 0 && !saveOpen && (
            <button style={{ ...base.pillBtn(false), padding: "12px 14px", flexShrink: 0, color: C.amber, border: `1px solid ${C.amber}44` }}
              onClick={() => setSaveOpen(true)} title={T("savePresetTitle")}>💾</button>
          )}
          {sessionInProgress ? (
            <button style={{ ...base.pillBtn(true), flex: 1, background: "linear-gradient(135deg,#34D399,#059669)" }} onClick={onReturnToSession}>{T("returnToSession")}</button>
          ) : (
            <button style={{ ...base.pillBtn(true), flex: 1 }} onClick={onStart} disabled={tasks.length === 0}>{T("startSession")}</button>
          )}
        </div>
      </div>
    </>
  );
}

// ─── ACTIVE SESSION ───────────────────────────────────────────────────────────

function ActiveSessionScreen({
  tasks, setTasks, onFinish, onBackToMenu, audioCtx, masterGainRef, onCommitStats, isVisible,
  subProgress, setSubProgress,
  // lifted state
  current, setCurrent, secondsLeft, setSecondsLeft,
  running, setRunning, hasStarted, setHasStarted,
  done, setDone, elapsedRef, committedRef,
}) {
  const T = useT();
  const lang = useLang();
  const [flash, setFlash]           = useState(false);
  const [fireworks, setFireworks]   = useState(false);
  const intervalRef      = useRef(null);
  const advanceRef       = useRef(null);
  const metronomeStopRef = useRef(null);  // fn to stop current metronome
  const wakeLockRef      = useRef(null);  // Screen Wake Lock API sentinel
  const [metroOn, setMetroOn] = useState(false);
  const [liveBpm, setLiveBpm] = useState(90);
  const [liveBeatsPerBar, setLiveBeatsPerBar] = useState(4);

  // Metronome is available on every exercise, independent of the library's
  // default BPM setting. Each new exercise starts with the toggle off, seeded
  // from that exercise's configured default (or a sensible fallback).
  useEffect(() => {
    const task = tasks[current];
    setMetroOn(false);
    setLiveBpm(task?.bpm > 0 ? task.bpm : 90);
    setLiveBeatsPerBar(task?.beatsPerBar || 4);
  }, [current]);

  // ── Screen Wake Lock: keep screen on during active session ────────────────
  useEffect(() => {
    let wl = null;
    async function acquireWakeLock() {
      try {
        if ('wakeLock' in navigator) {
          wl = await navigator.wakeLock.request('screen');
          wakeLockRef.current = wl;
        }
      } catch(e) { /* silently ignore — not supported on all browsers */ }
    }
    acquireWakeLock();
    // Re-acquire if the page becomes visible again (lock released on hide)
    const onVis = () => { if (document.visibilityState === 'visible') acquireWakeLock(); };
    document.addEventListener('visibilitychange', onVis);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      if (wakeLockRef.current) { wakeLockRef.current.release().catch(() => {}); wakeLockRef.current = null; }
    };
  }, []);

  // ── Metronome: start/stop when metroOn, running, or the live BPM/time signature changes ──
  useEffect(() => {
    if (metronomeStopRef.current) { metronomeStopRef.current(); metronomeStopRef.current = null; }
    if (metroOn && running && liveBpm > 0) {
      metronomeStopRef.current = startMetronome(audioCtx.current, masterGainRef?.current, liveBpm, liveBeatsPerBar);
    }
    return () => { if (metronomeStopRef.current) { metronomeStopRef.current(); metronomeStopRef.current = null; } };
  }, [metroOn, running, liveBpm, liveBeatsPerBar]);

  // Auto-pause when user navigates away; resume is manual
  useEffect(() => {
    if (!isVisible && running) {
      setRunning(false);
    }
  }, [isVisible]);

  // Flush elapsed time for the current task into stats
  const flushStats = useCallback((taskIndex, overrideSec) => {
    const task = tasks[taskIndex];
    if (!task) return;
    const key = task.exerciseId || task.id;
    if (committedRef.current.has(key + "-" + taskIndex)) return;
    const sec = overrideSec !== undefined ? overrideSec : elapsedRef.current;
    if (sec <= 0) return;
    committedRef.current.add(key + "-" + taskIndex);
    onCommitStats(task, sec);
  }, [tasks, onCommitStats]);

  const totalSec     = tasks.reduce((s, t) => s + t.minutes * 60, 0);
  const completedSec = tasks.slice(0, current).reduce((s, t) => s + t.minutes * 60, 0);
  const overallPct   = Math.round((completedSec / totalSec) * 100);
  const currentTask  = tasks[current];
  const taskTotalSec = currentTask ? currentTask.minutes * 60 : 0;
  const taskPct      = taskTotalSec > 0 ? Math.round(((taskTotalSec - secondsLeft) / taskTotalSec) * 100) : 100;

  advanceRef.current = () => {
    if (current + 1 >= tasks.length) {
      flushStats(current);
      elapsedRef.current = 0;
      setDone(true);
      setRunning(false);
      playSessionDone(audioCtx.current, masterGainRef?.current);
      setFireworks(true);
    } else {
      flushStats(current);
      elapsedRef.current = 0;
      playExerciseDone(audioCtx.current, masterGainRef?.current);
      setFlash(true);
      setTimeout(() => setFlash(false), 700);
      const next = current + 1;
      setCurrent(next);
      setSecondsLeft(tasks[next].minutes * 60);
    }
  };

  // Wall-clock based timer — survives phone lock/background suspension.
  // Instead of counting ticks (which stop when JS is frozen), we record the
  // real timestamp when the timer starts, and on each wake/tick we compute
  // how much real time has actually passed.
  const startWallRef = useRef(null);  // Date.now() when current run segment started
  const startSecsRef = useRef(0);     // secondsLeft value at that moment
  const startElapsedRef = useRef(0);  // elapsedRef.current at that moment

  useEffect(() => {
    if (running) {
      // Snapshot wall clock and current values when we (re)start
      startWallRef.current   = Date.now();
      startSecsRef.current   = secondsLeft;
      startElapsedRef.current = elapsedRef.current;

      intervalRef.current = setInterval(() => {
        const realElapsed = Math.floor((Date.now() - startWallRef.current) / 1000);
        const newSecsLeft = startSecsRef.current - realElapsed;
        const newElapsed  = startElapsedRef.current + realElapsed;

        elapsedRef.current = newElapsed;

        if (newSecsLeft <= 0) {
          clearInterval(intervalRef.current);
          setSecondsLeft(0);
          advanceRef.current();
        } else {
          setSecondsLeft(newSecsLeft);
        }
      }, 500); // poll every 500ms so we catch the boundary promptly

    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, current]);

  // Visibility change handler: when phone unlocks / tab comes back to foreground,
  // immediately recalculate from wall clock so the display snaps to the correct time.
  useEffect(() => {
    const onVisible = () => {
      if (!running || startWallRef.current === null) return;
      const realElapsed = Math.floor((Date.now() - startWallRef.current) / 1000);
      const newSecsLeft = startSecsRef.current - realElapsed;
      const newElapsed  = startElapsedRef.current + realElapsed;
      elapsedRef.current = newElapsed;
      if (newSecsLeft <= 0) {
        clearInterval(intervalRef.current);
        setSecondsLeft(0);
        advanceRef.current();
      } else {
        setSecondsLeft(newSecsLeft);
      }
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [running, current]);

  const skip = () => { clearInterval(intervalRef.current); advanceRef.current(); };

  // Go back to the previous exercise — lets you recover from an accidental
  // tap that skipped ahead when you meant to pause/resume instead.
  const goBack = () => {
    if (current === 0) return;
    clearInterval(intervalRef.current);
    flushStats(current);
    const prevIndex = current - 1;
    elapsedRef.current = 0;
    setCurrent(prevIndex);
    setSecondsLeft(tasks[prevIndex].minutes * 60);
  };

  // Sub-exercise progress is persisted per exercise id (not per task), so the
  // same recurring exercise keeps one running checklist across sessions.
  const [confirmResetSub, setConfirmResetSub] = useState(false);
  useEffect(() => { setConfirmResetSub(false); }, [current]);

  const toggleSub = (subId) => {
    const exId = currentTask?.exerciseId;
    if (!exId) return;
    setSubProgress(prev => {
      const list = prev[exId] || [];
      const next = list.includes(subId) ? list.filter(id => id !== subId) : [...list, subId];
      return { ...prev, [exId]: next };
    });
  };
  const resetSubProgress = () => {
    const exId = currentTask?.exerciseId;
    if (!exId) return;
    setSubProgress(prev => ({ ...prev, [exId]: [] }));
    setConfirmResetSub(false);
  };

  // Urgency pulse when ≤10s left
  const urgent = secondsLeft <= 10 && secondsLeft > 0 && running;

  if (done) return (
    <>
      <Fireworks active={fireworks} />
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes glowPulse{0%,100%{text-shadow:0 0 8px #C8873A66}50%{text-shadow:0 0 32px #C8873Acc,0 0 60px #C8873A44}}`}</style>
      <div style={{ textAlign: "center", padding: "50px 24px", animation: "fadeUp 0.6s ease-out" }}>
        <div style={{ fontSize: 60, marginBottom: 16, animation: "glowPulse 2s ease-in-out infinite" }}>🏆</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.amber, marginBottom: 8, animation: "glowPulse 2s ease-in-out infinite" }}>{T("sessionComplete")}</div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 6 }}>
          {T("exercisesCount", tasks.length)} · {formatTotalMin(totalSec)}
        </div>
        <div style={{ fontSize: 11, color: "#3A4A3A", marginBottom: 28 }}>{T("consistency")}</div>
        <button style={base.pillBtn(true)} onClick={onFinish}>{T("backToSession")}</button>
        <br /><br />
        <button style={{ ...base.pillBtn(false), width: "100%" }} onClick={onBackToMenu}>{T("mainMenu")}</button>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @keyframes urgentPulse{0%,100%{color:#C8873A}50%{color:#F87171;text-shadow:0 0 16px #F8717188}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <FlashOverlay show={flash} color="#4FC3F7" />
      <div style={{ padding: "14px 16px 100px", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto", maxHeight: "calc(100dvh - 110px)" }}>
        {/* Timer card */}
        <div style={{ background: "#151208", border: "1px solid #2A1E08", borderRadius: 16, padding: "22px 18px", textAlign: "center" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B5A3A", marginBottom: 3 }}>
            {T("exerciseOf2")} {current + 1} {T("of2")} {tasks.length}
          </div>
          <div style={{ fontSize: 19, fontWeight: 700, color: C.cream, marginBottom: 18 }}>
            {currentTask?.icon} {exerciseName(currentTask, lang)}
          </div>
          <div style={{ fontSize: 58, fontFamily: "monospace", fontWeight: 700, lineHeight: 1, marginBottom: 6, animation: urgent ? "urgentPulse 0.7s ease-in-out infinite" : "none", color: C.amber }}>
            {formatTime(secondsLeft)}
          </div>
          <div style={{ fontSize: 10, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{T("remaining")}</div>
          <div style={{ height: 4, background: "#1E1E1E", borderRadius: 2, margin: "14px 0 0", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${taskPct}%`, background: urgent ? "linear-gradient(90deg,#6B0A0A,#F87171)" : "linear-gradient(90deg,#6B3A0A,#C8873A)", borderRadius: 2, transition: "width 1s linear, background 0.3s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 18 }}>
            <button
              style={{ ...base.pillBtn(false), opacity: current === 0 ? 0.4 : 1, cursor: current === 0 ? "default" : "pointer" }}
              onClick={goBack}
              disabled={current === 0}
            >{T("previousBtn")}</button>
            <button style={base.pillBtn(false)} onClick={skip}>{T("skipBtn")}</button>
            <button style={{ ...base.pillBtn(true), width: "auto", padding: "12px 28px" }} onClick={() => { setRunning(r => !r); setHasStarted(true); }}>
              {running ? T("pauseBtn") : hasStarted ? T("resumePlayBtn") : T("playBtn")}
            </button>
          </div>
          {/* Metronome — on/off toggle always available; BPM & time signature
              only shown once switched on, adjustable live for this exercise. */}
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setMetroOn(m => !m)}
              style={{ padding: "7px 16px", borderRadius: 8, border: `1px solid ${metroOn ? "#34D399" : "#2A2A2A"}`,
                background: metroOn ? "#34D39922" : "#1A1A1A", color: metroOn ? "#34D399" : C.muted,
                fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              {metroOn ? T("metronomeOn") : T("metronomeOff")}
            </button>
            {metroOn && (
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => setLiveBpm(b => Math.max(10, b - 5))} style={{ width: 26, height: 26, borderRadius: "50%", background: "#222", border: "1px solid #333", color: C.cream, fontSize: 14, cursor: "pointer", padding: 0 }}>−</button>
                  <span style={{ fontSize: 13, fontFamily: "monospace", color: C.amber, fontWeight: 700, width: 60, textAlign: "center" }}>{liveBpm} BPM</span>
                  <button onClick={() => setLiveBpm(b => Math.min(200, b + 5))} style={{ width: 26, height: 26, borderRadius: "50%", background: "#222", border: "1px solid #333", color: C.cream, fontSize: 14, cursor: "pointer", padding: 0 }}>+</button>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  {[1,2,3,4,5,6,7,8].map(n => (
                    <button key={n} onClick={() => setLiveBeatsPerBar(n)}
                      style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${liveBeatsPerBar === n ? C.amber : "#2A2A2A"}`,
                        background: liveBeatsPerBar === n ? "#C8873A22" : "#1A1A1A",
                        color: liveBeatsPerBar === n ? C.amber : C.muted, fontSize: 11, fontWeight: 700, cursor: "pointer", padding: 0 }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sub-exercises — a checkable breakdown of the current exercise, e.g.
            scale interval/grouping drills. Progress is saved per exercise
            (not per session), so the same recurring exercise keeps one
            running checklist across days/app restarts — handy when you
            reuse it for different content (e.g. a new key each day) but
            want to track overall coverage of the pattern itself. */}
        {currentTask?.subExercises?.length > 0 && (() => {
          const doneIds = subProgress[currentTask.exerciseId] || [];
          return (
            <div style={base.card}>
              <div style={{ padding: "10px 14px", borderBottom: `1px solid ${C.faint}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted }}>{T("subExercisesTitle")}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: C.amber, fontWeight: 700 }}>{doneIds.length}/{currentTask.subExercises.length} {T("done")}</span>
                  {!confirmResetSub ? (
                    doneIds.length > 0 && (
                      <button onClick={() => setConfirmResetSub(true)} style={{ background: "none", border: "none", color: C.muted, fontSize: 11, cursor: "pointer", padding: 0 }}>{T("resetProgress")}</button>
                    )
                  ) : (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setConfirmResetSub(false)} style={{ background: "none", border: "1px solid #333", borderRadius: 6, color: "#888", fontSize: 10, cursor: "pointer", padding: "3px 7px" }}>{T("cancelBtn")}</button>
                      <button onClick={resetSubProgress} style={{ background: "#5A0A0A", border: "1px solid #8A1A1A", borderRadius: 6, color: "#F87171", fontSize: 10, fontWeight: 700, cursor: "pointer", padding: "3px 7px" }}>{T("resetProgressConfirm")}</button>
                    </div>
                  )}
                </div>
              </div>
              {currentTask.subExercises.map(sub => {
                const checked = doneIds.includes(sub.id);
                return (
                  <div key={sub.id} onClick={() => toggleSub(sub.id)}
                    style={{ padding: "9px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid #111`, cursor: "pointer" }}>
                    <div style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${checked ? "#34D399" : "#3A3A3A"}`, background: checked ? "#34D399" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, color: "#0A0A0A", fontWeight: 900 }}>
                      {checked ? "✓" : ""}
                    </div>
                    <span style={{ flex: 1, fontSize: 13, color: checked ? "#3A5A40" : C.cream, textDecoration: checked ? "line-through" : "none" }}>
                      {subExerciseLabel(sub, lang)}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* YouTube reference video */}
        <YouTubeCard videoId={extractYouTubeId(currentTask?.youtubeUrl)} />

        {/* Setlist */}
        <div style={base.card}>
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${C.faint}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted }}>{T("sessionSetlist")}</span>
            <span style={{ fontSize: 11, color: C.amber, fontWeight: 700 }}>{current}/{tasks.length} {T("done")}</span>
          </div>
          {tasks.map((t, i) => {
            const st = i < current ? "done" : i === current ? "cur" : "up";
            return (
              <div key={t.id} style={{ padding: "9px 14px", display: "flex", alignItems: "center", gap: 9, borderBottom: `1px solid #111`, background: st === "cur" ? "#1A1208" : "transparent", opacity: st === "up" ? 0.4 : 1 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: st === "done" ? "#34D399" : st === "cur" ? C.amber : "#2A2A2A", flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 12, color: st === "done" ? "#3A5A40" : st === "cur" ? C.cream : C.muted, textDecoration: st === "done" ? "line-through" : "none" }}>{exerciseName(t, lang)}</span>
                {t.youtubeUrl && extractYouTubeId(t.youtubeUrl) && (
                  <span style={{ fontSize: 9, background: "#FF000044", color: "#FF6666", borderRadius: 3, padding: "1px 4px", fontWeight: 700, flexShrink: 0 }}>▶</span>
                )}
                <span style={{ fontSize: 11, fontFamily: "monospace", color: C.muted }}>{t.minutes}m</span>
              </div>
            );
          })}
          <div style={{ padding: "10px 14px", background: "#0A0A0A" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted }}>{T("overallProgress")}</span>
              <span style={{ fontSize: 11, color: "#6B5A3A", fontFamily: "monospace" }}>{overallPct}%</span>
            </div>
            <div style={{ height: 3, background: C.faint, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: C.amber + "55", borderRadius: 2, transition: "width 0.5s" }} />
            </div>
          </div>
        </div>

        {/* Back to menu */}
        <button style={{ ...base.pillBtn(false), width: "100%", textAlign: "center", color: C.muted, fontSize: 12 }} onClick={() => { flushStats(current); onBackToMenu(); }}>
          {T("backToMenu")}
        </button>
      </div>
    </>
  );
}

// ─── SETTINGS SCREEN ─────────────────────────────────────────────────────────

const COLOR_PALETTE = ["#C8873A","#4FC3F7","#A78BFA","#F87171","#34D399","#FBBF24","#FB923C","#F472B6","#60A5FA","#A3E635","#E879F9","#2DD4BF"];

// ── EXERCISE EDITOR (standalone component so hooks are never conditional) ──
function ExerciseEditor({ editEx, categories, setExercises, onBack }) {
  const T = useT();
  const lang = useLang();
  const isNew = editEx === "new";
  const [form, setForm] = useState(
    isNew
      ? { name: "", description: "", defaultMin: 10, icon: "🎸", categoryId: categories[0]?.id || "", youtubeUrl: "", bpm: 0, beatsPerBar: 4, subExercises: [] }
      : { ...editEx, youtubeUrl: editEx.youtubeUrl || "", bpm: editEx.bpm || 0, beatsPerBar: editEx.beatsPerBar || 4, subExercises: editEx.subExercises || [] }
  );
  const [iconPicker, setIconPicker] = useState(false);
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.name.trim()) return;
    const cleaned = { ...form, defaultMin: Number(form.defaultMin), subExercises: (form.subExercises || []).filter(s => s.label.trim()) };
    if (isNew) {
      setExercises(prev => [...prev, { ...cleaned, id: uid() }]);
    } else {
      setExercises(prev => prev.map(e => e.id === form.id ? cleaned : e));
    }
    onBack();
  };
  const del = () => { setExercises(prev => prev.filter(e => e.id !== form.id)); onBack(); };

  return (
    <div style={base.scrollArea(24)}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <button style={base.iconBtn(C.amber)} onClick={onBack}>←</button>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.cream }}>{isNew ? T("newExerciseTitle") : T("editExercise")}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={base.label}>{T("iconLabel")}</label>
          <button style={{ fontSize: 28, background: "#1A1A1A", border: `1px solid #2A2A2A`, borderRadius: 10, padding: "8px 16px", cursor: "pointer" }} onClick={() => setIconPicker(p => !p)}>
            {form.icon}
          </button>
          {iconPicker && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, padding: 10, background: "#1A1A1A", borderRadius: 10, border: `1px solid #2A2A2A` }}>
              {ICONS.map(ic => (
                <button key={ic} style={{ fontSize: 20, background: form.icon === ic ? "#C8873A33" : "none", border: form.icon === ic ? `1px solid ${C.amber}` : "1px solid transparent", borderRadius: 6, padding: 4, cursor: "pointer" }}
                  onClick={() => { setF("icon", ic); setIconPicker(false); }}>{ic}</button>
              ))}
            </div>
          )}
        </div>
        <div>
          <label style={base.label}>{T("nameLabel")}</label>
          <input style={base.input} value={form.name} onChange={e => setF("name", e.target.value)} placeholder={T("exerciseNamePlaceholder")} autoComplete="off" autoCorrect="off" spellCheck={false} />
        </div>
        <div>
          <label style={base.label}>{T("descLabel")}</label>
          <textarea style={{ ...base.input, height: 72, resize: "none" }} value={form.description || ""} onChange={e => setF("description", e.target.value)} placeholder={T("exerciseDescPlaceholder")} />
        </div>
        <div>
          <label style={base.label}>{T("youtubeLabel")}</label>
          <input
            style={base.input}
            value={form.youtubeUrl || ""}
            onChange={e => setF("youtubeUrl", e.target.value)}
            placeholder={T("youtubePlaceholder")}
          />
          {form.youtubeUrl && !extractYouTubeId(form.youtubeUrl) && (
            <div style={{ fontSize: 11, color: "#F87171", marginTop: 5 }}>{T("youtubeError")}</div>
          )}
          {form.youtubeUrl && extractYouTubeId(form.youtubeUrl) && (
            <div style={{ fontSize: 11, color: "#34D399", marginTop: 5 }}>{T("youtubeOk")}{extractYouTubeId(form.youtubeUrl)}</div>
          )}
        </div>
        <div>
          <label style={base.label}>{T("metronomeLabel")} {T("bpmHint")}</label>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button style={{ width: 28, height: 28, borderRadius: "50%", background: "#222", border: "1px solid #333", color: C.cream, fontSize: 16, cursor: "pointer" }} onClick={() => setF("bpm", Math.max(0, (form.bpm||0) - 5))}>−</button>
              <span style={{ fontSize: 16, fontFamily: "monospace", color: C.amber, fontWeight: 700, width: 44, textAlign: "center" }}>{form.bpm > 0 ? form.bpm : "OFF"}</span>
              <button style={{ width: 28, height: 28, borderRadius: "50%", background: "#222", border: "1px solid #333", color: C.cream, fontSize: 16, cursor: "pointer" }} onClick={() => setF("bpm", Math.min(200, Math.max(10, (form.bpm||0) === 0 ? 60 : (form.bpm||0) + 5)))}>+</button>
            </div>
            {form.bpm > 0 && (
              <input type="range" min="10" max="200" step="1" value={form.bpm} onChange={e => setF("bpm", parseInt(e.target.value))}
                style={{ flex: 1, accentColor: C.amber, minWidth: 80 }} />
            )}
            {form.bpm > 0 && (
              <button onClick={() => setF("bpm", 0)} style={{ fontSize: 10, background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 6, color: C.muted, padding: "4px 8px", cursor: "pointer" }}>OFF</button>
            )}
          </div>
          {form.bpm > 0 && (
            <div style={{ marginTop: 10 }}>
              <label style={{ ...base.label, marginBottom: 6 }}>{T("timeSigLabel")} {T("beatsPerBarHint")}</label>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[1,2,3,4,5,6,7,8].map(n => (
                  <button key={n} onClick={() => setF("beatsPerBar", n)}
                    style={{ width: 32, height: 32, borderRadius: 7, border: `1px solid ${form.beatsPerBar === n ? C.amber : "#2A2A2A"}`,
                      background: form.beatsPerBar === n ? "#C8873A22" : "#1A1A1A",
                      color: form.beatsPerBar === n ? C.amber : C.muted, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                    {n}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{form.beatsPerBar}/4 · {form.bpm} BPM</div>
            </div>
          )}
        </div>
        <div>
          <label style={base.label}>{T("durationLabel")}</label>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button style={{ width: 32, height: 32, borderRadius: "50%", background: "#222", border: `1px solid #333`, color: C.cream, fontSize: 18, cursor: "pointer" }} onClick={() => setF("defaultMin", Math.max(1, form.defaultMin - 1))}>−</button>
            <span style={{ fontSize: 18, fontFamily: "monospace", color: C.amber, fontWeight: 700, width: 40, textAlign: "center" }}>{form.defaultMin}</span>
            <button style={{ width: 32, height: 32, borderRadius: "50%", background: "#222", border: `1px solid #333`, color: C.cream, fontSize: 18, cursor: "pointer" }} onClick={() => setF("defaultMin", form.defaultMin + 1)}>+</button>
          </div>
        </div>
        <div>
          <label style={base.label}>{T("categoryLabel")}</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {categories.map(c => (
              <button key={c.id} style={base.catChip(form.categoryId === c.id, c.color)} onClick={() => setF("categoryId", c.id)}>{categoryName(c, lang)}</button>
            ))}
          </div>
        </div>
        <div>
          <label style={base.label}>{T("subExercisesLabel")}</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {(form.subExercises || []).map((sub, idx) => (
              <div key={sub.id} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <input
                  style={{ ...base.input, flex: 1 }}
                  value={sub.label}
                  onChange={e => setF("subExercises", form.subExercises.map((s, i) => i === idx ? { ...s, label: e.target.value } : s))}
                  placeholder={T("subExercisePlaceholder")}
                  autoComplete="off" autoCorrect="off" spellCheck={false}
                />
                <button
                  onClick={() => setF("subExercises", form.subExercises.filter((_, i) => i !== idx))}
                  style={{ width: 30, height: 30, borderRadius: 7, background: "none", border: "1px solid #2A2A2A", color: C.muted, fontSize: 14, cursor: "pointer", flexShrink: 0 }}
                >×</button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setF("subExercises", [...(form.subExercises || []), { id: uid(), label: "" }])}
            style={{ ...base.pillBtn(false), marginTop: 8, textAlign: "center", fontSize: 12 }}
          >{T("addSubExercise")}</button>
        </div>
        <button style={base.pillBtn(true)} onClick={save}>{isNew ? T("addExercise") : T("saveChanges")}</button>
        {!isNew && (
          <button style={{ ...base.pillBtn(false), color: "#F87171", border: "1px solid #3A1A1A", textAlign: "center" }} onClick={del}>
            {T("deleteExercise")}
          </button>
        )}
      </div>
    </div>
  );
}

// ── CATEGORY EDITOR (standalone component so hooks are never conditional) ──
function CategoryEditor({ editCat, setExercises, setCategories, onBack }) {
  const T = useT();
  const isNew = editCat === "new";
  const [form, setForm] = useState(isNew ? { name: "", color: COLOR_PALETTE[0] } : { ...editCat });
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.name.trim()) return;
    if (isNew) {
      setCategories(prev => [...prev, { ...form, id: uid() }]);
    } else {
      setCategories(prev => prev.map(c => c.id === form.id ? form : c));
    }
    onBack();
  };
  const del = () => {
    setCategories(prev => prev.filter(c => c.id !== form.id));
    setExercises(prev => prev.filter(e => e.categoryId !== form.id));
    onBack();
  };

  return (
    <div style={base.scrollArea(24)}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <button style={base.iconBtn(C.amber)} onClick={onBack}>←</button>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.cream }}>{isNew ? T("newCategoryTitle") : T("editCategory")}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={base.label}>{T("nameLabel")}</label>
          <input style={base.input} value={form.name} onChange={e => setF("name", e.target.value)} placeholder={T("categoryNamePlaceholder")} autoComplete="off" autoCorrect="off" spellCheck={false} />
        </div>
        <div>
          <label style={base.label}>{T("colorLabel")}</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {COLOR_PALETTE.map(col => (
              <button key={col} onClick={() => setF("color", col)} style={{ width: 32, height: 32, borderRadius: "50%", background: col, border: form.color === col ? `3px solid white` : "3px solid transparent", cursor: "pointer", transition: "border 0.1s" }} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#1A1A1A", borderRadius: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: form.color }} />
          <span style={{ fontSize: 13, color: form.color, fontWeight: 600 }}>{form.name || T("preview")}</span>
        </div>
        <button style={base.pillBtn(true)} onClick={save}>{isNew ? T("addCategory") : T("saveChanges")}</button>
        {!isNew && (
          <button style={{ ...base.pillBtn(false), color: "#F87171", border: "1px solid #3A1A1A", textAlign: "center" }} onClick={del}>
            {T("deleteCategoryMsg")}
          </button>
        )}
      </div>
    </div>
  );
}

function SettingsScreen({ exercises, setExercises, categories, setCategories, volume, onVolumeChange, lang, onLangChange, displaySize, onDisplaySizeChange }) {
  const T = useT();
  const [section, setSection] = useState("exercises");
  const [editEx, setEditEx]   = useState(null);  // null | "new" | exercise object
  const [editCat, setEditCat] = useState(null);  // null | "new" | category object

  // The exercise/category editor has no visible tab bar to go back with, so
  // it's exactly the kind of screen where a phone's back button/gesture would
  // otherwise leave the app entirely. Trap it here to just close the editor.
  useEffect(() => {
    if (!editEx && !editCat) return;
    history.pushState({ guitarflowEditorOpen: true }, "");
    const onPopState = () => { setEditEx(null); setEditCat(null); };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [editEx, editCat]);

  if (editEx)  return <ExerciseEditor  editEx={editEx}   categories={categories} setExercises={setExercises} onBack={() => setEditEx(null)} />;
  if (editCat) return <CategoryEditor  editCat={editCat} setExercises={setExercises} setCategories={setCategories} onBack={() => setEditCat(null)} />;

  // ── SETTINGS MAIN ──
  return (
    <div style={base.scrollArea(24)}>
      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 0, background: "#0A0A0A", borderRadius: 10, padding: 3, marginBottom: 8 }}>
        {[["exercises", T("settingsExercises")], ["categories", T("settingsCategories")], ["sound", T("settingsSound")], ["language", T("settingsLanguage")], ["display", T("settingsDisplay")]].map(([id, label]) => (
          <button key={id} style={{ flex: 1, padding: "7px 2px", borderRadius: 8, border: "none", background: section === id ? "#1E1E1E" : "none", color: section === id ? C.amber : C.muted, fontSize: 10, fontWeight: section === id ? 700 : 500, cursor: "pointer", letterSpacing: "0.03em" }} onClick={() => setSection(id)}>
            {label}
          </button>
        ))}
      </div>

      {section === "exercises" && (
        <>
          <button style={{ ...base.pillBtn(false), width: "100%", textAlign: "center", color: C.amber, border: `1px solid ${C.amber}44`, marginBottom: 10, padding: "11px" }} onClick={() => setEditEx("new")}>
            {T("newExercise")}
          </button>
          {categories.map(cat => {
            const catExs = exercises.filter(e => e.categoryId === cat.id);
            if (catExs.length === 0) return null;
            return (
              <div key={cat.id} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: cat.color, padding: "4px 0 6px", fontWeight: 700 }}>{categoryName(cat, lang)}</div>
                <div style={base.card}>
                  {catExs.map((ex, idx) => (
                    <div key={ex.id} style={{ ...base.row, borderBottom: idx < catExs.length - 1 ? `1px solid ${C.faint}` : "none", cursor: "pointer" }} onClick={() => setEditEx(ex)}>
                      <span style={{ fontSize: 16 }}>{ex.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>{exerciseName(ex, lang)}</div>
                      </div>
                      <span style={{ fontSize: 11, color: C.muted, fontFamily: "monospace" }}>{ex.defaultMin}m</span>
                      <span style={{ color: C.muted, fontSize: 14 }}>›</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}

      {section === "sound" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={base.card}>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <label style={{ ...base.label, margin: 0 }}>{T("volumeLabel")}</label>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: C.amber, fontWeight: 700 }}>{Math.round(volume * 100)}%</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 14, color: C.muted }}>🔈</span>
                <input
                  type="range" min="0" max="1" step="0.05"
                  value={volume}
                  onChange={e => onVolumeChange(parseFloat(e.target.value))}
                  style={{ flex: 1, accentColor: C.amber, height: 4, cursor: "pointer" }}
                />
                <span style={{ fontSize: 14, color: C.muted }}>🔊</span>
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 8 }}>{T("volumeDesc")}</div>
            </div>
          </div>
        </div>
      )}

      {section === "language" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={base.card}>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ ...base.label, margin: 0 }}>{T("langLabel")}</label>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{T("langDesc")}</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                {[["fr", "🇫🇷 Français"], ["en", "🇬🇧 English"]].map(([code, label]) => (
                  <button key={code} onClick={() => onLangChange(code)}
                    style={{ flex: 1, padding: "10px 8px", borderRadius: 9, border: `1px solid ${lang === code ? C.amber : "#2A2A2A"}`,
                      background: lang === code ? "#C8873A22" : "#1A1A1A",
                      color: lang === code ? C.amber : C.muted, fontSize: 13, fontWeight: lang === code ? 700 : 400, cursor: "pointer" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {section === "display" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={base.card}>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ marginBottom: 8 }}>
                <label style={{ ...base.label, margin: 0 }}>{T("displayLabel")}</label>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{T("displayDesc")}</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                {[["small", T("sizeSmall")], ["medium", T("sizeMedium")], ["large", T("sizeLarge")]].map(([size, label]) => (
                  <button key={size} onClick={() => onDisplaySizeChange(size)}
                    style={{ flex: 1, padding: "10px 8px", borderRadius: 9, border: `1px solid ${displaySize === size ? C.amber : "#2A2A2A"}`,
                      background: displaySize === size ? "#C8873A22" : "#1A1A1A",
                      color: displaySize === size ? C.amber : C.muted, fontSize: 13, fontWeight: displaySize === size ? 700 : 400, cursor: "pointer" }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {section === "categories" && (
        <>
          <button style={{ ...base.pillBtn(false), width: "100%", textAlign: "center", color: C.amber, border: `1px solid ${C.amber}44`, marginBottom: 10, padding: "11px" }} onClick={() => setEditCat("new")}>
            {T("newCategory")}
          </button>
          <div style={base.card}>
            {categories.map((cat, idx) => (
              <div key={cat.id} style={{ ...base.row, borderBottom: idx < categories.length - 1 ? `1px solid ${C.faint}` : "none", cursor: "pointer" }} onClick={() => setEditCat(cat)}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: cat.color }}>{categoryName(cat, lang)}</div>
                <span style={{ fontSize: 11, color: C.muted }}>{T("exercisesCount", exercises.filter(e => e.categoryId === cat.id).length)}</span>
                <span style={{ color: C.muted, fontSize: 14 }}>›</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab]                       = useState("library");
  const [tasks, setTasks]                   = useState([]);
  const [sessionActive, setSessionActive]   = useState(false);
  const [exercises, setExercises, exLoaded] = usePersisted("exercises", DEFAULT_EXERCISES);
  const [categories, setCats, catLoaded]    = usePersisted("categories", DEFAULT_CATEGORIES);
  const [stats, setStats, statsLoaded]      = usePersisted("stats", {});
  const [presets, setPresets, presetsLoaded] = usePersisted("presets", []);
  const [lang, setLang, langLoaded]          = usePersisted("lang", "fr");
  const [displaySize, setDisplaySize, displaySizeLoaded] = usePersisted("displaySize", "medium");
  // Sub-exercise checklist progress, keyed by exercise id: { [exerciseId]: [subExerciseId, ...] }.
  // Persisted at the exercise level (not per session task) so the same
  // recurring exercise (e.g. daily scale practice in a different key each
  // day) keeps one running coverage checklist instead of resetting every session.
  const [subProgress, setSubProgress, subProgressLoaded] = usePersisted("subProgress", {});
  const setCategories = setCats;
  const audioCtx      = useRef(null);
  const masterGainRef = useRef(null);
  const [volume, setVolume, volLoaded] = usePersisted("volume", 0.8);

  // ── Lifted session progress state ─────────────────────────────────────────
  const [sessionCurrent, setSessionCurrent]       = useState(0);
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState(0);
  const [sessionRunning, setSessionRunning]       = useState(false);
  const [sessionHasStarted, setSessionHasStarted] = useState(false);
  const [sessionDone, setSessionDone]             = useState(false);
  const sessionElapsedRef   = useRef(0);
  const sessionCommittedRef = useRef(new Set());

  const commitStats = useCallback((task, elapsedSec) => {
    if (elapsedSec < 1) return;
    setStats(prev => {
      const key = task.exerciseId || task.id;
      const existing = prev[key] || { exerciseId: key, name: task.name, icon: task.icon, totalSec: 0, sessions: 0 };
      return {
        ...prev,
        [key]: {
          ...existing,
          name: task.name,
          icon: task.icon,
          totalSec: existing.totalSec + Math.round(elapsedSec),
          sessions: existing.sessions + 1,
        }
      };
    });
  }, [setStats]);

  // Lazy-init audio context on first user interaction
  const ensureAudio = () => {
    if (!audioCtx.current) {
      audioCtx.current = createAudioContext();
      if (audioCtx.current) {
        masterGainRef.current = audioCtx.current.createGain();
        masterGainRef.current.gain.setValueAtTime(volume, audioCtx.current.currentTime);
        masterGainRef.current.connect(audioCtx.current.destination);
      }
    }
    if (audioCtx.current?.state === "suspended") audioCtx.current.resume();
  };

  // Keep masterGain in sync when volume slider changes
  useEffect(() => {
    if (masterGainRef.current && audioCtx.current) {
      masterGainRef.current.gain.setValueAtTime(volume, audioCtx.current.currentTime);
    }
  }, [volume]);

  const addExercise = (ex) => {
    ensureAudio();
    setTasks(prev => [...prev, { id: uid(), exerciseId: ex.id, name: ex.name, icon: ex.icon, minutes: ex.defaultMin, categoryId: ex.categoryId, youtubeUrl: ex.youtubeUrl || "", bpm: ex.bpm || 0, beatsPerBar: ex.beatsPerBar || 4, subExercises: ex.subExercises || [] }]);
  };

  const startSession = () => {
    ensureAudio();
    // Reset all session progress when starting fresh
    setSessionCurrent(0);
    setSessionSecondsLeft(tasks[0]?.minutes * 60 || 0);
    setSessionRunning(false);
    setSessionHasStarted(false);
    setSessionDone(false);
    sessionElapsedRef.current = 0;
    sessionCommittedRef.current = new Set();
    setSessionActive(true);
    setTab("active");
  };

  const endSession = () => {
    setSessionActive(false);
    setSessionRunning(false);
    setSessionDone(false);
    setSessionHasStarted(false);
    setSessionCurrent(0);
    sessionElapsedRef.current = 0;
    sessionCommittedRef.current = new Set();
    setTab("session");
  };

  const backToMenu = () => {
    setSessionActive(false);
    setSessionRunning(false);
    setSessionDone(false);
    setSessionHasStarted(false);
    setSessionCurrent(0);
    sessionElapsedRef.current = 0;
    sessionCommittedRef.current = new Set();
    setTab("library");
  };

  const returnToSession = () => setTab("active");

  // App renders the LangContext.Provider itself, so it can't read its own
  // language via useT()/useContext (that would only see the ambient/default
  // value from an ancestor, since a component never consumes the Provider it
  // renders). Translate directly from its own `lang` state instead.
  const T = (key, ...args) => translate(lang, key, ...args);
  const NAV_TABS = [
    { id: "library",  label: T("navLibrary") },
    { id: "presets",  label: presets.length > 0 ? `${T("navPresets")} (${presets.length})` : T("navPresets") },
    { id: "session",  label: tasks.length > 0 ? `${T("navSession")} (${tasks.length})` : T("navSession") },
  ];
  const statsCount = Object.values(stats).filter(s => s.totalSec > 0).length;
  const sessionInProgress = sessionActive && !sessionDone;

  return (
    <LangContext.Provider value={lang}>
    <div style={{ ...base.app, zoom: DISPLAY_ZOOM[displaySize] || 1 }} onClick={ensureAudio}>
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        input, textarea {
          color-scheme: dark;
          color: ${C.cream};
          -webkit-text-fill-color: ${C.cream};
          caret-color: ${C.cream};
        }
        input::placeholder, textarea::placeholder { -webkit-text-fill-color: ${C.muted}; color: ${C.muted}; opacity: 1; }
        input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus,
        textarea:-webkit-autofill, textarea:-webkit-autofill:hover, textarea:-webkit-autofill:focus {
          -webkit-text-fill-color: ${C.cream} !important;
          -webkit-box-shadow: 0 0 0px 1000px ${C.surface} inset !important;
          box-shadow: 0 0 0px 1000px ${C.surface} inset !important;
          caret-color: ${C.cream} !important;
          transition: background-color 9999s ease-in-out 0s;
        }
        @keyframes activePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
      `}</style>

      {/* Header + Nav + paused banner are grouped and pinned to the top via
          sticky positioning, so they stay on screen while the content below
          scrolls — instead of scrolling away with the page on some phones. */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: C.bg }}>
      {/* Header */}
      <div style={base.header}>
        <div style={base.headerLeft}>
          <p style={base.headerTitle}>🎸 GuitarFlow</p>
          <p style={base.headerSub}>{T("appSub")}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {tab === "active" && sessionActive && (
            <button style={{ ...base.pillBtn(false), fontSize: 12, color: C.muted }} onClick={backToMenu}>
              {T("headerEnd")}
            </button>
          )}
          {(
            <button
              title={T("headerLibrary")}
              onClick={() => setTab("library")}
              style={{
                width: 36, height: 36, borderRadius: 8, padding: 0, cursor: "pointer",
                border: tab === "library" ? `1px solid ${C.amber}` : "1px solid #2A2A2A",
                background: tab === "library" ? "#C8873A22" : "none",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={tab === "library" ? C.amber : C.navInactive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </button>
          )}
          {(
            <button
              title={T("headerStats")}
              onClick={() => setTab(t => t === "stats" ? "library" : "stats")}
              style={{
                width: 36, height: 36, borderRadius: 8, padding: 0, cursor: "pointer",
                border: tab === "stats" ? "1px solid #4FC3F7" : "1px solid #2A2A2A",
                background: tab === "stats" ? "#4FC3F722" : "none",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                position: "relative"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tab === "stats" ? "#4FC3F7" : C.navInactive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              {statsCount > 0 && (
                <div style={{ position: "absolute", top: -3, right: -3, width: 10, height: 10, borderRadius: "50%", background: "#4FC3F7", border: "2px solid #0F0F0F" }} />
              )}
            </button>
          )}
          {(
            <button
              title={T("headerSettings")}
              onClick={() => setTab(t => t === "settings" ? "library" : "settings")}
              style={{ width: 36, height: 36, borderRadius: 8, background: tab === "settings" ? "#C8873A22" : "none", border: tab === "settings" ? `1px solid ${C.amber}` : "1px solid #2A2A2A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tab === "settings" ? C.amber : C.navInactive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      {tab !== "settings" && tab !== "stats" && (
        <div style={base.navBar}>
          {NAV_TABS.map(t => (
            <button key={t.id} style={base.navBtn(tab === t.id)} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
          {sessionInProgress && (
            <button style={{ ...base.navBtn(tab === "active"), color: tab === "active" ? "#34D399" : "#2A5A3A", borderBottomColor: tab === "active" ? "#34D399" : "transparent", position: "relative" }}
              onClick={() => setTab("active")}>
              {T("navActive")}
              <span style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: "#34D399", animation: "activePulse 1.5s ease-in-out infinite" }} />
            </button>
          )}
        </div>
      )}

      {/* Paused-session banner — shown on Library/Session when a session is paused */}
      {sessionInProgress && tab !== "active" && (
        <div style={{ background: "#0D1A0D", borderBottom: "1px solid #2A5A2A", padding: "8px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399", flexShrink: 0, display: "inline-block" }} />
          <span style={{ fontSize: 12, color: "#34D399", flex: 1, fontWeight: 600 }}>
            {T("sessionPaused")} · {exerciseName(tasks[sessionCurrent], lang)}
          </span>
          <button onClick={returnToSession} style={{ fontSize: 11, background: "#34D39922", border: "1px solid #34D39966", borderRadius: 6, color: "#34D399", padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}>
            {T("resumeBtn")}
          </button>
        </div>
      )}
      </div>

      {/* Screens */}
      {tab === "library"  && <LibraryScreen exercises={exercises} categories={categories} tasks={tasks} onAdd={addExercise} stats={stats} subProgress={subProgress} />}
      {tab === "presets"  && <PresetsScreen presets={presets} setPresets={setPresets} tasks={tasks} setTasks={setTasks} onLoadGoToSession={() => setTab("session")} />}
      {tab === "session"  && <SessionScreen tasks={tasks} setTasks={setTasks} onStart={startSession} sessionInProgress={sessionInProgress} onReturnToSession={returnToSession} presets={presets} setPresets={setPresets} />}
      {tab === "settings" && <SettingsScreen exercises={exercises} setExercises={setExercises} categories={categories} setCategories={setCategories} volume={volume} onVolumeChange={setVolume} lang={lang} onLangChange={setLang} displaySize={displaySize} onDisplaySizeChange={setDisplaySize} />}
      {tab === "stats"    && <StatsScreen stats={stats} exercises={exercises} onClear={() => setStats({})} />}
      {tab === "active"   && <ActiveSessionScreen
        tasks={tasks} setTasks={setTasks} onFinish={endSession} onBackToMenu={backToMenu}
        audioCtx={audioCtx} masterGainRef={masterGainRef} onCommitStats={commitStats}
        isVisible={tab === "active"}
        subProgress={subProgress} setSubProgress={setSubProgress}
        current={sessionCurrent} setCurrent={setSessionCurrent}
        secondsLeft={sessionSecondsLeft} setSecondsLeft={setSessionSecondsLeft}
        running={sessionRunning} setRunning={setSessionRunning}
        hasStarted={sessionHasStarted} setHasStarted={setSessionHasStarted}
        done={sessionDone} setDone={setSessionDone}
        elapsedRef={sessionElapsedRef} committedRef={sessionCommittedRef}
      />}
    </div>
    </LangContext.Provider>
  );
}
