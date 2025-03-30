# 🖥️ Real-Time Desktop Monitoring App – Roadmap & Tech Stack

## ✅ Final Tech Stack

| Layer                      | Technology                      | Purpose                                   |
|---------------------------|----------------------------------|-------------------------------------------|
| **Frontend UI**           | React (with Vite)                | User interface (interviewer & candidate)  |
| **Desktop Shell**         | Electron                         | Cross-platform desktop app wrapper        |
| **Local Process Scanner** | Python + `psutil`                | Gets list of running apps/processes       |
| **Script Execution**      | Node.js `child_process`          | Runs Python script from Electron          |
| **Real-Time Communication** | Socket.IO (WebSocket)         | Connect interviewer & candidate live      |
| **Backend (WebSocket server)** | Node.js + Express + Socket.IO | Handles real-time room connections        |
| **Session Linking**       | UUID or NanoID                   | Generates & shares session codes          |
| **Packaging**             | Electron Builder                 | Builds `.exe`, `.dmg`, etc.               |

---

## 📍 Roadmap (Phase-by-Phase)

### 🔹 Phase 1: React + Electron Setup
- Scaffold project using **Vite + React**
- Add Electron main process (`main.js`)
- Start Electron + React together
- Display basic UI: "Start Monitoring" + Role toggle

---

### 🔹 Phase 2: Local Process Scanner with Python
- Write a Python script that uses `psutil` to return running processes
- From Electron (Node.js), run this script using `child_process`
- Capture its output and send it to your React UI
- Show processes in a list

---

### 🔹 Phase 3: WebSocket Server for Real-Time Sync
- Set up a WebSocket server using **Socket.IO + Express**
- Interviewer creates a session (UUID code)
- Candidate enters the code to join that session
- Candidate’s app sends process list to server
- Server sends it to the interviewer in real time

---

### 🔹 Phase 4: Session Code Handling
- Add form in UI to generate/enter a session code
- Use it to join a room on WebSocket server
- Ensure clean separation per session

---

### 🔹 Phase 5: Packaging the Desktop App
- Use **Electron Builder** to package for Windows/macOS
- Handle Python script location on production builds
- Optional: Add a "Run in Background" mode or system tray

---

## 📚 Topics You Need to Know / Learn

### 🟢 React (Frontend UI)
- `useState`, `useEffect`, props/state flow
- Form handling (`onSubmit`, inputs)
- Conditional rendering (based on role)
- List rendering (to show processes)
- Basic component structure

### 🟡 Electron
- Difference between `main.js` and renderer (React)
- Creating windows (`BrowserWindow`)
- Packaging with `electron-builder`
- Using Node.js APIs in preload or renderer

### 🔵 Python
- Using `psutil` to list running processes
- Returning JSON output via `print()`
- Error handling in Python scripts

### 🔴 Node.js + Socket.IO (Backend Server)
- Creating a WebSocket server with rooms
- `socket.join()`, `socket.emit()`, `io.to(room).emit()`
- Handling incoming/outgoing messages
- Keeping a clean connection structure

### 🟣 Node.js `child_process`
- Running external scripts (Python)
- Capturing `stdout`, `stderr`
- Sending output to React

### 🟠 Bonus (Optional Later)
- Secure WebSocket communication (HTTPS/WSS)
- Firebase/Auth for user accounts
- Tailwind CSS for cleaner UI
- Logging to file for reports/debug

---

## ⏳ Estimated Timeline

| Phase    | Est. Time   |
|----------|-------------|
| Phase 1  | 0.5–1 day   |
| Phase 2  | 0.5–1 day   |
| Phase 3  | 1–2 days    |
| Phase 4  | 1 day       |
| Phase 5  | 1–2 days    |
