import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────

const STRINGS = {
  en: {
    navLibrary: "Library", navPresets: "Presets", navSession: "Session", navActive: "▶ Active",
    navProgress: "Progress", navSettings: "Settings",
    progressTabLevel: "Level", progressTabStats: "Stats", progressTabBadges: "Badges",
    myPresetsTitle: "My presets",
    headerEnd: "↩ End", headerLibrary: "Library", headerStats: "Statistics", headerSettings: "Settings", headerBadges: "Badges",
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
    skipBtn: "Skip", previousBtn: "Previous", pauseBtn: "⏸ Pause", resumePlayBtn: "▶ Resume", playBtn: "▶ Play",
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
    settingsExercises: "exercises", settingsCategories: "categories", settingsSound: "sound", settingsLanguage: "language", settingsDisplay: "display", settingsBadges: "badges",
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
    badgesIntro: "Unlock badges by reaching practice milestones. This page will grow as new goals are added.",
    daysLabel: "days", badgeUnlockedTitle: "Badge unlocked!",
    resetBadgesLabel: "Reset badges", resetBadgesDesc: "Clear every badge you've earned so far. This can't be undone.",
    resetBadgesConfirmTitle: "Reset all badges?", resetBadgesConfirmMsg: "This will permanently clear all your earned badges. This cannot be undone.",
    headerLevel: "Level", levelShort: (n) => `Lvl ${n}`,
    levelUnlockedTitle: "Level up!", levelReachedLabel: (n) => `Level ${n}`,
    levelIntro: "Every minute you practice fills your experience gauge — level up as you go.",
    timeToNext: (h, m) => h > 0 ? `${h}h ${m}m until level ` : `${m}m until level `,
    xpGained: (n) => `+${n} min`,
  },
  fr: {
    navLibrary: "Bibliothèque", navPresets: "Modèles", navSession: "Séance", navActive: "▶ En cours",
    navProgress: "Progression", navSettings: "Réglages",
    progressTabLevel: "Niveau", progressTabStats: "Stats", progressTabBadges: "Badges",
    myPresetsTitle: "Mes modèles",
    headerEnd: "↩ Fin", headerLibrary: "Bibliothèque", headerStats: "Statistiques", headerSettings: "Réglages", headerBadges: "Badges",
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
    skipBtn: "Passer", previousBtn: "Précédent", pauseBtn: "⏸ Pause", resumePlayBtn: "▶ Reprendre", playBtn: "▶ Démarrer",
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
    settingsExercises: "exercices", settingsCategories: "catégories", settingsSound: "son", settingsLanguage: "langue", settingsDisplay: "affichage", settingsBadges: "badges",
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
    badgesIntro: "Débloquez des badges en atteignant des objectifs de pratique. Cette page grandira au fil des prochaines mises à jour.",
    daysLabel: "jours", badgeUnlockedTitle: "Badge débloqué !",
    resetBadgesLabel: "Réinitialiser les badges", resetBadgesDesc: "Efface tous les badges obtenus jusqu'ici. Action irréversible.",
    resetBadgesConfirmTitle: "Réinitialiser tous les badges ?", resetBadgesConfirmMsg: "Ceci supprimera définitivement tous vos badges obtenus. Cette action est irréversible.",
    headerLevel: "Niveau", levelShort: (n) => `Niv. ${n}`,
    levelUnlockedTitle: "Niveau supérieur !", levelReachedLabel: (n) => `Niveau ${n}`,
    levelIntro: "Chaque minute de pratique remplit votre jauge d'expérience — montez de niveau au fil du temps.",
    timeToNext: (h, m) => h > 0 ? `${h} h ${m} min avant le niveau ` : `${m} min avant le niveau `,
    xpGained: (n) => `+${n} min`,
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
    <div style={{ textAlign: "center", padding: "60px 24px", color: "#8D8D9C" }}>
      <div style={{ fontSize: 46, marginBottom: 12 }}>📊</div>
      <div style={{ fontSize: 14, lineHeight: 1.6 }}>
        {T("statsEmpty")}<br />{T("statsEmptySub")}
      </div>
    </div>
  );

  const totalSessionSec = entries.reduce((s, e) => s + e.totalSec, 0);
  const totalSessions   = Math.max(...entries.map(e => e.sessions));

  return (
    <div style={{ padding: "12px 16px 40px", display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Summary row */}
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { label: T("statsTitle"), value: fmtSec(totalSessionSec) },
          { label: T("statsDone"), value: entries.length },
          { label: T("statsSessions"), value: totalSessions },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: "#151208", border: "1px solid #2A1E08", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#C8873A", fontFamily: "monospace" }}>{s.value}</div>
            <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8D8D9C", marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Per-exercise bars */}
      <div style={{ background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid #1A1A1A" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8D8D9C" }}>{T("statsMostPractised")}</span>
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
            <div style={{ fontSize: 10, color: "#8D8D9C", marginTop: 4 }}>{T("sessionsCount", e.sessions)}</div>
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
          <div style={{ fontSize: 11, color: "#B08A8A", marginBottom: 12 }}>{T("statsConfirmMsg")}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setConfirmClear(false)}
              style={{ flex: 1, background: "#222", border: "1px solid #333", borderRadius: 8, padding: "9px", color: "#AEB0C0", fontSize: 12, cursor: "pointer" }}
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

// ─── BADGES SCREEN ────────────────────────────────────────────────────────────
function BadgesScreen({ badges, stats, subProgress, exercises, practiceDays }) {
  const T = useT();
  const lang = useLang();
  const ctx = { stats, subProgress, exercises, practiceDays };

  function fmtHours(sec) {
    const h = sec / 3600;
    return h >= 1 ? `${Math.floor(h * 10) / 10}h` : `${Math.round(sec / 60)}m`;
  }

  return (
    <div style={base.staticArea(24)}>
      <div style={{ textAlign: "center", padding: "4px 8px 12px" }}>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{T("badgesIntro")}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {BADGE_IDS.map(id => {
          const unlocked = !!badges[id];
          const cond = BADGE_CONDITIONS[id];
          const prog = !unlocked && cond && cond.progress ? cond.progress(ctx) : null;
          return (
            <div key={id} style={{ background: C.surface, border: `1px solid ${unlocked ? C.amber + "55" : C.border}`, borderRadius: 12, padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8 }}>
              <RosetteBadge unlocked={unlocked} size={64} icon={badgeIcon(id)} />
              <div style={{ fontSize: 12, fontWeight: 700, color: unlocked ? C.cream : C.muted }}>{badgeName(id, lang)}</div>
              <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.4 }}>{badgeDesc(id, lang)}</div>
              {prog && (
                <div style={{ width: "100%", marginTop: 2 }}>
                  <div style={{ height: 4, background: C.faint, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${Math.min(100, Math.round((prog.current / prog.target) * 100))}%`, background: C.amber, borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 9, color: C.muted, marginTop: 3, fontFamily: "monospace" }}>
                    {prog.unit === "days" ? `${prog.current}/${prog.target} ${T("daysLabel")}` : `${fmtHours(prog.current)} / ${fmtHours(prog.target)}`}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
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
// The actual exercise/category list lives in exercises-data.js (loaded via a
// <script> tag before this app code runs), so it can be hand-edited without
// touching this file. Fall back to empty lists if that file somehow failed to
// load, so the app still boots (the user can still add exercises manually).
const DEFAULT_CATEGORIES = (window.EXERCISES_DATA && window.EXERCISES_DATA.categories) || [];
const DEFAULT_EXERCISES = (window.EXERCISES_DATA && window.EXERCISES_DATA.exercises) || [];

// ─── TRANSLATIONS FOR BUILT-IN EXERCISES ──────────────────────────────────────
// Categories/exercises/sub-exercises can carry extra language fields directly
// in exercises-data.js (e.g. name_fr, description_fr, label_fr) — see that
// file for the editable bilingual data. These lookup tables index the
// original entries by id, so exerciseName()/exerciseDesc()/categoryName()/
// subExerciseLabel() below can find the right translation.
const CATEGORY_DEFS = {};
DEFAULT_CATEGORIES.forEach(cat => { CATEGORY_DEFS[cat.id] = cat; });
const EXERCISE_DEFS = {};
DEFAULT_EXERCISES.forEach(ex => { EXERCISE_DEFS[ex.id] = ex; });
const SUBEXERCISE_DEFS = {};
DEFAULT_EXERCISES.forEach(ex => {
  (ex.subExercises || []).forEach(sub => { if (!SUBEXERCISE_DEFS[sub.id]) SUBEXERCISE_DEFS[sub.id] = sub; });
});

// Look up the translated name/description for a built-in exercise (by id or exerciseId).
// Only applied while the stored text still matches the original default text —
// if the user has renamed/edited it, their text is kept as-is in any language.
// Custom user-created exercises have no matching def and always fall back to stored text.
function exerciseName(ex, lang) {
  if (!ex) return "";
  const id = ex.exerciseId || ex.id;
  const def = EXERCISE_DEFS[id];
  if (def && ex.name === def.name && def[`name_${lang}`]) return def[`name_${lang}`];
  return ex.name;
}
function exerciseDesc(ex, lang) {
  if (!ex) return "";
  const id = ex.exerciseId || ex.id;
  const def = EXERCISE_DEFS[id];
  if (def && ex.description === def.description && def[`description_${lang}`]) return def[`description_${lang}`];
  return ex.description;
}
function categoryName(cat, lang) {
  if (!cat) return "";
  const def = CATEGORY_DEFS[cat.id];
  if (def && cat.name === def.name && def[`name_${lang}`]) return def[`name_${lang}`];
  return cat.name;
}
function subExerciseLabel(sub, lang) {
  if (!sub) return "";
  const def = SUBEXERCISE_DEFS[sub.id];
  if (def && sub.label === def.label && def[`label_${lang}`]) return def[`label_${lang}`];
  return sub.label;
}

const ICONS =["🎸","🎵","🎶","🎤","🎷","🎺","🥁","🎹","⚡","🔥","🌟","💥","🤘","✋","🕷️","🐛","🔨","〰️","🤚","🔵","📝","▶️","👂","🏆","🎯","⚙️","🧠","💡","🎯","🎼"];

// ─── BADGES ───────────────────────────────────────────────────────────────────
// Badge text/icons come from Rewards/badges-data.js (loaded via a <script> tag
// before this app code runs), so they can be hand-edited like exercises-data.js.
// The unlock CONDITIONS below are app logic and live here — each is a function
// of { stats, subProgress, exercises, practiceDays } returning true once earned.
const BADGE_DEFS = window.BADGES_DATA || [];
const BADGE_IDS = BADGE_DEFS.map(b => b.id);

function badgeName(id, lang) {
  const def = BADGE_DEFS.find(b => b.id === id);
  if (!def) return id;
  return def[`name_${lang}`] || def.name;
}
function badgeDesc(id, lang) {
  const def = BADGE_DEFS.find(b => b.id === id);
  if (!def) return "";
  return def[`description_${lang}`] || def.description;
}
function badgeIcon(id) {
  const def = BADGE_DEFS.find(b => b.id === id);
  return (def && def.icon) || "🎸";
}

function totalPracticeSec(stats) {
  return Object.values(stats).reduce((s, e) => s + (e.totalSec || 0), 0);
}
// Longest run of consecutive calendar days (YYYY-MM-DD strings) present in `days`.
function longestDayStreak(days) {
  const sorted = Array.from(new Set(days)).sort();
  if (sorted.length === 0) return 0;
  let best = 1, run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prevMs = new Date(sorted[i - 1] + "T00:00:00").getTime();
    const curMs  = new Date(sorted[i] + "T00:00:00").getTime();
    const diffDays = Math.round((curMs - prevMs) / 86400000);
    run = diffDays === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return best;
}
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const HOUR = 3600;
// Each condition: (ctx: { stats, subProgress, exercises, practiceDays }) => boolean.
// `progress` (optional) returns { current, target } for a simple numeric display
// in the Badges screen while the badge is still locked.
const BADGE_CONDITIONS = {
  "play-1h":  { goal: 1 * HOUR,  check: ctx => totalPracticeSec(ctx.stats) >= 1 * HOUR,
                progress: ctx => ({ current: totalPracticeSec(ctx.stats), target: 1 * HOUR }) },
  "play-6h":  { goal: 6 * HOUR,  check: ctx => totalPracticeSec(ctx.stats) >= 6 * HOUR,
                progress: ctx => ({ current: totalPracticeSec(ctx.stats), target: 6 * HOUR }) },
  "play-15h": { goal: 15 * HOUR, check: ctx => totalPracticeSec(ctx.stats) >= 15 * HOUR,
                progress: ctx => ({ current: totalPracticeSec(ctx.stats), target: 15 * HOUR }) },
  "streak-3": { check: ctx => longestDayStreak(ctx.practiceDays) >= 3,
                progress: ctx => ({ current: Math.min(longestDayStreak(ctx.practiceDays), 3), target: 3, unit: "days" }) },
  "spider-2h": { goal: 2 * HOUR, check: ctx => (ctx.stats["warm3"]?.totalSec || 0) >= 2 * HOUR,
                 progress: ctx => ({ current: ctx.stats["warm3"]?.totalSec || 0, target: 2 * HOUR }) },
  "scale-complete": {
    check: ctx => ctx.exercises.some(ex => ex.categoryId === "cat-scales" && (ex.subExercises || []).length > 0
      && (ctx.subProgress[ex.id] || []).length >= ex.subExercises.length),
  },
};

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

const C = { bg: "#0F0F0F", surface: "#151515", border: "#1E1E1E", amber: "#C8873A", amberDim: "#6B3A0A", cream: "#F5EDD6", muted: "#8D8D9C", navInactive: "#8D8D9C", faint: "#1A1A1A" };

// Display size setting: a single CSS `zoom` factor scales the whole app
// (text, icons, spacing) uniformly without touching every font-size value.
const DISPLAY_ZOOM = { small: 0.95, medium: 1.15, large: 1.35 };

const base = {
  // The whole app is a fixed-height flex column: header (flexShrink:0) +
  // content (flex:1, its own overflow) + bottom nav (flexShrink:0). This
  // replaces the old calc(100dvh - Npx) magic numbers, which broke under the
  // "large" display-size CSS zoom because a fixed pixel offset doesn't scale
  // the same way as the zoomed viewport.
  app: { background: C.bg, margin: "0 auto", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.cream, position: "relative", display: "flex", flexDirection: "column", overflow: "hidden" },
  header: { background: "linear-gradient(180deg,#1A1208 0%,#0F0F0F 100%)", padding: "14px 20px 10px", borderBottom: "1px solid #2A2008", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 },
  iconBtn: (col) => ({ background: "none", border: "none", color: col || C.muted, fontSize: 18, cursor: "pointer", padding: "4px 6px", borderRadius: 6, display: "flex", alignItems: "center" }),
  // Bottom tab bar: the single primary navigation surface for the whole app.
  bottomNav: { display: "flex", background: "#0A0A0A", borderTop: `1px solid ${C.border}`, flexShrink: 0, paddingBottom: "env(safe-area-inset-bottom, 0px)" },
  bottomNavBtn: (active, col) => ({ flex: 1, padding: "8px 4px 7px", background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, color: active ? (col || C.amber) : C.navInactive, fontSize: 10, fontWeight: active ? 700 : 500, letterSpacing: "0.02em", cursor: "pointer", position: "relative" }),
  // Self-scrolling content region: a direct child of the app's content slot
  // (flex:1, minHeight:0 lets it shrink to the available space instead of
  // overflowing it, and overflowY:auto scrolls only this region).
  scrollArea: (pb) => ({ flex: 1, minHeight: 0, overflowY: "auto", padding: `8px 16px ${pb||24}px`, display: "flex", flexDirection: "column", gap: 8 }),
  // Non-scrolling content block: for screens nested inside another element
  // that already owns the scrolling (e.g. the Progression sub-tabs).
  staticArea: (pb) => ({ padding: `8px 16px ${pb||24}px`, display: "flex", flexDirection: "column", gap: 8 }),
  catChip: (a, col) => ({ padding: "5px 13px", borderRadius: 20, border: `1px solid ${a ? col : "#2A2A2A"}`, background: a ? col+"22" : "transparent", color: a ? col : "#AEB0C0", fontSize: 12, fontWeight: a ? 600 : 400, cursor: "pointer", whiteSpace: "nowrap" }),
  exCard: (col) => ({ background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${col}`, borderRadius: 10, padding: "11px 13px", display: "flex", alignItems: "center", gap: 11, cursor: "pointer", userSelect: "none" }),
  pillBtn: (primary) => ({ padding: primary ? "13px" : "10px 16px", borderRadius: 10, border: primary ? "none" : `1px solid #2A2A2A`, background: primary ? `linear-gradient(135deg,${C.amber},#A86020)` : C.surface, color: primary ? "#0F0F0F" : "#AEB0C0", fontSize: primary ? 14 : 12, fontWeight: primary ? 800 : 500, cursor: "pointer", letterSpacing: "0.06em", width: primary ? "100%" : "auto" }),
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

// ─── BADGES ───────────────────────────────────────────────────────────────────
// A small guitar-rosette graphic used for every badge — all 6 share this same
// shape, differing only by locked/unlocked styling and center icon.
function RosetteBadge({ unlocked, size = 64, icon }) {
  const petals = 16;
  const cx = size / 2, cy = size / 2;
  const outerR = size / 2 - 3;
  const innerR = size * 0.3;
  const ringColor = unlocked ? C.amber : "#3A3A3A";
  const tickColor = unlocked ? C.cream : "#2E2E2E";
  const centerFill = unlocked ? "#1A1208" : "#161616";
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={outerR} fill="none" stroke={ringColor} strokeWidth={Math.max(2, size * 0.03)} />
        {Array.from({ length: petals }).map((_, i) => {
          const angle = (i / petals) * Math.PI * 2;
          const x1 = cx + Math.cos(angle) * (outerR - size * 0.09);
          const y1 = cy + Math.sin(angle) * (outerR - size * 0.09);
          const x2 = cx + Math.cos(angle) * (outerR - size * 0.02);
          const y2 = cy + Math.sin(angle) * (outerR - size * 0.02);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={tickColor} strokeWidth={Math.max(1.5, size * 0.035)} strokeLinecap="round" />;
        })}
        <circle cx={cx} cy={cy} r={innerR} fill={centerFill} stroke={ringColor} strokeWidth={Math.max(1, size * 0.02)} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, filter: unlocked ? "none" : "grayscale(1) opacity(0.5)" }}>
        {unlocked ? icon : "🔒"}
      </div>
    </div>
  );
}

// Full-screen celebration shown when a badge is newly unlocked: a brightening
// flash + confetti (reusing Fireworks) + a card naming the badge. Auto-dismisses,
// or tap anywhere to dismiss immediately.
function BadgeCelebration({ badgeId, lang, onDone }) {
  const T = useT();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 20);
    const t2 = setTimeout(() => setVisible(false), 2600);
    const t3 = setTimeout(() => onDone(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgeId]);

  return (
    <>
      <Fireworks active={true} />
      <div style={{ position: "fixed", inset: 0, zIndex: 290, background: "#F5EDD6", opacity: visible ? 0.35 : 0, transition: "opacity 0.4s ease-out", pointerEvents: "none" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onDone}>
        <div style={{ background: "#151208", border: `1px solid ${C.amber}55`, borderRadius: 18, padding: "28px 24px", textAlign: "center", maxWidth: 320, boxShadow: "0 10px 50px #000b",
          opacity: visible ? 1 : 0, transform: visible ? "scale(1) translateY(0)" : "scale(0.85) translateY(10px)", transition: "opacity 0.35s ease-out, transform 0.35s ease-out" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.amber, fontWeight: 800, marginBottom: 14 }}>{T("badgeUnlockedTitle")}</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <RosetteBadge unlocked size={84} icon={badgeIcon(badgeId)} />
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.cream, marginBottom: 6 }}>{badgeName(badgeId, lang)}</div>
          <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{badgeDesc(badgeId, lang)}</div>
        </div>
      </div>
    </>
  );
}

// ─── LEVELS ───────────────────────────────────────────────────────────────────
// Every minute of practice time (summed across all exercises, same source as
// the play-Xh badges) fills a single global XP gauge. The cost of each level
// grows — cheap at first (10 minutes for level 1→2), settling toward roughly
// 1 hour per level by the time you're deep into the hundreds, so "level N"
// stays a meaningful rough proxy for "about N hours practiced" long-term.
//
// cumMinutesForLevel(L) = minutes needed to have already reached level L.
// The algebra is tuned so cumMinutesForLevel(2) is exactly 10.
function cumMinutesForLevel(level) {
  if (level <= 1) return 0;
  return 60 * (level - 1) - 50 * Math.log2(level);
}
// Binary search the highest level whose requirement has been met.
function levelFromMinutes(totalMin) {
  let lo = 1, hi = 2;
  while (cumMinutesForLevel(hi) <= totalMin) hi *= 2;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (cumMinutesForLevel(mid) <= totalMin) lo = mid; else hi = mid - 1;
  }
  return lo;
}
// Full progress snapshot for a given amount of total practice minutes.
function levelInfo(totalMin) {
  const level = levelFromMinutes(Math.max(0, totalMin));
  const base  = cumMinutesForLevel(level);
  const next  = cumMinutesForLevel(level + 1);
  const span  = next - base;
  const into  = Math.max(0, totalMin - base);
  return {
    level, into, span,
    pct: span > 0 ? Math.max(0, Math.min(100, (into / span) * 100)) : 100,
    remainingMin: Math.max(0, next - totalMin),
  };
}

// Which instrument illustrates the player's current tier.
function instrumentForLevel(level) {
  if (level < 5)  return "cigarbox";
  if (level < 10) return "ukulele";
  if (level < 20) return "stratocaster";
  if (level < 40) return "telecaster";
  return "archtop";
}

// Five hand-drawn instrument silhouettes marking level tiers, from a rustic
// homemade cigar box guitar up to a premium jazz archtop — each is a full SVG
// illustration (not a photo), matching the app's other hand-built graphics.
function CigarBoxGuitarIcon({ size = 160 }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 200 340" role="img" aria-label="Cigar box guitar">
      <rect x="90" y="15" width="44" height="45" rx="6" fill="#6B4423" stroke="#3A230F" strokeWidth="3"/>
      <circle cx="140" cy="26" r="5" fill="#C8873A"/><circle cx="140" cy="38" r="5" fill="#C8873A"/><circle cx="140" cy="50" r="5" fill="#C8873A"/>
      <rect x="102" y="55" width="20" height="160" fill="#6B4423" stroke="#3A230F" strokeWidth="2" rx="3"/>
      <line x1="106" y1="75" x2="118" y2="75" stroke="#3A230F" strokeWidth="1.5"/>
      <line x1="106" y1="95" x2="118" y2="95" stroke="#3A230F" strokeWidth="1.5"/>
      <line x1="106" y1="115" x2="118" y2="115" stroke="#3A230F" strokeWidth="1.5"/>
      <line x1="106" y1="135" x2="118" y2="135" stroke="#3A230F" strokeWidth="1.5"/>
      <rect x="45" y="210" width="130" height="110" rx="6" fill="#8B5A2B" stroke="#3A230F" strokeWidth="3"/>
      <line x1="45" y1="234" x2="175" y2="234" stroke="#3A230F" strokeWidth="2"/>
      <circle cx="112" cy="278" r="15" fill="#1A1208"/>
      <line x1="107" y1="22" x2="107" y2="300" stroke="#F5EDD6" strokeWidth="1"/>
      <line x1="112" y1="22" x2="112" y2="300" stroke="#F5EDD6" strokeWidth="1"/>
      <line x1="117" y1="22" x2="117" y2="300" stroke="#F5EDD6" strokeWidth="1"/>
    </svg>
  );
}
function UkuleleIcon({ size = 160 }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 200 340" role="img" aria-label="Ukulele">
      <rect x="82" y="30" width="36" height="42" rx="8" fill="#D9A441" stroke="#8B5A2B" strokeWidth="3"/>
      <circle cx="74" cy="42" r="5" fill="#8B5A2B"/><circle cx="74" cy="58" r="5" fill="#8B5A2B"/>
      <circle cx="126" cy="42" r="5" fill="#8B5A2B"/><circle cx="126" cy="58" r="5" fill="#8B5A2B"/>
      <rect x="92" y="70" width="16" height="120" fill="#D9A441" stroke="#8B5A2B" strokeWidth="2" rx="3"/>
      <path d="M100,188 C72,188 56,212 58,236 C60,252 70,258 70,270 C70,296 82,322 100,322 C118,322 130,296 130,270 C130,258 140,252 142,236 C144,212 128,188 100,188 Z"
            fill="#E8D9B5" stroke="#8B5A2B" strokeWidth="3"/>
      <circle cx="100" cy="240" r="15" fill="#1A1208"/>
      <rect x="88" y="295" width="24" height="7" rx="2" fill="#5C3A1A"/>
      <line x1="94" y1="75" x2="94" y2="295" stroke="#5C3A1A" strokeWidth="1"/>
      <line x1="106" y1="75" x2="106" y2="295" stroke="#5C3A1A" strokeWidth="1"/>
    </svg>
  );
}
function StratocasterIcon({ size = 160 }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 200 340" role="img" aria-label="Stratocaster-style electric guitar">
      <g transform="rotate(-8 95 18)">
        <rect x="60" y="10" width="70" height="16" rx="4" fill="#4FC3F7" stroke="#1E7EA8" strokeWidth="2"/>
        <circle cx="66" cy="14" r="4" fill="#DDD"/><circle cx="80" cy="12" r="4" fill="#DDD"/><circle cx="94" cy="11" r="4" fill="#DDD"/>
        <circle cx="108" cy="11" r="4" fill="#DDD"/><circle cx="122" cy="12" r="4" fill="#DDD"/><circle cx="136" cy="14" r="4" fill="#DDD"/>
      </g>
      <rect x="90" y="35" width="20" height="150" fill="#3A2417" stroke="#1E140C" strokeWidth="2" rx="3"/>
      <path d="M100,180 C75,180 62,188 58,202 C45,196 25,204 22,222 C18,240 28,254 42,258 C32,272 34,296 52,310 C72,326 90,330 100,330 C110,330 128,326 148,310 C166,296 168,272 158,258 C172,254 182,240 178,222 C175,204 155,196 142,202 C138,188 125,180 100,180 Z"
            fill="#4FC3F7" stroke="#1E7EA8" strokeWidth="3"/>
      <rect x="88" y="225" width="24" height="7" rx="2" fill="#2A2A2A" transform="rotate(-3 100 228)"/>
      <rect x="88" y="248" width="24" height="7" rx="2" fill="#2A2A2A" transform="rotate(-3 100 251)"/>
      <rect x="88" y="271" width="24" height="7" rx="2" fill="#2A2A2A" transform="rotate(-3 100 274)"/>
      <rect x="90" y="300" width="20" height="10" rx="2" fill="#8A8A8A"/>
      <line x1="95" y1="30" x2="95" y2="304" stroke="#EEE" strokeWidth="1"/>
      <line x1="100" y1="30" x2="100" y2="304" stroke="#EEE" strokeWidth="1"/>
      <line x1="105" y1="30" x2="105" y2="304" stroke="#EEE" strokeWidth="1"/>
    </svg>
  );
}
function TelecasterIcon({ size = 160 }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 200 340" role="img" aria-label="Telecaster-style electric guitar">
      <rect x="60" y="10" width="70" height="15" rx="3" fill="#E0A94E" stroke="#8B5A2B" strokeWidth="2"/>
      <circle cx="66" cy="17" r="4" fill="#DDD"/><circle cx="80" cy="17" r="4" fill="#DDD"/><circle cx="94" cy="17" r="4" fill="#DDD"/>
      <circle cx="108" cy="17" r="4" fill="#DDD"/><circle cx="122" cy="17" r="4" fill="#DDD"/><circle cx="136" cy="17" r="4" fill="#DDD"/>
      <rect x="90" y="32" width="20" height="150" fill="#3A2417" stroke="#1E140C" strokeWidth="2" rx="3"/>
      <path d="M100,178 C130,178 150,185 150,200 C168,196 182,208 182,228 C182,248 168,262 150,262 L150,300 C150,318 130,332 100,332 C68,332 45,320 42,298 C28,292 22,272 30,254 C22,240 26,220 42,208 C46,190 70,178 100,178 Z"
            fill="#E0A94E" stroke="#8B5A2B" strokeWidth="3"/>
      <rect x="85" y="222" width="30" height="9" rx="1" fill="#2A2A2A" transform="rotate(8 100 226)"/>
      <rect x="90" y="252" width="24" height="9" rx="4" fill="#2A2A2A"/>
      <rect x="86" y="270" width="30" height="16" rx="2" fill="#8A8A8A"/>
      <line x1="95" y1="27" x2="95" y2="278" stroke="#EEE" strokeWidth="1"/>
      <line x1="100" y1="27" x2="100" y2="278" stroke="#EEE" strokeWidth="1"/>
      <line x1="105" y1="27" x2="105" y2="278" stroke="#EEE" strokeWidth="1"/>
    </svg>
  );
}
function ArchtopIcon({ size = 160 }) {
  return (
    <svg width={size} height={size * 1.7} viewBox="0 0 200 340" role="img" aria-label="Archtop jazz guitar">
      <path d="M75,8 C75,2 125,2 125,8 L128,30 L72,30 Z" fill="#A78BFA" stroke="#5B3FA0" strokeWidth="2"/>
      <circle cx="82" cy="16" r="3.5" fill="#DDD"/><circle cx="82" cy="24" r="3.5" fill="#DDD"/>
      <circle cx="100" cy="12" r="3.5" fill="#DDD"/><circle cx="100" cy="26" r="3.5" fill="#DDD"/>
      <circle cx="118" cy="16" r="3.5" fill="#DDD"/><circle cx="118" cy="24" r="3.5" fill="#DDD"/>
      <rect x="88" y="32" width="24" height="140" fill="#3A2417" stroke="#1E140C" strokeWidth="2" rx="3"/>
      <path d="M100,168 C55,168 22,195 20,235 C18,255 30,270 45,275 C35,295 45,325 80,335 C95,339 105,339 120,335 C155,325 165,295 155,275 C170,270 182,255 180,235 C178,195 145,168 100,168 Z"
            fill="#A78BFA" stroke="#5B3FA0" strokeWidth="3"/>
      <path d="M60,225 C64,215 62,245 68,258 C60,254 55,236 60,225 Z" fill="#1A1208"/>
      <path d="M140,225 C136,215 138,245 132,258 C140,254 145,236 140,225 Z" fill="#1A1208"/>
      <rect x="82" y="248" width="36" height="8" rx="2" fill="#3A2417"/>
      <rect x="86" y="230" width="28" height="14" rx="3" fill="#2A2A2A"/>
      <line x1="94" y1="30" x2="94" y2="252" stroke="#EEE" strokeWidth="1"/>
      <line x1="100" y1="30" x2="100" y2="252" stroke="#EEE" strokeWidth="1"/>
      <line x1="106" y1="30" x2="106" y2="252" stroke="#EEE" strokeWidth="1"/>
    </svg>
  );
}
const INSTRUMENT_ICONS = { cigarbox: CigarBoxGuitarIcon, ukulele: UkuleleIcon, stratocaster: StratocasterIcon, telecaster: TelecasterIcon, archtop: ArchtopIcon };

