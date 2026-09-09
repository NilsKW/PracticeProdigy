// ─────────────────────────────────────────────────────────────────────────────
// Practice Prodigy — historique des mises à jour
// ─────────────────────────────────────────────────────────────────────────────
// Une entrée par JOURNÉE de travail (le plus récent en premier / version la
// plus haute en tête du tableau), pas une par petite modification — sinon le
// changelog serait surchargé vu le nombre de petites mises à jour. Chaque
// entrée : { version, date (YYYY-MM-DD), changes: [texte, ...] }.
//
// Pour ajouter un changement :
// - Si la date du jour est la MÊME que celle du premier bloc (version la plus
//   haute), ajoutez simplement une ligne à son tableau "changes" — pas de
//   nouvelle version.
// - Si c'est un NOUVEAU jour de travail, dupliquez le premier bloc,
//   incrémentez "version" de 1, mettez la date du jour, et repartez avec un
//   seul changement dans "changes".
// Décrivez chaque changement en une phrase courte et compréhensible par un
// utilisateur (pas de jargon technique). L'appli affichera automatiquement ce
// nouveau contenu au prochain lancement pour quiconque avait déjà vu une
// version antérieure.

window.CHANGELOG_DATA = [
  { version: 6, date: "2026-09-09", changes: [
    "Le mode Récré peut maintenant être activé ou désactivé pour chaque exercice (dans ses réglages) — désactivé, le bouton 🛝 Récré ne s'affiche plus pendant cet exercice en séance.",
  ] },
  { version: 5, date: "2026-09-08", changes: [
    "Réorganisation des Réglages en menu déroulant, avec une flèche de retour plus grande et plus visible.",
    "Le bouton retour du téléphone fonctionne maintenant correctement pour naviguer dans les Réglages.",
    "Nouvelle rubrique « Retours » dans les Réglages pour signaler un bug ou proposer une idée par email.",
    "Le tutoriel de bienvenue s'affiche désormais à chaque lancement (avec une case « ne plus afficher » pour le désactiver).",
    "Le bouton retour du téléphone demande maintenant confirmation avant de quitter une séance en cours.",
    "Renommage des derniers textes encore appelés « modèle » en « favori ».",
    "Nouveau : les statistiques peuvent être filtrées sur une période précise (date de début / date de fin).",
    "La description de l'exercice s'affiche maintenant pendant qu'on le pratique en séance.",
    "Nouveau : un bouton « Historique des changements » dans les Réglages pour retrouver toutes les mises à jour passées.",
    "Renommage de « Nouveautés » en « Historique des versions », et correction d'un bug qui empêchait de faire défiler les anciennes mises à jour.",
    "Dans la Séance, les boutons − et + sont plus grands et séparés par des traits verticaux, comme la croix de suppression.",
    "Correction : avec beaucoup d'exercices dans la séance, la liste devenait illisible au lieu de défiler — elle défile maintenant normalement.",
    "Réglages réorganisés : les rubriques liées au développement de l'appli (Bugs & idées, Historique des versions, Debug) sont maintenant séparées visuellement du reste.",
    "Renommage de « Partage » en « Importer / exporter des groupes d'exercices », et de « Retours » en « Bugs & idées ».",
    "Nouveau : une rubrique « À propos » dans les Réglages, qui explique à quoi sert l'application, qui la développe, comment contacter le développeur, et comment vos données sont utilisées.",
    "Renommage du mode « Noodling » en « Récré » (avec un nouvel emoji 🛝).",
  ] },
  { version: 4, date: "2026-09-07", changes: [
    "Nouvelle jauge de progression compacte pendant une séance, à la place de la liste complète des exercices.",
    "Quand on ajoute un exercice à la séance, son icône s'envole visuellement vers l'onglet Séance.",
    "Un petit repère visuel reste sur l'exercice déjà ajouté dans la Bibliothèque.",
    "Nouveau design des boutons + et × : pleine hauteur, plus visibles, avec séparateur.",
    "Petite animation sur le nombre de minutes en séance quand on l'ajuste avec + ou −.",
  ] },
  { version: 3, date: "2026-09-06", changes: [
    "Les exercices et catégories par défaut sont désormais généralistes, adaptés à tout instrument (plus seulement guitare).",
    "Tutoriel de bienvenue au tout premier lancement de l'application.",
    "L'application s'adapte maintenant correctement aux écrans de tablette et d'ordinateur.",
  ] },
  { version: 2, date: "2026-09-05", changes: [
    "Correction d'un bug où une catégorie pouvait s'afficher deux fois dans la Bibliothèque.",
    "Nouveau : export et import d'un groupe d'exercices (avec leurs fichiers) en un seul fichier à partager.",
    "Une confirmation est demandée avant de quitter l'édition d'un exercice si des modifications n'ont pas été enregistrées.",
    "Nouveau : possibilité d'ajouter des fichiers pédagogiques (audio, vidéo, image, PDF) à un exercice.",
  ] },
  { version: 1, date: "2026-09-04", changes: [
    "Nouvelle navigation avec une barre en bas de l'écran (Bibliothèque, Séance, Progression, Réglages).",
    "Corrections de lisibilité et d'un problème d'affichage en taille « Grand ».",
    "Agrandissement de plusieurs textes et icônes (niveau, badges, flèches précédent/passer) pour une meilleure lisibilité.",
    "Correction d'un débordement d'affichage des boutons pendant une séance active.",
    "Un bouton rouge permet désormais de retirer un exercice directement depuis la Bibliothèque.",
    "Nouveau mode « Noodling » : une pause libre pendant une séance, avec suivi du temps qui y est passé.",
    "Renommage de « Mes modèles » en « Favoris », avec une petite animation quand la séance est modifiée.",
  ] },
];
