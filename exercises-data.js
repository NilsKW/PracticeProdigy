// ─────────────────────────────────────────────────────────────────────────────
// Practice Prodigy — exercise library data
// ─────────────────────────────────────────────────────────────────────────────
// Edit this file to change the built-in categories/exercises, or add new ones.
// It's plain JavaScript — no build step needed. Save the file, then reload the
// app (or redeploy) to see your changes.
//
// IMPORTANT: this only seeds a NEW install. If you already have exercises
// saved on a device (which is the normal case once you've used the app),
// that device keeps using its own saved copy and won't see edits made here.
// To force a device back to this file's data, use Settings and delete/re-add
// the exercise, or clear the app's storage.
//
// ── Bilingual text (English + French) ──
// The app supports English and French. Every "name"/"description"/"label"
// field below is the English text. To also provide French, add a matching
// field with a "_fr" suffix right next to it:
//   name: "Warm-Up", name_fr: "Échauffement"
//   description: "...", description_fr: "..."
//   label: "...", label_fr: "..."
// The "_fr" field is optional — if you leave it out (e.g. for a new exercise
// you add yourself), the English text is shown in every language. This only
// works while the plain (non-"_fr") field still matches exactly what's
// written here — if you later rename an exercise from within the app itself,
// your typed text is kept as-is in whichever language you typed it, and the
// "_fr" field here stops applying to it.
//
// ── Categories ──
// Each category is: { id, name, name_fr?, color }
//   id     — internal identifier, must be unique. Don't change an existing
//            category's id, or exercises pointing to it will lose their category.
//   color  — hex color used for that category's accent throughout the app.
//
// ── Exercises ──
// Each exercise is: { id, categoryId, name, name_fr?, defaultMin, icon, description, description_fr?, subExercises? }
//   id          — internal identifier, must be unique. Don't change an existing one.
//   categoryId  — must match one of the category ids above.
//   defaultMin  — default duration in minutes when added to a session.
//   icon        — an emoji shown next to the exercise.
//   subExercises (optional) — a checklist you can tick off item-by-item during
//     practice, e.g. individual scale patterns. Each is { id, label, label_fr? }.
//     Progress is remembered per exercise (see subProgress in the app), so it's
//     safe to reuse the exact same subExercises list across several exercises —
//     each exercise still tracks its own checkmarks independently by exercise id.
//
// This default library is intentionally instrument-agnostic (not guitar-only)
// so it works as a sensible starting point whatever you practice.

// Shared checklist used by the scale/mode exercises below: ascending/
// descending through every interval up to a 9th, plus note groupings of 3 to 7.
const SCALE_SUBEXERCISES = [
  { id: "sub-2-up",     label: "Ascending in 2nds",  label_fr: "Montée en secondes" },
  { id: "sub-2-down",   label: "Descending in 2nds", label_fr: "Descente en secondes" },
  { id: "sub-3-up",     label: "Ascending in 3rds",  label_fr: "Montée en tierces" },
  { id: "sub-3-down",   label: "Descending in 3rds", label_fr: "Descente en tierces" },
  { id: "sub-4-up",     label: "Ascending in 4ths",  label_fr: "Montée en quartes" },
  { id: "sub-4-down",   label: "Descending in 4ths", label_fr: "Descente en quartes" },
  { id: "sub-5-up",     label: "Ascending in 5ths",  label_fr: "Montée en quintes" },
  { id: "sub-5-down",   label: "Descending in 5ths", label_fr: "Descente en quintes" },
  { id: "sub-6-up",     label: "Ascending in 6ths",  label_fr: "Montée en sixtes" },
  { id: "sub-6-down",   label: "Descending in 6ths", label_fr: "Descente en sixtes" },
  { id: "sub-7-up",     label: "Ascending in 7ths",  label_fr: "Montée en septièmes" },
  { id: "sub-7-down",   label: "Descending in 7ths", label_fr: "Descente en septièmes" },
  { id: "sub-8-up",     label: "Ascending in octaves",  label_fr: "Montée en octaves" },
  { id: "sub-8-down",   label: "Descending in octaves", label_fr: "Descente en octaves" },
  { id: "sub-9-up",     label: "Ascending in 9ths",  label_fr: "Montée en neuvièmes" },
  { id: "sub-9-down",   label: "Descending in 9ths", label_fr: "Descente en neuvièmes" },
  { id: "sub-grp3-up",   label: "Group of 3 ascending",  label_fr: "Groupe de 3 montant" },
  { id: "sub-grp3-down", label: "Group of 3 descending", label_fr: "Groupe de 3 descendant" },
  { id: "sub-grp4-up",   label: "Group of 4 ascending",  label_fr: "Groupe de 4 montant" },
  { id: "sub-grp4-down", label: "Group of 4 descending", label_fr: "Groupe de 4 descendant" },
  { id: "sub-grp5-up",   label: "Group of 5 ascending",  label_fr: "Groupe de 5 montant" },
  { id: "sub-grp5-down", label: "Group of 5 descending", label_fr: "Groupe de 5 descendant" },
  { id: "sub-grp6-up",   label: "Group of 6 ascending",  label_fr: "Groupe de 6 montant" },
  { id: "sub-grp6-down", label: "Group of 6 descending", label_fr: "Groupe de 6 descendant" },
  { id: "sub-grp7-up",   label: "Group of 7 ascending",  label_fr: "Groupe de 7 montant" },
  { id: "sub-grp7-down", label: "Group of 7 descending", label_fr: "Groupe de 7 descendant" },
];