// Small header pill button showing the current level — visually distinct
// (rounded pill, gradient border) from the four square nav-icon buttons.
function LevelPill({ level, onClick }) {
  const T = useT();
  return (
    <button onClick={onClick} title={T("headerLevel")} style={{
      display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 999,
      background: "linear-gradient(135deg,#2A1D08,#1A1208)", border: `1px solid ${C.amber}88`,
      color: C.amber, fontSize: 14, fontWeight: 800, cursor: "pointer", flexShrink: 0, letterSpacing: "0.02em",
    }}>
      <span style={{ fontSize: 16 }}>🎸</span>{T("levelShort", level)}
    </button>
  );
}

// Badge counter shown next to the level pill: how many badges are unlocked
// so far, tapping it jumps straight to the Badges sub-tab in Progression.
function BadgeCountPill({ count, onClick }) {
  const T = useT();
  return (
    <button onClick={onClick} title={T("headerBadges")} style={{
      display: "flex", alignItems: "center", gap: 5, padding: "8px 12px", borderRadius: 999,
      background: "linear-gradient(135deg,#0A2A18,#0A1A10)", border: "1px solid #34D39988",
      color: "#34D399", fontSize: 13, fontWeight: 800, cursor: "pointer", flexShrink: 0, letterSpacing: "0.02em",
    }}>
      <span style={{ fontSize: 15 }}>🏅</span>{count}
    </button>
  );
}

