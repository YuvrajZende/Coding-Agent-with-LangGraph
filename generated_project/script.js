// script.js – Simple Timer (Stopwatch & Countdown)
// Implements mode selection, start/pause/reset controls, timer input handling,
// display updates every 100 ms, UI state management, and clean separation of concerns.

(() => {
  // ----- Constants & State ---------------------------------------------------
  const MODE_TIMER = "timer";
  const MODE_STOPWATCH = "stopwatch";

  let currentMode = MODE_TIMER; // default, will be synced with HTML on load
  let intervalId = null; // stores setInterval ID
  let startTimestamp = 0; // timestamp when the current interval started (ms since epoch)
  let elapsedMs = 0; // accumulated elapsed time for stopwatch (ms)
  let remainingMs = 0; // remaining time for countdown timer (ms)

  // ----- DOM Elements -------------------------------------------------------
  const timeDisplay = document.getElementById("time-display");
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  const minutesInput = document.getElementById("minutes-input");
  const secondsInput = document.getElementById("seconds-input");
  const startBtn = document.getElementById("start-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const resetBtn = document.getElementById("reset-btn");

  // ----- Utility Functions ---------------------------------------------------
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const updateDisplay = () => {
    let displayMs;
    if (currentMode === MODE_STOPWATCH) {
      displayMs = elapsedMs + (Date.now() - startTimestamp);
    } else {
      // TIMER mode
      const passed = Date.now() - startTimestamp;
      displayMs = Math.max(remainingMs - passed, 0);
    }
    timeDisplay.textContent = formatTime(displayMs);

    // Auto‑stop timer when it reaches zero
    if (currentMode === MODE_TIMER && displayMs === 0) {
      clearInterval(intervalId);
      intervalId = null;
      // UI state after timer finishes
      startBtn.disabled = true;
      pauseBtn.disabled = true;
      resetBtn.disabled = false;
    }
  };

  const setRunningState = (running) => {
    // When running, disable inputs that would interfere with the active session
    startBtn.disabled = running;
    pauseBtn.disabled = !running;
    // Reset is always available once a session has started or finished
    resetBtn.disabled = false;
    const inputsDisabled = running || currentMode === MODE_STOPWATCH;
    minutesInput.disabled = inputsDisabled;
    secondsInput.disabled = inputsDisabled;
    modeRadios.forEach((r) => (r.disabled = running));
  };

  // ----- Core Operations -----------------------------------------------------
  const start = () => {
    if (intervalId) return; // already running

    if (currentMode === MODE_TIMER) {
      // Initialise remainingMs only if we are starting fresh (not after a pause)
      if (remainingMs <= 0) {
        const mins = parseInt(minutesInput.value, 10) || 0;
        const secs = parseInt(secondsInput.value, 10) || 0;
        remainingMs = (mins * 60 + secs) * 1000;
      }
      if (remainingMs <= 0) {
        // No time to count down – abort start
        return;
      }
    }

    startTimestamp = Date.now();
    intervalId = setInterval(updateDisplay, 100);
    setRunningState(true);
    // Immediate visual feedback
    updateDisplay();
  };

  const pause = () => {
    if (!intervalId) return; // not running
    clearInterval(intervalId);
    intervalId = null;

    if (currentMode === MODE_STOPWATCH) {
      elapsedMs += Date.now() - startTimestamp;
    } else {
      // TIMER mode – compute remaining time at the moment of pause
      const passed = Date.now() - startTimestamp;
      remainingMs = Math.max(remainingMs - passed, 0);
    }
    setRunningState(false);
  };

  const reset = () => {
    clearInterval(intervalId);
    intervalId = null;
    startTimestamp = 0;
    elapsedMs = 0;
    remainingMs = 0;
    timeDisplay.textContent = "00:00";
    // Re‑enable controls for a fresh session
    minutesInput.disabled = currentMode === MODE_STOPWATCH;
    secondsInput.disabled = currentMode === MODE_STOPWATCH;
    modeRadios.forEach((r) => (r.disabled = false));
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
  };

  const changeMode = (newMode) => {
    if (currentMode === newMode) return;
    currentMode = newMode;
    reset(); // switching mode always starts from a clean slate
  };

  // ----- Event Listeners -----------------------------------------------------
  startBtn.addEventListener("click", start);
  pauseBtn.addEventListener("click", pause);
  resetBtn.addEventListener("click", reset);

  modeRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.checked) {
        changeMode(e.target.value);
      }
    });
  });

  // Initialise UI based on the default selected mode when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    const checked = document.querySelector('input[name="mode"]:checked');
    currentMode = checked ? checked.value : MODE_TIMER;
    reset(); // set initial display and button states
  });
})();
