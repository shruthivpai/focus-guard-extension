document.getElementById("startBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "START_POMODORO" });
});

document.getElementById("stopBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "STOP_POMODORO" });
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

function updateStatus() {
  chrome.storage.local.get(["pomodoroState", "timeTracking"], ({ pomodoroState, timeTracking }) => {
    // Pomodoro status
    if (pomodoroState) {
      const statusText = `${pomodoroState.phase.toUpperCase()}: ${pomodoroState.running ? "Running" : "Paused"}: ${formatTime(pomodoroState.remaining || 0)} left`;
      document.getElementById("status").textContent = statusText;
    } else {
      document.getElementById("status").textContent = "Idle";
    }
  });
}

updateStatus();
setInterval(updateStatus, 1000);
