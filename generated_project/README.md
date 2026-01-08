# Project Overview

This is a lightweight, single‑page web application that provides **both a countdown timer and a stopwatch** built with modern HTML, CSS, and vanilla JavaScript. The app runs entirely in the browser—no server, no external libraries—so it works offline and can be hosted on any static‑hosting platform.

---

## Features

- **Countdown Timer** – Set minutes and seconds, start, pause, resume, and reset.
- **Stopwatch** – Start, lap, pause, and reset with millisecond precision.
- **Responsive Design** – Optimised for desktop, tablet, and mobile devices.
- **Audio Alerts** – Optional beep when the timer reaches zero.
- **Dark/Light Theme** – Automatic theme based on the user’s system preference.
- **No external dependencies** – Pure HTML, CSS, and JavaScript.

---

## Setup Instructions

1. **Open the application**
   - Simply double‑click `index.html` or open it in any modern web browser (Chrome, Firefox, Edge, Safari). No build step or server is required.

---

## Usage Guide

### Timer
1. **Enter a duration** – Use the input fields to set minutes and seconds.
2. **Start** – Click the **Start** button. The countdown begins.
3. **Pause / Resume** – Click **Pause** to stop the countdown; the button changes to **Resume** to continue.
4. **Reset** – Click **Reset** to stop the timer and clear the display.
5. **Alert** – When the timer reaches `00:00`, a short beep sound plays (if your device’s audio is enabled).

### Stopwatch
1. **Start** – Click the **Start** button to begin counting up from `00:00.00`.
2. **Lap** – While running, click **Lap** to record the current elapsed time. Laps appear in a list below the display.
3. **Pause / Resume** – Click **Pause** to stop the count; the button changes to **Resume** to continue.
4. **Reset** – Click **Reset** to clear the elapsed time and all recorded laps.

---

## Code Structure

```
project-root/
│
├─ index.html      # Main HTML file – UI markup and script imports
├─ style.css       # Styling (layout, responsiveness, dark/light theme)
├─ app.js          # Core JavaScript – timer, stopwatch logic, UI updates
└─ README.md       # Project documentation (this file)
```

- **`index.html`** – Contains the markup for the timer and stopwatch sections, links to `style.css` and `app.js`.
- **`style.css`** – Provides a clean, responsive layout using Flexbox and media queries, plus a CSS custom property‑based dark/light theme.
- **`app.js`** – Implements two independent modules:
  - **Timer module** – Handles user input, countdown calculations, pause/resume state, and the end‑of‑timer audio alert.
  - **Stopwatch module** – Manages high‑resolution elapsed time using `performance.now()`, lap recording, and pause/resume logic.
  - Both modules share a small utility layer for formatting time strings and updating the DOM.

---

## Development & Deployment

- **Development** – Edit the files directly; the app reloads instantly when you refresh the browser.
- **Deployment** – Upload the four files (`index.html`, `style.css`, `app.js`, `README.md`) to any static‑hosting service (GitHub Pages, Netlify, Vercel, etc.). No server‑side code is required.

Enjoy using the timer and stopwatch!
