**Focus Guard – Productivity Chrome Extension**
Focus Guard is a productivity-enhancing Chrome extension that helps you stay focused by slowing down your internet speed (or blocking distractions) when you're on social media and rewarding you with full speed when you're doing productive work. It also integrates a full Pomodoro Timer to boost concentration through time-boxed focus sessions.

**Features**
- Slows down or restricts internet access on social media sites
- Rewards you with full speed access when on productive sites
- Built-in Pomodoro Timer with customizable focus & break intervals
- Lightweight, no unnecessary permissions or bloat

**Installation**
Clone or download this repository

Open Chrome and go to chrome://extensions

Enable Developer mode (top right)

Click "Load unpacked"

Select the folder where this extension is located

Done!

**How It Works**
Domain Monitoring: The extension uses your configured lists of productive and distracting websites.

Pomodoro Timer: 25-minute focus + 5-minute break (default), adjustable in future versions.

Time Tracking: Time spent in each category is tracked and displayed.

Focus Mode:

While in focus, social sites can be slowed down or blocked (via injected scripts or network throttling logic).

If you leave a productive site during Pomodoro, the timer can optionally pause.

**Components**
File	Description
manifest.json	Chrome extension manifest (v3)
background.js	Core logic: timer, domain detection, messaging
popup.html	UI for Pomodoro controls and status
popup.js	Logic for user interaction with popup
pomodoro.js	Timer utility functions

**Example Popup UI**
sql
Copy
Edit
+-----------------------------+
|        Focus Guard         |
+-----------------------------+
| Status: FOCUS — Running    |
| Time left: 22m 15s         |
+-----------------------------+
| ▶️ Start Pomodoro           |
| ⏹️ Stop Pomodoro            |
+-----------------------------+
**Future Enhancements**
Custom Pomodoro duration (Focus / Break)

Notifications & sound alerts

Weekly productivity analytics

Dark mode

Configurable throttling instead of block

**Contributing**
Contributions are welcome! If you have ideas or find bugs:

Fork the repo

Create a branch

Make your changes

Submit a PR

**Permissions**
This extension only requests:

tabs, storage, scripting, and host_permissions to track open tabs and inject logic when needed

**License**
MIT License © 2025
Author: [Shruthi V Pai]