// Toast shown every time an exercise is committed: the XP bar visibly fills
// by the amount just earned. If this commit crosses a level boundary, the bar
// first animates up to full, snaps back to empty, then fills the remainder —
// showing the gauge "rolling over" into the new level.
function XPGainPopup({ event, onDone }) {
  const T = useT();
  const before = levelInfo(event.beforeMin);
  const after  = levelInfo(event.afterMin);
  const leveledUp = after.level > before.level;
  const gainedMin = Math.max(1, Math.round(event.afterMin - event.beforeMin));
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const timers = [];
    // Durations doubled from the original (30/560/620/2400 and 30/1900) so
    // the gauge-fill animation reads clearly instead of flashing by.
    if (leveledUp) {
      timers.push(setTimeout(() => setStage(1), 60));
      timers.push(setTimeout(() => setStage(2), 1120));
      timers.push(setTimeout(() => setStage(3), 1240));
      timers.push(setTimeout(() => onDone(), 4800));
    } else {
      timers.push(setTimeout(() => setStage(1), 60));
      timers.push(setTimeout(() => onDone(), 3800));
    }
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event.id]);

  let widthPct, transition;
  if (!leveledUp) {
    widthPct = stage >= 1 ? after.pct : before.pct;
    transition = "width 1.8s cubic-bezier(.2,.8,.3,1)";
  } else if (stage <= 0) { widthPct = before.pct; transition = "none"; }
  else if (stage === 1) { widthPct = 100; transition = "width 1s cubic-bezier(.2,.8,.3,1)"; }
  else if (stage === 2) { widthPct = 0; transition = "none"; }
  else { widthPct = after.pct; transition = "width 1.4s cubic-bezier(.2,.8,.3,1)"; }

  const shownLevel = leveledUp && stage < 2 ? before.level : after.level;

  return (
    <div style={{ position: "fixed", top: 14, left: "50%", transform: "translateX(-50%)", zIndex: 250,
      width: "min(280px, 84vw)", background: "#151208ee", border: `1px solid ${C.amber}66`, borderRadius: 12,
      padding: "10px 14px", boxShadow: "0 6px 24px #000a", pointerEvents: "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.amber }}>{T("levelReachedLabel", shownLevel)}</span>
        <span style={{ fontSize: 11, color: C.cream }}>{T("xpGained", gainedMin)}</span>
      </div>
      <div style={{ height: 6, background: C.faint, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${widthPct}%`, background: `linear-gradient(90deg, ${C.amber}, #F5C97A)`, transition, borderRadius: 3 }} />
      </div>
    </div>
  );
}

// Full-screen celebration on level-up: brightening flash + confetti (reusing
// Fireworks) + a card announcing the new level, mirroring BadgeCelebration.
function LevelUpCelebration({ level, onDone }) {
  const T = useT();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 20);
    const t2 = setTimeout(() => setVisible(false), 2600);
    const t3 = setTimeout(() => onDone(), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);
  const Icon = INSTRUMENT_ICONS[instrumentForLevel(level)];

  return (
    <>
      <Fireworks active={true} />
      <div style={{ position: "fixed", inset: 0, zIndex: 290, background: "#F5EDD6", opacity: visible ? 0.35 : 0, transition: "opacity 0.4s ease-out", pointerEvents: "none" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onDone}>
        <div style={{ background: "#151208", border: `1px solid ${C.amber}55`, borderRadius: 18, padding: "28px 24px", textAlign: "center", maxWidth: 320, boxShadow: "0 10px 50px #000b",
          opacity: visible ? 1 : 0, transform: visible ? "scale(1) translateY(0)" : "scale(0.85) translateY(10px)", transition: "opacity 0.35s ease-out, transform 0.35s ease-out" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: C.amber, fontWeight: 800, marginBottom: 14 }}>{T("levelUnlockedTitle")}</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <Icon size={72} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.cream }}>{T("levelReachedLabel", level)}</div>
        </div>
      </div>
    </>
  );
}

// ─── LEVEL SCREEN ─────────────────────────────────────────────────────────────

function LevelScreen({ stats }) {
  const T = useT();
  const totalMin = totalPracticeSec(stats) / 60;
  const info = levelInfo(totalMin);
  const Icon = INSTRUMENT_ICONS[instrumentForLevel(info.level)];
  const remH = Math.floor(info.remainingMin / 60);
  const remM = Math.round(info.remainingMin % 60);

  return (
    <div style={{ ...base.staticArea(24), alignItems: "center" }}>
      <div style={{ textAlign: "center", padding: "4px 8px 4px" }}>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{T("levelIntro")}</div>
      </div>
      <Icon size={168} />
      <div style={{ fontSize: 26, fontWeight: 800, color: C.cream, marginTop: 6 }}>{T("levelReachedLabel", info.level)}</div>
      <div style={{ width: "100%", maxWidth: 320, marginTop: 14 }}>
        <div style={{ height: 10, background: C.faint, borderRadius: 5, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${info.pct}%`, background: `linear-gradient(90deg, ${C.amber}, #F5C97A)`, borderRadius: 5, transition: "width 0.4s ease-out" }} />
        </div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 8, textAlign: "center" }}>
          {T("timeToNext", remH, remM)}{info.level + 1}
        </div>
      </div>
    </div>
  );
}

// ─── PROGRESSION SCREEN (Niveau / Stats / Badges, merged under sub-tabs) ──────

function ProgressionScreen({ stats, exercises, onClearStats, badges, subProgress, practiceDays, subTab, setSubTab }) {
  const T = useT();
  const TABS = [
    { id: "level",  label: T("progressTabLevel") },
    { id: "stats",  label: T("progressTabStats") },
    { id: "badges", label: T("progressTabBadges") },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", gap: 6, padding: "10px 16px 4px", flexShrink: 0 }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            style={{
              flex: 1, padding: "8px 6px", borderRadius: 8, cursor: "pointer",
              border: `1px solid ${subTab === t.id ? C.amber : "#2A2A2A"}`,
              background: subTab === t.id ? "#C8873A22" : "transparent",
              color: subTab === t.id ? C.amber : C.navInactive,
              fontSize: 11, fontWeight: subTab === t.id ? 700 : 500,
              letterSpacing: "0.08em", textTransform: "uppercase",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
        {subTab === "level"  && <LevelScreen stats={stats} />}
        {subTab === "stats"  && <StatsScreen stats={stats} exercises={exercises} onClear={onClearStats} />}
        {subTab === "badges" && <BadgesScreen badges={badges} stats={stats} subProgress={subProgress} exercises={exercises} practiceDays={practiceDays} />}
      </div>
    </div>
  );
}

// ─── LIBRARY SCREEN ───────────────────────────────────────────────────────────

function LibraryScreen({ exercises, categories, tasks, onAdd, onRemove, stats, subProgress }) {
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
                const col = cat?.color || "#AEB0C0";
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
                      <div style={{ fontSize: 10, color: col, marginTop: 1, fontWeight: 600 }}>{categoryName(cat, lang)} · <span style={{ color: "#8FAF8F", fontWeight: 400 }}>{fmtSuggestTime(ex)}</span></div>
                    </div>
                    {added ? (
                      <button
                        onClick={e => { e.stopPropagation(); onRemove(ex.id); }}
                        style={{ width: 24, height: 24, borderRadius: "50%", background: "#F8717122",
                          border: "1px solid #F87171", color: "#F87171", fontSize: 15, fontWeight: 800,
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", padding: 0 }}
                      >×</button>
                    ) : (
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#C8873A22",
                        border: `1px solid ${C.amber}`, color: C.amber,
                        fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>+</div>
                    )}
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
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: cat?.color || "#AEB0C0", flexShrink: 0 }} />
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: cat?.color || "#AEB0C0" }}>{cat ? categoryName(cat, lang) : T("unknownCategory")}</span>
                    <div style={{ flex: 1, height: 1, background: (cat?.color || "#AEB0C0") + "33" }} />
                  </div>
                );
              }
              const ex = item.ex;
              const cat = categories.find(c => c.id === ex.categoryId);
              const col = cat?.color || "#AEB0C0";
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
                  {added ? (
                    <button
                      onClick={e => { e.stopPropagation(); onRemove(ex.id); }}
                      style={{ width: 26, height: 26, borderRadius: "50%", background: "#F8717122",
                        border: "1px solid #F87171", color: "#F87171", fontSize: 17, fontWeight: 800,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", padding: 0 }}
                    >×</button>
                  ) : (
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#C8873A22",
                      border: `1px solid ${C.amber}`, color: C.amber,
                      fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>+</div>
                  )}
                </div>
              );
            });
          }
          // Single category — flat list (category already obvious from filter)
          return filtered.map(ex => {
            const cat = categories.find(c => c.id === ex.categoryId);
            const col = cat?.color || "#AEB0C0";
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
                {added ? (
                  <button
                    onClick={e => { e.stopPropagation(); onRemove(ex.id); }}
                    style={{ width: 26, height: 26, borderRadius: "50%", background: "#F8717122",
                      border: "1px solid #F87171", color: "#F87171", fontSize: 17, fontWeight: 800,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", padding: 0 }}
                  >×</button>
                ) : (
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#C8873A22",
                    border: `1px solid ${C.amber}`, color: C.amber,
                    fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>+</div>
                )}
              </div>
            );
          });
        })()}
      </div>
    </>
  );
}