window.EXERCISES_DATA = {
  categories: [
    { id: "cat-warmup",     name: "Warm-Up",                 name_fr: "Échauffements",           color: "#C8873A" },
    { id: "cat-technique",  name: "Instrumental Technique",  name_fr: "Technique instrumentale", color: "#F87171" },
    { id: "cat-improv",     name: "Improvisation",           name_fr: "Improvisation",           color: "#34D399" },
    { id: "cat-theory",     name: "Theory",                  name_fr: "Théorie",                 color: "#4FC3F7" },
    { id: "cat-arpeggios",  name: "Arpeggios",                name_fr: "Arpèges",                 color: "#A78BFA" },
  ],

  exercises: [
    { id: "warm1", categoryId: "cat-warmup", name: "Breathing",  name_fr: "Souffle",
      defaultMin: 5, icon: "🫁",
      description: "Breathing exercises to settle in and prepare for practice.",
      description_fr: "Exercices respiratoires pour se poser avant de jouer." },
    { id: "warm2", categoryId: "cat-warmup", name: "Stretching",  name_fr: "Étirements",
      defaultMin: 5, icon: "🤸",
      description: "Gently stretch to prevent injuries before playing.",
      description_fr: "Étirez-vous doucement pour éviter les blessures avant de jouer." },

    { id: "tech1", categoryId: "cat-technique", name: "Legato",  name_fr: "Legato",
      defaultMin: 10, icon: "🎵",
      description: "Connect notes smoothly, without any break between them.",
      description_fr: "Enchaînez les notes sans coupure, de façon liée." },
    { id: "tech2", categoryId: "cat-technique", name: "Staccato",  name_fr: "Staccato",
      defaultMin: 8, icon: "✂️",
      description: "Play notes short and detached, clearly separated.",
      description_fr: "Jouez les notes courtes et détachées, bien séparées." },

    { id: "improv1", categoryId: "cat-improv", name: "Major Scale Modes", name_fr: "Modes de la gamme majeure",
      defaultMin: 10, icon: "🎶",
      description: "Practice the modes of the major scale in every position.",
      description_fr: "Travaillez les modes de la gamme majeure dans toutes les positions.",
      subExercises: SCALE_SUBEXERCISES },
    { id: "improv2", categoryId: "cat-improv", name: "Minor Pentatonic Scale", name_fr: "Gamme pentatonique mineure",
      defaultMin: 10, icon: "🎵",
      description: "Run the minor pentatonic scale across the full range.",
      description_fr: "Parcourez la gamme pentatonique mineure sur toute l'étendue.",
      subExercises: SCALE_SUBEXERCISES },
    { id: "improv3", categoryId: "cat-improv", name: "Blues Scale", name_fr: "Gamme Blues",
      defaultMin: 8, icon: "🎷",
      description: "Add the flat 5th to the pentatonic scale for a bluesy feel.",
      description_fr: "Ajoutez la quinte diminuée à la pentatonique pour une couleur blues.",
      subExercises: SCALE_SUBEXERCISES },

    { id: "theory1", categoryId: "cat-theory", name: "Sight-Reading", name_fr: "Déchiffrage",
      defaultMin: 10, icon: "👀",
      description: "Read a new piece at first sight, without stopping.",
      description_fr: "Lisez un nouveau morceau à première vue, sans vous arrêter." },
    { id: "theory2", categoryId: "cat-theory", name: "Analyzing a Piece", name_fr: "Analyse d'une œuvre",
      defaultMin: 15, icon: "🔍",
      description: "Study the structure, harmony, and form of a piece.",
      description_fr: "Étudiez la structure, l'harmonie et la forme d'une œuvre." },

    { id: "arp1", categoryId: "cat-arpeggios", name: "Ascending / Descending", name_fr: "Montants / descendants",
      defaultMin: 8, icon: "🎼",
      description: "Play arpeggios straight up and down, evenly.",
      description_fr: "Jouez les arpèges en montant puis en descendant, de façon régulière." },
    { id: "arp2", categoryId: "cat-arpeggios", name: "Broken Arpeggios", name_fr: "Brisés",
      defaultMin: 8, icon: "🔀",
      description: "Play arpeggio notes out of strict order for a broken pattern.",
      description_fr: "Jouez les notes de l'arpège dans un ordre brisé plutôt que strict." },
  ],
};
