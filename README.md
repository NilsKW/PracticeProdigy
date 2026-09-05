# 🎸 Practice Prodigy

**Planificateur de séances de guitare électrique avec minuteur Pomodoro avancé et gamification**

Practice Prodigy est une application web progressive (PWA) conçue pour organiser et optimiser vos séances de pratique à la guitare électrique. Elle fonctionne directement depuis votre navigateur, s'installe sur votre téléphone comme une application native, et fonctionne entièrement hors ligne une fois chargée.

---

## ✨ Fonctionnalités

### 📚 Bibliothèque d'exercices
- Bibliothèque de 11 exercices préconfigurés, généralistes (pas spécifiques à un instrument), dans 5 catégories : Échauffements, Technique instrumentale, Improvisation, Théorie, Arpèges
- Ajout d'exercices personnalisés avec nom, description, icône, catégorie et durée par défaut
- Sous-exercices : découpage d'un exercice en une checklist réutilisable (ex. positions d'une gamme), avec suivi de progression persistant d'une séance à l'autre
- Lien vers une vidéo YouTube de référence par exercice
- Métronome configurable par exercice (10–200 BPM, mesures de 1/4 à 8/4)
- Encadré **"À travailler"** en haut de la bibliothèque : affiche les 3 exercices les moins pratiqués pour guider votre session
- Exercices déjà ajoutés à la séance affichés en foncé, avec un bouton rouge **×** pour les retirer directement depuis la bibliothèque

### 📋 Onglet Séance
- Constitution d'une file d'exercices par simple tap sur le **+**
- Réordonnancement par glisser-déposer, ajustement de la durée de chaque exercice (−/+ minutes)
- Affichage du temps total de la séance avant de démarrer
- Section **Favoris** repliable : sauvegarde la séance en cours comme modèle réutilisable, et recharge instantanément un favori sauvegardé
- L'onglet Séance s'allume brièvement en rouge (avec une petite animation) dès qu'un exercice est ajouté ou retiré, pour signaler que la file a changé

### ▶️ Mode séance (Pomodoro avancé)
- Minuteur compte à rebours par exercice, avec barre de progression
- Pulsation urgente dans les 10 dernières secondes
- **Écran actif** : l'écran du téléphone reste allumé pendant la séance (Wake Lock API)
- Navigation entre les onglets pendant une séance : la séance se met en pause automatiquement, un bandeau vert permet de reprendre d'un tap
- Métronome intégré pendant la séance : premier clic aigu (temps fort), clics suivants graves (temps faibles)
- Checklist des sous-exercices repliable, avec réinitialisation de la progression
- **🍜 Mode Noodling** : bouton pour faire une pause libre pendant une séance (jouer autre chose que ce qui est prévu). Le minuteur de l'exercice en cours se met en pause ; l'expérience continue d'être gagnée mais à moitié du taux normal. Le temps passé à noodler est suivi comme statistique à part (visible dans Progression et en fin de séance)
- Sons de fin d'exercice (cloche) et de fin de séance (accord de Rhodes Bb sus4)
- Effets visuels : flash bleu entre exercices, feux d'artifice et trophée en fin de séance

### 🎮 Progression (niveaux, statistiques, badges)
- **Niveaux et XP** : chaque minute pratiquée remplit une jauge d'expérience selon une courbe logarithmique ; l'icône affichée (guitare cigar-box, ukulélé, Stratocaster, Telecaster, archtop) évolue avec le niveau
- Animation de gain d'XP à chaque exercice terminé, célébration plein écran au passage de niveau
- **Statistiques** : temps total pratiqué, exercices travaillés, nombre de séances, classement du plus au moins pratiqué, temps passé à noodler, réinitialisation avec confirmation
- **Badges** : objectifs de pratique à débloquer (temps total, séries de jours consécutifs, exercices spécifiques terminés), avec animation de déblocage
- Indicateur de niveau et compteur de badges toujours visibles en haut de l'application

### ⚙️ Réglages
- **Exercices** : créer, modifier, supprimer des exercices ; choisir l'icône, la catégorie, la durée, les sous-exercices, la vidéo YouTube, le BPM/mesure du métronome
- **Catégories** : créer, renommer, recolorer, supprimer des catégories
- **Son** : volume général de l'application
- **Langue** : Français 🇫🇷 / English 🇬🇧
- **Affichage** : taille du texte et des boutons (petit / moyen / grand)
- **Badges** : réinitialisation avec confirmation

### 🧭 Navigation
Barre de navigation fixée en bas de l'écran : **Bibliothèque · Séance · Progression · Réglages**. L'icône Séance affiche un indicateur pulsant quand une séance est en cours et amène directement à l'écran actif.

---

## 📱 Installation sur téléphone (Android)

1. Ouvrez l'URL de l'application dans **Chrome** sur votre téléphone Android
2. Attendez que l'application soit chargée
3. Appuyez sur le menu **⋮** (trois points en haut à droite)
4. Sélectionnez **"Ajouter à l'écran d'accueil"**
5. Practice Prodigy apparaît sur votre écran d'accueil comme une application native

**Sur iOS (Safari) :** Appuyez sur le bouton Partager → "Sur l'écran d'accueil"

> Après le premier chargement (qui nécessite Internet pour télécharger React depuis le CDN), l'application fonctionne entièrement **hors ligne**.

---

## 🛠️ Stack technique

| Technologie | Rôle |
|---|---|
| React 18 (UMD, sans outillage de build) | Interface utilisateur |
| Web Audio API | Sons (cloche, Rhodes, métronome) |
| Screen Wake Lock API | Maintien de l'écran actif pendant une séance |
| localStorage | Persistance des données (exercices, favoris, statistiques, niveau, badges) |
| Service Worker | Cache hors ligne |
| PWA Manifest | Installation sur l'écran d'accueil |

`guitar-practice-app.jsx` est la source JSX du composant React : elle est pré-compilée (Babel) puis intégrée directement dans `index.html`, qui est le fichier réellement servi. Il n'y a ni serveur backend, ni framework de build à lancer côté production, ni dépendance NPM en ligne.

---

## 📁 Structure des fichiers

```
├── guitar-practice-app.jsx   # Source JSX de l'application (à éditer, puis recompiler dans index.html)
├── index.html                 # Application servie (React pré-compilé, styles, logique)
├── exercises-data.js          # Bibliothèque d'exercices et catégories par défaut
├── manifest.json               # Manifeste PWA (nom, icône, couleurs)
├── sw.js                      # Service Worker (cache hors ligne)
├── icon-180.png / icon-192.png / icon-512.png   # Icônes de l'application
├── PracticeProdigy_Icon_V1.png # Source de l'icône
├── Rewards/badges-data.js     # Définitions des badges débloquables
├── _headers / netlify.toml    # En-têtes HTTP et configuration Netlify (Content Security Policy)
└── update.bat                 # Script Windows : commit + push vers GitHub
```

---

## 🚀 Déploiement

L'application est hébergée gratuitement via **Netlify**, branché sur ce dépôt GitHub — chaque push sur `main` redéploie automatiquement en moins d'une minute.

Pour mettre à jour l'application : modifiez `guitar-practice-app.jsx`, recompilez-le dans `index.html`, puis lancez `update.bat` (ou `git add`, `git commit`, `git push`).

---

## 📬 Contact

Pour toute question, suggestion ou retour :

**kwiatowski.nils@gmail.com**

---

## 📄 Licence

Usage personnel. Tous droits réservés.