// ─── PRESETS SCREEN ───────────────────────────────────────────────────────────

// ─── SESSION SCREEN (task queue + collapsible presets) ────────────────────────

function SessionScreen({ tasks, setTasks, onStart, sessionInProgress, onReturnToSession, presets, setPresets }) {
  const T = useT();
  const lang = useLang();
  const [saveName, setSaveName] = useState("");
  const [saveOpen, setSaveOpen] = useState(false);
  const [presetsExpanded, setPresetsExpanded] = useState(false);
  const [deletePresetId, setDeletePresetId] = useState(null);
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
  const loadPreset = (preset) => {
    setTasks(preset.tasks.map(t => ({ ...t, id: uid() })));
    setPresetsExpanded(false);
  };
  const deletePreset = (id) => { setPresets(prev => prev.filter(p => p.id !== id)); setDeletePresetId(null); };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", padding: "8px 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>

        {/* Collapsible "Mes présélections" section — styled as a prominent,
            clearly-tappable button so presets are easy to spot at a glance. */}
        <div style={{ ...base.card, flexShrink: 0, background: "#1A1208", border: `1px solid ${C.amber}55` }}>
          <div onClick={() => setPresetsExpanded(e => !e)}
            style={{ padding: "13px 14px", borderBottom: presetsExpanded ? `1px solid ${C.amber}33` : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <span style={{ display: "inline-block", fontSize: 12, color: C.amber, transition: "transform 0.2s ease-out", transform: presetsExpanded ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
              <span style={{ fontSize: 22 }}>📁</span>
              <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", color: C.cream }}>{T("myPresetsTitle")}</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.amber, background: "#C8873A22", border: `1px solid ${C.amber}44`, borderRadius: 999, padding: "3px 10px", minWidth: 22, textAlign: "center" }}>{presets.length}</span>
          </div>
          {presetsExpanded && (
            <div style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
              {!saveOpen ? (
                <button
                  style={{ ...base.pillBtn(false), width: "100%", textAlign: "center", padding: "10px",
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

              {presets.length === 0 ? (
                <div style={{ textAlign: "center", padding: "20px 10px", color: "#8D8D9C" }}>
                  <div style={{ fontSize: 12, lineHeight: 1.6 }}>{T("noPresetsTitle")} {T("noPresetsSub")}</div>
                </div>
              ) : (
                presets.map(p => {
                  const totalMin = p.tasks.reduce((s, t) => s + (t.minutes || 0), 0);
                  const isDeleting = deletePresetId === p.id;
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
                            <button onClick={() => setDeletePresetId(p.id)} style={{ width: 28, height: 28, borderRadius: 7, background: "none", border: "1px solid #2A2A2A", color: C.muted, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
                          </div>
                        ) : (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button onClick={() => setDeletePresetId(null)} style={{ padding: "5px 10px", background: "#222", border: "1px solid #333", borderRadius: 7, color: "#AEB0C0", fontSize: 11, cursor: "pointer" }}>{T("keepBtn")}</button>
                            <button onClick={() => deletePreset(p.id)} style={{ padding: "5px 10px", background: "#3A0A0A", border: "1px solid #6A1A1A", borderRadius: 7, color: "#F87171", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{T("deleteBtn")}</button>
                          </div>
                        )}
                      </div>
                      <div style={{ padding: "6px 14px 10px", display: "flex", flexWrap: "wrap", gap: 5 }}>
                        {p.tasks.map((t, i) => (
                          <span key={i} style={{ fontSize: 10, background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 5, padding: "3px 7px", color: "#AEB0C0" }}>
                            {t.icon} {exerciseName(t, lang)} · {t.minutes}m
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Separator between the presets card and the current session queue */}
        <div style={{ height: 1, background: C.faint, margin: "2px 0", flexShrink: 0 }} />

        {/* Task queue */}
        {tasks.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#8D8D9C" }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>🎸</div>
            <div style={{ fontSize: 13, lineHeight: 1.8 }}>
              {T("emptySession")}<br />
              {T("emptySessionSub")}
            </div>
          </div>
        ) : (
          tasks.map((task, i) => (
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
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#2A2A2A", color: "#C9A876", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 15, flexShrink: 0 }}>{task.icon}</span>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>{exerciseName(task, lang)}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <button style={{ width: 22, height: 22, borderRadius: "50%", background: "#222", border: `1px solid #333`, color: C.cream, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }} onClick={() => upd(task.id, -1)}>−</button>
                <span style={{ fontSize: 13, fontFamily: "monospace", color: C.amber, width: 34, textAlign: "center", fontWeight: 700 }}>{task.minutes}m</span>
                <button style={{ width: 22, height: 22, borderRadius: "50%", background: "#222", border: `1px solid #333`, color: C.cream, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }} onClick={() => upd(task.id, 1)}>+</button>
              </div>
              <button style={{ width: 22, height: 22, borderRadius: "50%", background: "none", border: `1px solid #2A2A2A`, color: "#F87171", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }} onClick={() => rm(task.id)}>×</button>
            </div>
          ))
        )}
      </div>

      {/* Footer — normal flow, no longer viewport-fixed */}
      <div style={{ flexShrink: 0, padding: "10px 16px 16px", background: "linear-gradient(0deg,#0A0A0A 85%,transparent)" }}>
        {tasks.length > 0 && (
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted }}>{T("totalSessionTime")}</div>
            <div style={{ fontSize: 24, fontFamily: "monospace", fontWeight: 700, color: C.amber }}>{formatTotalMin(totalSec)}</div>
            <div style={{ fontSize: 11, color: C.muted }}>{T("exercisesCount", tasks.length)}</div>
          </div>
        )}
        <div style={{ display: "flex", gap: 8 }}>
          {sessionInProgress ? (
            <button style={{ ...base.pillBtn(true), flex: 1, background: "linear-gradient(135deg,#34D399,#059669)" }} onClick={onReturnToSession}>{T("returnToSession")}</button>
          ) : (
            <button style={{ ...base.pillBtn(true), flex: 1 }} onClick={onStart} disabled={tasks.length === 0}>{T("startSession")}</button>
          )}
        </div>
      </div>
    </div>
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
  // Sub-exercise checklist is collapsed by default (just the title + count),
  // and re-collapses whenever the current exercise changes.
  const [subExpanded, setSubExpanded] = useState(false);
  useEffect(() => { setSubExpanded(false); }, [current]);

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
        <div style={{ fontSize: 11, color: "#8FAF8F", marginBottom: 28 }}>{T("consistency")}</div>
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
      <div style={{ flex: 1, minHeight: 0, padding: "14px 16px 24px", display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
        {/* Timer card */}
        <div style={{ background: "#151208", border: "1px solid #2A1E08", borderRadius: 16, padding: "22px 18px", textAlign: "center", flexShrink: 0 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#A8926A", marginBottom: 3 }}>
            {T("exerciseOf2")} {current + 1} {T("of2")} {tasks.length}
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: C.cream, marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.25 }}>
            {currentTask?.icon} {exerciseName(currentTask, lang)}
          </div>
          <div style={{ fontSize: 58, fontFamily: "monospace", fontWeight: 700, lineHeight: 1, marginBottom: 6, animation: urgent ? "urgentPulse 0.7s ease-in-out infinite" : "none", color: C.amber }}>
            {formatTime(secondsLeft)}
          </div>
          <div style={{ fontSize: 10, color: "#A8926A", letterSpacing: "0.1em", textTransform: "uppercase" }}>{T("remaining")}</div>
          <div style={{ height: 4, background: "#1E1E1E", borderRadius: 2, margin: "14px 0 0", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${taskPct}%`, background: urgent ? "linear-gradient(90deg,#6B0A0A,#F87171)" : "linear-gradient(90deg,#6B3A0A,#C8873A)", borderRadius: 2, transition: "width 1s linear, background 0.3s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", rowGap: 10, columnGap: 10, marginTop: 18 }}>
            <button
              style={{ ...base.pillBtn(false), fontSize: 13, padding: "9px 13px", display: "flex", alignItems: "center", gap: 5, opacity: current === 0 ? 0.4 : 1, cursor: current === 0 ? "default" : "pointer" }}
              onClick={goBack}
              disabled={current === 0}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              {T("previousBtn")}
            </button>
            <button style={{ ...base.pillBtn(false), fontSize: 13, padding: "9px 13px", display: "flex", alignItems: "center", gap: 5 }} onClick={skip}>
              {T("skipBtn")}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            <button
              style={{
                ...base.pillBtn(true), width: "auto", padding: "11px 22px", fontSize: 14,
                background: running
                  ? "linear-gradient(135deg,#34D399,#1F9C6E)"
                  : hasStarted
                    ? "linear-gradient(135deg,#4FC3F7,#1E7EA8)"
                    : `linear-gradient(135deg,${C.amber},#A86020)`,
              }}
              onClick={() => { setRunning(r => !r); setHasStarted(true); }}
            >
              {running ? T("pauseBtn") : hasStarted ? T("resumePlayBtn") : T("playBtn")}
            </button>
          </div>
          {/* Metronome — on/off toggle always available; BPM & time signature
              only shown once switched on, adjustable live for this exercise. */}
          <div style={{ marginTop: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setMetroOn(m => !m)}
              style={{ padding: "8px 18px", borderRadius: 8, border: `1px solid ${metroOn ? "#34D399" : "#2A2A2A"}`,
                background: metroOn ? "#34D39922" : "#1A1A1A", color: metroOn ? "#34D399" : C.muted,
                fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
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
            <div style={{ ...base.card, flexShrink: 0 }}>
              <div
                onClick={() => setSubExpanded(e => !e)}
                style={{ padding: "10px 14px", borderBottom: subExpanded ? `1px solid ${C.faint}` : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{ display: "inline-block", fontSize: 9, color: C.amber, transition: "transform 0.2s ease-out", transform: subExpanded ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
                  <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted }}>{T("subExercisesTitle")}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 11, color: C.amber, fontWeight: 700 }}>{doneIds.length}/{currentTask.subExercises.length} {T("done")}</span>
                  {subExpanded && (!confirmResetSub ? (
                    doneIds.length > 0 && (
                      <button onClick={e => { e.stopPropagation(); setConfirmResetSub(true); }} style={{ background: "none", border: "none", color: C.muted, fontSize: 11, cursor: "pointer", padding: 0 }}>{T("resetProgress")}</button>
                    )
                  ) : (
                    <div style={{ display: "flex", gap: 6 }} onClick={e => e.stopPropagation()}>
                      <button onClick={() => setConfirmResetSub(false)} style={{ background: "none", border: "1px solid #333", borderRadius: 6, color: "#AEB0C0", fontSize: 10, cursor: "pointer", padding: "3px 7px" }}>{T("cancelBtn")}</button>
                      <button onClick={resetSubProgress} style={{ background: "#5A0A0A", border: "1px solid #8A1A1A", borderRadius: 6, color: "#F87171", fontSize: 10, fontWeight: 700, cursor: "pointer", padding: "3px 7px" }}>{T("resetProgressConfirm")}</button>
                    </div>
                  ))}
                </div>
              </div>
              {subExpanded && currentTask.subExercises.map(sub => {
                const checked = doneIds.includes(sub.id);
                return (
                  <div key={sub.id} onClick={() => toggleSub(sub.id)}
                    style={{ padding: "9px 14px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid #111`, cursor: "pointer" }}>
                    <div style={{ width: 18, height: 18, borderRadius: 5, border: `1.5px solid ${checked ? "#34D399" : "#3A3A3A"}`, background: checked ? "#34D399" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, color: "#0A0A0A", fontWeight: 900 }}>
                      {checked ? "✓" : ""}
                    </div>
                    <span style={{ flex: 1, fontSize: 13, color: checked ? "#5CB88A" : C.cream, textDecoration: checked ? "line-through" : "none" }}>
                      {subExerciseLabel(sub, lang)}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })()}

        {/* YouTube reference video */}
        <div style={{ flexShrink: 0 }}>
          <YouTubeCard videoId={extractYouTubeId(currentTask?.youtubeUrl)} />
        </div>

        {/* Setlist */}
        <div style={{ ...base.card, flexShrink: 0 }}>
          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${C.faint}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: C.muted }}>{T("sessionSetlist")}</span>
            <span style={{ fontSize: 11, color: C.amber, fontWeight: 700 }}>{current}/{tasks.length} {T("done")}</span>
          </div>
          {tasks.map((t, i) => {
            const st = i < current ? "done" : i === current ? "cur" : "up";
            return (
              <div key={t.id} style={{ padding: "9px 14px", display: "flex", alignItems: "center", gap: 9, borderBottom: `1px solid #111`, background: st === "cur" ? "#1A1208" : "transparent", opacity: st === "up" ? 0.4 : 1 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: st === "done" ? "#34D399" : st === "cur" ? C.amber : "#2A2A2A", flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 14, color: st === "done" ? "#5CB88A" : st === "cur" ? C.cream : C.muted, textDecoration: st === "done" ? "line-through" : "none" }}>{exerciseName(t, lang)}</span>
                {t.youtubeUrl && extractYouTubeId(t.youtubeUrl) && (
                  <span style={{ fontSize: 9, background: "#FF000044", color: "#FF6666", borderRadius: 3, padding: "1px 4px", fontWeight: 700, flexShrink: 0 }}>▶</span>
                )}
                <span style={{ fontSize: 12, fontFamily: "monospace", color: C.muted }}>{t.minutes}m</span>
              </div>
            );
          })}
          <div style={{ padding: "10px 14px", background: "#0A0A0A" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted }}>{T("overallProgress")}</span>
              <span style={{ fontSize: 11, color: "#C9A876", fontFamily: "monospace" }}>{overallPct}%</span>
            </div>
            <div style={{ height: 3, background: C.faint, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overallPct}%`, background: C.amber + "55", borderRadius: 2, transition: "width 0.5s" }} />
            </div>
          </div>
        </div>

        {/* Back to menu */}
        <button style={{ ...base.pillBtn(false), width: "100%", textAlign: "center", color: C.muted, fontSize: 12, flexShrink: 0 }} onClick={() => { flushStats(current); onBackToMenu(); }}>
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
  // Show the translated name/description/sub-exercise labels for editing
  // (so a French user editing a built-in exercise sees French text), but
  // remember the original stored text alongside each field. On save, a
  // field is only persisted as-typed if it was actually changed from what
  // was displayed — otherwise the original canonical (English) text is
  // kept, so translations keep working after switching languages again.
  const [form, setForm] = useState(
    isNew
      ? { name: "", description: "", defaultMin: 10, icon: "🎸", categoryId: categories[0]?.id || "", youtubeUrl: "", bpm: 0, beatsPerBar: 4, subExercises: [] }
      : {
          ...editEx,
          name: exerciseName(editEx, lang),
          description: exerciseDesc(editEx, lang) || "",
          youtubeUrl: editEx.youtubeUrl || "", bpm: editEx.bpm || 0, beatsPerBar: editEx.beatsPerBar || 4,
          subExercises: (editEx.subExercises || []).map(s => ({ id: s.id, label: subExerciseLabel(s, lang), _origLabel: s.label })),
        }
  );
  const [iconPicker, setIconPicker] = useState(false);
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.name.trim()) return;
    let finalName = form.name;
    let finalDesc = form.description;
    let finalSub = (form.subExercises || []).filter(s => s.label.trim());
    if (!isNew) {
      if (form.name === exerciseName(editEx, lang)) finalName = editEx.name;
      if (form.description === exerciseDesc(editEx, lang)) finalDesc = editEx.description;
      finalSub = finalSub.map(s => {
        if (s._origLabel !== undefined && s.label === subExerciseLabel({ id: s.id, label: s._origLabel }, lang)) {
          return { id: s.id, label: s._origLabel };
        }
        return { id: s.id, label: s.label };
      });
    } else {
      finalSub = finalSub.map(s => ({ id: s.id, label: s.label }));
    }
    const cleaned = { ...form, name: finalName, description: finalDesc, defaultMin: Number(form.defaultMin), subExercises: finalSub };
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
  const lang = useLang();
  const isNew = editCat === "new";
  const [form, setForm] = useState(isNew ? { name: "", color: COLOR_PALETTE[0] } : { ...editCat, name: categoryName(editCat, lang) });
  const setF = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const save = () => {
    if (!form.name.trim()) return;
    // Only keep the user's edit if it actually differs from the translated
    // text that was displayed — otherwise preserve the original canonical
    // name so translations keep working after switching languages again.
    const finalName = (!isNew && form.name === categoryName(editCat, lang)) ? editCat.name : form.name;
    const finalForm = { ...form, name: finalName };
    if (isNew) {
      setCategories(prev => [...prev, { ...finalForm, id: uid() }]);
    } else {
      setCategories(prev => prev.map(c => c.id === form.id ? finalForm : c));
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

function SettingsScreen({ exercises, setExercises, categories, setCategories, volume, onVolumeChange, lang, onLangChange, displaySize, onDisplaySizeChange, onResetBadges }) {
  const T = useT();
  const [section, setSection] = useState("exercises");
  const [editEx, setEditEx]   = useState(null);  // null | "new" | exercise object
  const [editCat, setEditCat] = useState(null);  // null | "new" | category object
  const [confirmResetBadges, setConfirmResetBadges] = useState(false);

  // The exercise/category editor has no visible tab bar to go back with, so
  // it's exactly the kind of screen where a phone's back button/gesture would
  // otherwise leave the app entirely. Trap it here to just close the editor.
  useEffect(() => {
    if (!editEx && !editCat) return;
    history.pushState({ practiceProdigyEditorOpen: true }, "");
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
        {[["exercises", T("settingsExercises")], ["categories", T("settingsCategories")], ["sound", T("settingsSound")], ["language", T("settingsLanguage")], ["display", T("settingsDisplay")], ["badges", T("settingsBadges")]].map(([id, label]) => (
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

      {section === "badges" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={base.card}>
            <div style={{ padding: "14px 16px" }}>
              <label style={{ ...base.label, margin: 0 }}>{T("resetBadgesLabel")}</label>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4, marginBottom: 12 }}>{T("resetBadgesDesc")}</div>
              {!confirmResetBadges ? (
                <button
                  onClick={() => setConfirmResetBadges(true)}
                  style={{ width: "100%", background: "none", border: "1px solid #3A1A1A", borderRadius: 8, padding: "9px", color: "#F87171", fontSize: 12, cursor: "pointer", textAlign: "center" }}
                >{T("resetBadgesLabel")}</button>
              ) : (
                <div style={{ background: "#1A0A0A", border: "1px solid #5A1A1A", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#F87171", marginBottom: 4 }}>{T("resetBadgesConfirmTitle")}</div>
                  <div style={{ fontSize: 11, color: "#B08A8A", marginBottom: 12 }}>{T("resetBadgesConfirmMsg")}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setConfirmResetBadges(false)} style={{ flex: 1, background: "#222", border: "1px solid #333", borderRadius: 8, padding: "9px", color: "#AEB0C0", fontSize: 12, cursor: "pointer" }}>{T("cancelBtn")}</button>
                    <button onClick={() => { onResetBadges(); setConfirmResetBadges(false); }} style={{ flex: 1, background: "#5A0A0A", border: "1px solid #8A1A1A", borderRadius: 8, padding: "9px", color: "#F87171", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{T("statsConfirmYes")}</button>
                  </div>
                </div>
              )}
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
  // Badges unlocked so far: { [badgeId]: true }. Once set, a badge is never
  // cleared automatically — only the explicit "reset badges" action in
  // Settings removes entries, matching "stays unlocked until reinstalled".
  const [badges, setBadges, badgesLoaded] = usePersisted("badges", {});
  // Calendar days (YYYY-MM-DD, deduped) on which at least one exercise was
  // practiced, used for the "3-day streak" badge.
  const [practiceDays, setPracticeDays] = usePersisted("practiceDays", []);
  // Queue of badge ids waiting to show their unlock celebration, so unlocking
  // several at once still shows them one at a time instead of overlapping.
  const [badgeCelebrationQueue, setBadgeCelebrationQueue] = useState([]);
  // Queue of newly-reached levels waiting for their celebration overlay.
  const [levelUpQueue, setLevelUpQueue] = useState([]);
  // Most recent XP gain (before/after total practice minutes), driving the
  // gauge-fill toast shown every time an exercise is committed.
  const [xpGain, setXpGain] = useState(null);
  // Which Progression sub-tab is showing — lifted up here (rather than local
  // state inside ProgressionScreen) so the header's level/badge pills can
  // jump straight to a specific sub-tab even if Progression is already open.
  const [progressSubTab, setProgressSubTab] = useState("level");
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
    // XP is simply total practice time, so every commit's before/after totals
    // can be computed directly here — no need to wait for the stats update to
    // land, and no risk of falsely firing on initial load (this only ever
    // runs from a real practice-time commit, never from a stats-load effect).
    const beforeMin = totalPracticeSec(stats) / 60;
    const afterMin  = beforeMin + elapsedSec / 60;
    const beforeLevel = levelFromMinutes(beforeMin);
    const afterLevel  = levelFromMinutes(afterMin);
    setXpGain({ id: uid(), beforeMin, afterMin });
    if (afterLevel > beforeLevel) {
      setLevelUpQueue(q => [...q, afterLevel]);
    }
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
    const today = todayStr();
    setPracticeDays(prev => (prev.includes(today) ? prev : [...prev, today]));
  }, [stats, setStats, setPracticeDays]);

  // Check every badge's unlock condition whenever the stats it depends on
  // change. Newly-met goals are persisted immediately and queued for a
  // celebration; already-unlocked badges are never re-evaluated (a badge
  // stays earned even if, say, stats are later reset).
  useEffect(() => {
    const ctx = { stats, subProgress, exercises, practiceDays };
    const toUnlock = BADGE_IDS.filter(id => {
      const cond = BADGE_CONDITIONS[id];
      return cond && !badges[id] && cond.check(ctx);
    });
    if (toUnlock.length > 0) {
      setBadges(prev => {
        const next = { ...prev };
        toUnlock.forEach(id => { next[id] = true; });
        return next;
      });
      setBadgeCelebrationQueue(prev => [...prev, ...toUnlock]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats, subProgress, practiceDays, exercises]);

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

  const removeExerciseFromSession = (exerciseId) => {
    setTasks(prev => prev.filter(t => t.exerciseId !== exerciseId));
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
  const sessionInProgress = sessionActive && !sessionDone;
  const currentLevel = levelFromMinutes(totalPracticeSec(stats) / 60);
  const unlockedBadgeCount = Object.keys(badges).length;
  const sessionTabActive = tab === "session" || tab === "active";
  // CSS `zoom` magnifies the rendered box beyond its own layout size, so a
  // 100dvh-tall element zoomed to 1.35x would visually spill 35% past the
  // real viewport. Dividing height/maxWidth by the same factor before zoom
  // is applied cancels that out, keeping the app exactly viewport-sized (and
  // its internal flex proportions untouched) at every display size.
  const zoomFactor = DISPLAY_ZOOM[displaySize] || 1;

  return (
    <LangContext.Provider value={lang}>
    <div style={{ ...base.app, zoom: zoomFactor, height: `calc(100dvh / ${zoomFactor})`, maxWidth: `calc(430px / ${zoomFactor})` }} onClick={ensureAudio}>
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

      {/* Header — minimal: logo + level pill, and an End-session shortcut while a session is running */}
      <div style={base.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="icon-192.png" alt="Practice Prodigy" style={{ width: 38, height: 38, borderRadius: 9, display: "block", flexShrink: 0 }} />
          <div style={{ width: 1, height: 26, background: "#2A2008", flexShrink: 0 }} />
          <LevelPill level={currentLevel} onClick={() => { setProgressSubTab("level"); setTab("progress"); }} />
          <BadgeCountPill count={unlockedBadgeCount} onClick={() => { setProgressSubTab("badges"); setTab("progress"); }} />
        </div>
        {tab === "active" && sessionActive && (
          <button style={{ ...base.pillBtn(false), fontSize: 12, color: C.muted }} onClick={backToMenu}>
            {T("headerEnd")}
          </button>
        )}
      </div>

      {/* Paused-session banner — shown everywhere except the active session screen itself */}
      {sessionInProgress && tab !== "active" && (
        <div style={{ background: "#0D1A0D", borderBottom: "1px solid #2A5A2A", padding: "8px 16px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399", flexShrink: 0, display: "inline-block" }} />
          <span style={{ fontSize: 12, color: "#34D399", flex: 1, fontWeight: 600 }}>
            {T("sessionPaused")} · {exerciseName(tasks[sessionCurrent], lang)}
          </span>
          <button onClick={returnToSession} style={{ fontSize: 11, background: "#34D39922", border: "1px solid #34D39966", borderRadius: 6, color: "#34D399", padding: "4px 10px", cursor: "pointer", fontWeight: 700 }}>
            {T("resumeBtn")}
          </button>
        </div>
      )}

      {/* Content — the single sizing box for the active screen; each screen
          fills it (flex:1, minHeight:0) and owns its own scrolling. */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {tab === "library"  && <LibraryScreen exercises={exercises} categories={categories} tasks={tasks} onAdd={addExercise} onRemove={removeExerciseFromSession} stats={stats} subProgress={subProgress} />}
      {tab === "session"  && <SessionScreen tasks={tasks} setTasks={setTasks} onStart={startSession} sessionInProgress={sessionInProgress} onReturnToSession={returnToSession} presets={presets} setPresets={setPresets} />}
      {tab === "progress" && <ProgressionScreen stats={stats} exercises={exercises} onClearStats={() => setStats({})} badges={badges} subProgress={subProgress} practiceDays={practiceDays} subTab={progressSubTab} setSubTab={setProgressSubTab} />}
      {tab === "settings" && <SettingsScreen exercises={exercises} setExercises={setExercises} categories={categories} setCategories={setCategories} volume={volume} onVolumeChange={setVolume} lang={lang} onLangChange={setLang} displaySize={displaySize} onDisplaySizeChange={setDisplaySize} onResetBadges={() => setBadges({})} />}
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

      {/* Bottom navigation — the single primary nav surface for the app */}
      <div style={base.bottomNav}>
        <button style={base.bottomNavBtn(tab === "library")} onClick={() => setTab("library")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tab === "library" ? C.amber : C.navInactive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          {T("navLibrary")}
        </button>
        <button style={base.bottomNavBtn(sessionTabActive, sessionInProgress ? "#34D399" : C.amber)}
          onClick={() => setTab(sessionInProgress ? "active" : "session")}>
          <span style={{ position: "relative", display: "flex" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={sessionTabActive ? (sessionInProgress ? "#34D399" : C.amber) : C.navInactive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
            </svg>
            {sessionInProgress && (
              <span style={{ position: "absolute", top: -2, right: -4, width: 7, height: 7, borderRadius: "50%", background: "#34D399", animation: "activePulse 1.5s ease-in-out infinite" }} />
            )}
          </span>
          {tasks.length > 0 ? `${T("navSession")} (${tasks.length})` : T("navSession")}
        </button>
        <button style={base.bottomNavBtn(tab === "progress", "#4FC3F7")} onClick={() => setTab("progress")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tab === "progress" ? "#4FC3F7" : C.navInactive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          {T("navProgress")}
        </button>
        <button style={base.bottomNavBtn(tab === "settings")} onClick={() => setTab("settings")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={tab === "settings" ? C.amber : C.navInactive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          {T("navSettings")}
        </button>
      </div>

      {badgeCelebrationQueue.length > 0 && (
        <BadgeCelebration
          key={badgeCelebrationQueue[0]}
          badgeId={badgeCelebrationQueue[0]}
          lang={lang}
          onDone={() => setBadgeCelebrationQueue(q => q.slice(1))}
        />
      )}
      {xpGain && (
        <XPGainPopup key={xpGain.id} event={xpGain} onDone={() => setXpGain(null)} />
      )}
      {levelUpQueue.length > 0 && (
        <LevelUpCelebration
          key={levelUpQueue[0]}
          level={levelUpQueue[0]}
          onDone={() => setLevelUpQueue(q => q.slice(1))}
        />
      )}
    </div>
    </LangContext.Provider>
  );
}
