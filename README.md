# 🎸 GuitarFlow

**Planificateur de séances de guitare électrique avec minuteur Pomodoro avancé**

GuitarFlow est une application web progressive (PWA) conçue pour organiser et optimiser vos séances de pratique à la guitare électrique. Elle fonctionne directement depuis votre navigateur, s'installe sur votre téléphone comme une application native, et fonctionne entièrement hors ligne une fois chargée.

---

## ✨ Fonctionnalités

### 📚 Bibliothèque d'exercices
- Bibliothèque de 18 exercices préconfigurés dans 7 catégories : Échauffement, Gammes, Accords, Technique, Improvisation, Chansons, Formation de l'oreille
- Ajout d'exercices personnalisés avec nom, description, icône, catégorie et durée par défaut
- Lien vers une vidéo YouTube de référence par exercice
- Métronome configurable par exercice (10–200 BPM, mesures de 1/4 à 8/4)
- Encadré **"À travailler"** en haut de la bibliothèque : affiche les 3 exercices les moins pratiqués pour guider votre session

### 📋 Gestion des séances
- Constitution d'une file d'exercices par simple tap sur le **+**
- Ajustement de la durée de chaque exercice (−/+ minutes)
- Affichage du temps total de la séance avant de démarrer
- Sauvegarde de séances comme **modèles** réutilisables
- Chargement d'un modèle pour remplir instantanément la file

### ▶️ Mode séance (Pomodoro avancé)
- Minuteur compte à rebours par exercice, avec barre de progression
- Pulsation urgente dans les 10 dernières secondes
- **Écran actif** : l'écran du téléphone reste allumé pendant la séance (Wake Lock API)
- Navigation entre les onglets pendant une séance : la séance se met en pause automatiquement, un bandeau vert permet de reprendre d'un tap
- Métronome intégré pendant la séance : premier clic aigu (temps fort), clics suivants graves (temps faibles)
- Sons de fin d'exercice (cloche) et de fin de séance (accord de Rhodes Bb sus4)
- Effets visuels : flash bleu entre exercices, feux d'artifice et trophée en fin de séance

### 📊 Statistiques
- Suivi du temps réellement pratiqué par exercice (même si la séance est interrompue en cours)
- Nombre de séances par exercice
- Classement des exercices du plus au moins pratiqué
- Réinitialisation avec confirmation

### ⚙️ Réglages
- **Exercices** : créer, modifier, supprimer des exercices ; choisir l'icône, la catégorie, la durée, la vidéo YouTube, le BPM/mesure du métronome
- **Catégories** : créer, renommer, recolorer, supprimer des catégories
- **Son** : volume général de l'application
- **Langue** : Français 🇫🇷 / English 🇬🇧

---

## 📱 Installation sur téléphone (Android)

1. Ouvrez l'URL de l'application dans **Chrome** sur votre téléphone Android
2. Attendez que l'application soit chargée
3. Appuyez sur le menu **⋮** (trois points en haut à droite)
4. Sélectionnez **"Ajouter à l'écran d'accueil"**
5. GuitarFlow apparaît sur votre écran d'accueil comme une application native

**Sur iOS (Safari) :** Appuyez sur le bouton Partager → "Sur l'écran d'accueil"

> Après le premier chargement (qui nécessite Internet pour télécharger React depuis le CDN), l'application fonctionne entièrement **hors ligne**.

---

## 🛠️ Stack technique

| Technologie | Rôle |
|---|---|
| React 18 | Interface utilisateur |
| Web Audio API | Sons (cloche, Rhodes, métronome) |
| Screen Wake Lock API | Maintien de l'écran actif pendant une séance |
| localStorage | Persistance des données (exercices, modèles, statistiques) |
| Service Worker | Cache hors ligne |
| PWA Manifest | Installation sur l'écran d'accueil |

L'application est entièrement contenue dans un seul fichier `index.html` — aucun serveur backend, aucun framework de build, aucune dépendance NPM.

---

## 📁 Structure des fichiers

```
├── index.html        # Application complète (React pré-compilé, styles, logique)
├── manifest.json     # Manifeste PWA (nom, icône, couleurs)
├── sw.js             # Service Worker (cache hors ligne)
├── icon.svg          # Icône de l'application
├── _headers          # En-têtes HTTP Netlify (Content Security Policy)
└── netlify.toml      # Configuration Netlify
```

---

## 🚀 Déploiement

L'application est hébergée gratuitement via **GitHub Pages**.

Pour mettre à jour l'application, modifiez le fichier `index.html` directement sur GitHub (icône crayon ✏️) ou pushez une nouvelle version via Git. GitHub Pages redéploie automatiquement en moins d'une minute.

---

## 📬 Contact

Pour toute question, suggestion ou retour :

**kwiatowski.nils@gmail.com**

---

## 📄 Licence

Usage personnel. Tous droits réservés.
