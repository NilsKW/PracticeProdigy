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

// Shared checklist used by the three built-in scale exercises below: ascending/
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
    { id: "cat-warmup",  name: "Warm-Up",      name_fr: "Échauffement",     color: "#C8873A" },
    { id: "cat-scales",  name: "Scales",       name_fr: "Gammes",           color: "#4FC3F7" },
    { id: "cat-chords",  name: "Chords",       name_fr: "Accords",          color: "#A78BFA" },
    { id: "cat-tech",    name: "Technique",    name_fr: "Technique",        color: "#F87171" },
    { id: "cat-improv",  name: "Improv",       name_fr: "Improvisation",    color: "#34D399" },
    { id: "cat-song",    name: "Song Work",    name_fr: "Travail sur morceau", color: "#FBBF24" },
    { id: "cat-ear",     name: "Ear Training", name_fr: "Oreille musicale", color: "#FB923C" },
  ],

  exercises: [
    { id: "warm1", categoryId: "cat-warmup", name: "Finger Stretches",  name_fr: "Étirements des doigts",
      defaultMin: 3, icon: "✋",
      description: "Gently stretch each finger to prevent injuries.",
      description_fr: "Étirez doucement chaque doigt pour éviter les blessures." },
    { id: "warm2", categoryId: "cat-warmup", name: "Chromatic Crawl",  name_fr: "Gamme chromatique",
      defaultMin: 5, icon: "🐛",
      description: "Play 1-2-3-4 across all strings, ascending and descending.",
      description_fr: "Jouez 1-2-3-4 sur toutes les cordes, en montant et en descendant." },
    { id: "warm3", categoryId: "cat-warmup", name: "Spider Exercise",  name_fr: "Exercice de l'araignée",
      defaultMin: 5, icon: "🕷️",
      description: "Cross-string pattern to build independence.",
      description_fr: "Motif croisé entre les cordes pour développer l'indépendance des doigts." },

    { id: "scale1", categoryId: "cat-scales", name: "Pentatonic (A minor)", name_fr: "Pentatonique (La mineur)",
      defaultMin: 10, icon: "🎵",
      description: "Run the Am pentatonic in all 5 positions.",
      description_fr: "Parcourez la gamme pentatonique de La mineur dans les 5 positions.",
      subExercises: SCALE_SUBEXERCISES },
    { id: "scale2", categoryId: "cat-scales", name: "Major Scale Modes", name_fr: "Modes de la gamme majeure",
      defaultMin: 10, icon: "🎶",
      description: "Practice Ionian, Dorian, Phrygian across the neck.",
      description_fr: "Travaillez les modes ionien, dorien et phrygien sur tout le manche.",
      subExercises: SCALE_SUBEXERCISES },
    { id: "scale3", categoryId: "cat-scales", name: "Blues Scale", name_fr: "Gamme blues",
      defaultMin: 8, icon: "🎸",
      description: "Add the b5 note to your pentatonic for bluesy feel.",
      description_fr: "Ajoutez la quinte diminuée à votre pentatonique pour une couleur blues.",
      subExercises: SCALE_SUBEXERCISES },

    { id: "chord1", categoryId: "cat-chords", name: "Barre Chord Transitions", name_fr: "Transitions d'accords barrés",
      defaultMin: 10, icon: "🤘",
      description: "Switch between F, B, and Bm shapes fluidly.",
      description_fr: "Enchaînez fluidement les accords Fa, Si et Si mineur en barré." },
    { id: "chord2", categoryId: "cat-chords", name: "Open Chord Shapes", name_fr: "Accords ouverts",
      defaultMin: 7, icon: "🔵",
      description: "Clean up G, C, D, Em, Am transitions.",
      description_fr: "Nettoyez les transitions entre Sol, Do, Ré, Mi mineur et La mineur." },
    { id: "chord3", categoryId: "cat-chords", name: "Jazz Voicings", name_fr: "Voicings jazz",
      defaultMin: 12, icon: "🎷",
      description: "Learn ii-V-I progressions with 7th chord voicings.",
      description_fr: "Apprenez les progressions ii-V-I avec des voicings d'accords de septième." },

    { id: "riff1", categoryId: "cat-tech", name: "Alternate Picking", name_fr: "Aller-retour (alternate picking)",
      defaultMin: 10, icon: "⚡",
      description: "Strict down-up picking at various tempos with metronome.",
      description_fr: "Médiator strict aller-retour à différents tempos avec métronome." },
    { id: "riff2", categoryId: "cat-tech", name: "Legato & Hammer-Ons", name_fr: "Legato et hammer-ons",
      defaultMin: 8, icon: "🔨",
      description: "Build smooth phrasing with hammer-ons and pull-offs.",
      description_fr: "Construisez un phrasé fluide avec des hammer-ons et pull-offs." },
    { id: "riff3", categoryId: "cat-tech", name: "Bending & Vibrato", name_fr: "Bends et vibrato",
      defaultMin: 8, icon: "〰️",
      description: "Accurate bends to pitch, controlled vibrato width and speed.",
      description_fr: "Bends précis en hauteur, vibrato à amplitude et vitesse contrôlées." },
    { id: "riff4", categoryId: "cat-tech", name: "Palm Muting", name_fr: "Palm muting",
      defaultMin: 7, icon: "🤚",
      description: "Control the mute tightness across different rhythms.",
      description_fr: "Contrôlez l'intensité de l'étouffement sur différents rythmes." },

    { id: "improv1", categoryId: "cat-improv", name: "Jam over Backing Track", name_fr: "Improviser sur un backing track",
      defaultMin: 15, icon: "🎤",
      description: "Free improvisation over a chosen key backing track.",
      description_fr: "Improvisation libre sur un backing track dans une tonalité choisie." },
    { id: "improv2", categoryId: "cat-improv", name: "Solo Construction", name_fr: "Construction de solo",
      defaultMin: 12, icon: "🌟",
      description: "Build a solo with motif, development, and climax.",
      description_fr: "Construisez un solo avec motif, développement et point culminant." },

    { id: "song1", categoryId: "cat-song", name: "Riff Memorization", name_fr: "Mémorisation d'un riff",
      defaultMin: 15, icon: "📝",
      description: "Learn a new riff from memory, no tabs.",
      description_fr: "Apprenez un nouveau riff de mémoire, sans tablature." },
    { id: "song2", categoryId: "cat-song", name: "Full Run-Through", name_fr: "Morceau en entier",
      defaultMin: 20, icon: "▶️",
      description: "Play the song top to bottom without stopping.",
      description_fr: "Jouez le morceau du début à la fin sans vous arrêter." },

    { id: "ear1", categoryId: "cat-ear", name: "Interval Recognition", name_fr: "Reconnaissance d'intervalles",
      defaultMin: 10, icon: "👂",
      description: "Identify intervals by ear, then find them on the neck.",
      description_fr: "Identifiez les intervalles à l'oreille, puis retrouvez-les sur le manche." },
  ],
};
