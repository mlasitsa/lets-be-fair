import { app, BrowserWindow, ipcMain } from 'electron';
import path, { dirname } from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,           // OK for dev; for prod use preload + contextBridge
      contextIsolation: false          // Must be false to use ipcRenderer in React for now
    }
  });

  mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));

  // 🔌 Listen for role from React via ipcRenderer
  ipcMain.on('start-python', (event, role) => {
    console.log("📥 Received role from React:", role);

    if (role === 'interviewee') {
      const scriptPath = path.join(__dirname, 'stream_processes.py');
      const child = spawn('python', [scriptPath]);

      child.stdout.on('data', (data) => {
        const output = data.toString();
        console.log("🟢 Python output:", output);

        // Optional: forward data to frontend (React) via IPC
        mainWindow.webContents.send('process-data', JSON.parse(output));
      });

      child.stderr.on('data', (err) => {
        console.error("❌ Python error:", err.toString());
      });

      child.on('exit', (code) => {
        console.log(`🛑 Python script exited with code ${code}`);
      });
    }
  });
});
