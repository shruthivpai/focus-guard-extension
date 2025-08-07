importScripts("pomodoro.js");

let currentCategory = null;
let lastActiveTime = Date.now();

async function updateTimeSpent(category, timeSpent) {
  const { timeTracking = { productive: 0, social: 0 } } = await chrome.storage.local.get("timeTracking");
  timeTracking[category] = (timeTracking[category] || 0) + timeSpent;
  await chrome.storage.local.set({ timeTracking });
}

async function handleActiveTabChange(tab) {
  if (!tab || !tab.url) return;

  const url = new URL(tab.url);
  const domain = url.hostname;

  const { socialDomains = [], productiveDomains = [] } = await chrome.storage.sync.get([
    "socialDomains",
    "productiveDomains"
  ]);

  const { pomodoroState } = await chrome.storage.local.get("pomodoroState");

  // Determine category
  let newCategory = null;
  if (socialDomains.some(d => domain.includes(d))) {
    newCategory = "social";
  } else if (productiveDomains.some(d => domain.includes(d))) {
    newCategory = "productive";
  }

  // Blocking logic during Pomodoro
  if (pomodoroState?.phase === "focus" && socialDomains.some(d => domain.includes(d))) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        document.body.innerHTML = "<h1>🚫 Blocked during focus session!</h1>";
        document.body.style.fontSize = "24px";
        document.body.style.textAlign = "center";
        document.body.style.paddingTop = "100px";
      }
    });
  }

  // Pause Pomodoro if not on productive site
  if (pomodoroState?.phase === "focus") {
    const isProductive = productiveDomains.some(d => domain.includes(d));
    if (!isProductive && pomodoroState.running) {
      pomodoroState.running = false;
      await chrome.storage.local.set({ pomodoroState });
      clearTimeout(timer);
    } else if (isProductive && !pomodoroState.running) {
      pomodoroState.running = true;
      pomodoroState.lastTick = Date.now();
      await chrome.storage.local.set({ pomodoroState });
      tick();
    }
  }
}

// Tab and window listeners
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);
  handleActiveTabChange(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    handleActiveTabChange(tab);
  }
});

chrome.windows.onFocusChanged.addListener(async (windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) return;
  const [tab] = await chrome.tabs.query({ active: true, windowId });
  if (tab) handleActiveTabChange(tab);
});

// Pomodoro control from popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "START_POMODORO") {
    startPomodoro();
  } else if (message.type === "STOP_POMODORO") {
    stopPomodoro();
  }
});
