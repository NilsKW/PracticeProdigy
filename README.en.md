🇫🇷 *[Lire en français](README.md)*

# 🎸 Practice Prodigy

**Practice session planner with an advanced Pomodoro timer and gamification, for any instrument**

Practice Prodigy is a progressive web app (PWA) designed to organize and optimize your practice sessions. It runs directly from your browser, installs on your phone like a native app, and works entirely offline once loaded.

---

## ✨ Features

### 📚 Exercise Library
- Library of 11 preconfigured, general-purpose exercises (not tied to a specific instrument) across 5 categories: Warm-Up, Instrumental Technique, Improvisation, Theory, Arpeggios
- Add custom exercises with a name, description, icon, category, and default duration
- Sub-exercises: break an exercise down into a reusable checklist (e.g. scale positions), with progress tracked persistently across sessions
- Link to a reference YouTube video per exercise
- Configurable metronome per exercise (10–200 BPM, 1/4 to 8/4 time signatures)
- **"Needs Practice"** box at the top of the library: shows the 3 least-practiced exercises to guide your session
- Exercises already added to the session appear dimmed (with a grayscaled icon), with a red **×** button to remove them directly from the library
- Teaching files per exercise (audio, video, image, PDF): played/shown inline in the app during a session, never opening a new tab
- Add animation: the exercise's icon visually flies to the Session tab, with an "Added to session" confirmation

### 📋 Session Tab
- Build a queue of exercises with a single tap on **+**
- Drag-and-drop reordering, adjust each exercise's duration (−/+ minutes)
- Total session time shown before starting
- Collapsible **Favorites** section: save the current session as a reusable template, and instantly reload a saved favorite
- The Session tab briefly flashes red (with a small animation) whenever an exercise is added or removed, to signal the queue changed

### ▶️ Session Mode (advanced Pomodoro)
- Countdown timer per exercise, with a progress bar
- Urgent pulsing in the last 10 seconds
- **Screen stays on** during a session (Wake Lock API)
- Switching tabs mid-session: the session automatically pauses, with a green banner to resume with one tap
- Built-in metronome during a session: sharp click on the first beat, lower clicks on the others
- Collapsible sub-exercise checklist, with a progress reset option
- **🍜 Noodling mode**: a button for a free-play break during a session (playing something other than what's planned). The current exercise's timer pauses; you keep earning XP, but at half the normal rate. Time spent noodling is tracked as its own statistic (visible in Progression and at the end of a session)
- End-of-exercise (bell) and end-of-session (Rhodes Bb sus4 chord) sounds
- Visual effects: blue flash between exercises, fireworks and a trophy at the end of a session

### 🎮 Progression (levels, statistics, badges)
- **Levels and XP**: every minute practiced fills an experience gauge along a logarithmic curve; the displayed icon (cigar-box guitar, ukulele, Stratocaster, Telecaster, archtop) evolves with level
- XP-gain animation on every completed exercise, full-screen celebration on leveling up
- **Statistics**: total time practiced, exercises worked on, number of sessions, most-to-least practiced ranking, time spent noodling, reset with confirmation
- **Badges**: practice goals to unlock (total time, consecutive-day streaks, specific exercises completed), with an unlock animation
- Level indicator and badge counter always visible at the top of the app

### ⚙️ Settings
- **Exercises**: create, edit, delete exercises; choose the icon, category, duration, sub-exercises, YouTube video, metronome BPM/time signature
- **Categories**: create, rename, recolor, delete categories
- **Sound**: overall app volume
- **Language**: Français 🇫🇷 / English 🇬🇧
- **Display**: text and button size (small / medium / large)
- **Badges**: reset with confirmation
- **Share**: bundle selected categories, their exercises, and any attached teaching files (audio, video, image, PDF) into a single `.zip` file to export and share, and import one someone else sent you

### 🧭 Navigation
Bottom navigation bar: **Library · Session · Progression · Settings**. The Session icon shows a pulsing indicator when a session is in progress and takes you straight to the active screen.

On first launch, a short tour (5 steps, skippable at any time) walks through these four sections.

---

## 📱 Installing on your phone (Android)

1. Open the app's URL in **Chrome** on your Android phone
2. Wait for the app to load
3. Tap the **⋮** menu (three dots, top right)
4. Select **"Add to Home screen"**
5. Practice Prodigy appears on your home screen like a native app

**On iOS (Safari):** Tap the Share button → "Add to Home Screen"

> After the first load (which needs an internet connection to fetch React from the CDN), the app works entirely **offline**.

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| React 18 (UMD, no build tooling) | User interface |
| Web Audio API | Sounds (bell, Rhodes chord, metronome) |
| Screen Wake Lock API | Keeps the screen on during a session |
| localStorage | Data persistence (exercises, favorites, statistics, level, badges) |
| IndexedDB | Storage for attached teaching files (audio/video/image/PDF) |
| Service Worker | Offline cache |
| PWA Manifest | Home-screen installation |

`guitar-practice-app.jsx` is the JSX source of the React component: it's pre-compiled (Babel) and spliced directly into `index.html`, which is the file actually served. There's no backend server, no build framework to run in production, and no live NPM dependency.

---

## 📁 File Structure

```
├── guitar-practice-app.jsx   # App's JSX source (edit here, then recompile into index.html)
├── index.html                 # Served app (pre-compiled React, styles, logic)
├── exercises-data.js          # Default exercise library and categories
├── manifest.json               # PWA manifest (name, icon, colors)
├── sw.js                      # Service Worker (offline cache)
├── icon-180.png / icon-192.png / icon-512.png   # App icons
├── PracticeProdigy_Icon_V1.png # Icon source
├── Rewards/badges-data.js     # Unlockable badge definitions
├── _headers / netlify.toml    # HTTP headers and Netlify config (Content Security Policy)
└── update.bat                 # Windows script: commit + push to GitHub
```

---

## 🚀 Deployment

The app is hosted for free via **Netlify**, connected to this GitHub repo — every push to `main` redeploys automatically in under a minute.

To update the app: edit `guitar-practice-app.jsx`, recompile it into `index.html`, then run `update.bat` (or `git add`, `git commit`, `git push`).

---

## 📬 Contact

For any question, suggestion, or feedback:

**kwiatowski.nils@gmail.com**

---

## 📄 License

Personal use. All rights reserved.
