// ─────────────────────────────────────────────────────────────────────────────
// Practice Prodigy — badge text & icons
// ─────────────────────────────────────────────────────────────────────────────
// Edit this file to change a badge's name/description (English + French, same
// "_fr" convention as exercises-data.js), or its icon (shown in the center of
// the badge once unlocked). It's plain JavaScript — no build step needed.
//
// This file only controls what a badge SAYS and LOOKS like. The actual unlock
// CONDITION for each badge (how many hours, which streak, etc.) is defined in
// the app itself, in guitar-practice-app.jsx, in the BADGE_CONDITIONS table —
// look for a comment there matching each id below if you want to change a goal.
//
// Each badge is: { id, icon, name, name_fr, description, description_fr }
//   id          — must match one of the ids the app checks against
//                 (BADGE_CONDITIONS in guitar-practice-app.jsx). Don't rename
//                 an existing id unless you also update it there.
//   icon        — an emoji shown in the middle of the badge once unlocked.
//   name        — short badge title (English).
//   description — one line explaining how to earn it (English).
//   "_fr" versions of name/description are optional; if omitted the English
//   text is shown in French mode too.

window.BADGES_DATA = [
  {
    id: "play-1h",
    icon: "🎸",
    name: "First Hour",
    name_fr: "Première heure",
    description: "Practice for a total of 1 hour.",
    description_fr: "Pratiquez un total d'1 heure.",
  },
  {
    id: "play-6h",
    icon: "🔥",
    name: "Getting Serious",
    name_fr: "Ça devient sérieux",
    description: "Practice for a total of 6 hours.",
    description_fr: "Pratiquez un total de 6 heures.",
  },
  {
    id: "play-15h",
    icon: "🏆",
    name: "Dedicated",
    name_fr: "Assidu",
    description: "Practice for a total of 15 hours.",
    description_fr: "Pratiquez un total de 15 heures.",
  },
  {
    id: "streak-3",
    icon: "📅",
    name: "On a Roll",
    name_fr: "Sur une lancée",
    description: "Practice at least once a day, 3 days in a row.",
    description_fr: "Pratiquez au moins une fois par jour, 3 jours de suite.",
  },
  {
    id: "spider-2h",
    icon: "🕷️",
    name: "Spider Master",
    name_fr: "Maître de l'araignée",
    description: "Spend a total of 2 hours on the Spider Exercise.",
    description_fr: "Passez un total de 2 heures sur l'exercice de l'araignée.",
  },
  {
    id: "scale-complete",
    icon: "🎵",
    name: "Scale Scholar",
    name_fr: "Érudit des gammes",
    description: "Check off every sub-exercise of a Scales exercise.",
    description_fr: "Cochez tous les sous-exercices d'un exercice de la catégorie Gammes.",
  },
];
