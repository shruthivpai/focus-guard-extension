let timer = null;

function tick() {
  chrome.storage.local.get("pomodoroState", async ({ pomodoroState }) => {
    if (!pomodoroState || !pomodoroState.running) return;

    const now = Date.now();
    const elapsed = Math.floor((now - pomodoroState.lastTick) / 1000);
    pomodoroState.remaining -= elapsed;
    pomodoroState.lastTick = now;

    if (pomodoroState.remaining <= 0) {
      pomodoroState.phase = pomodoroState.phase === "focus" ? "break" : "focus";
      pomodoroState.remaining = pomodoroState.phase === "focus" ? 25 * 60 : 5 * 60;

      // Extension: You can add a notification or sound here for the user
    }

    await chrome.storage.local.set({ pomodoroState });
    timer = setTimeout(tick, 1000);
  });
}

self.startPomodoro = function () {
  const phase = "focus";
  const remaining = 25 * 60;
  const state = {
    running: true,
    phase,
    remaining,
    lastTick: Date.now()
  };
  chrome.storage.local.set({ pomodoroState: state });
  tick();
};

self.stopPomodoro = function () {
  chrome.storage.local.get("pomodoroState", async ({ pomodoroState }) => {
    if (pomodoroState) {
      pomodoroState.running = false;
      await chrome.storage.local.set({ pomodoroState });
    }
    clearTimeout(timer);
  });
};
