import { app, BrowserWindow, ipcMain } from 'electron';
import path, { dirname } from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { io } from 'socket.io-client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const socket = io('http://localhost:3001');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));

  ipcMain.on('start-python', (event, { role, roomCode }) => {
    console.log("Received ROLE and ROOM from React:", role, roomCode);

    if (role === 'interviewee') {
      const scriptPath = path.join(__dirname, 'stream_processes.py');
      const child = spawn('python', [scriptPath]);

      child.stdout.on('data', (data) => {
        const output = data.toString();
        console.log("Python output:", output);

        const parsed = JSON.parse(output); 
        console.log(parsed)

        socket.emit('candidate-data', { processes: parsed, room: roomCode }); 
      });

      child.stderr.on('data', (err) => {
        console.error("Python error:", err.toString());
      });

      child.on('exit', (code) => {
        console.log(`Python script exited with code ${code}`);
      });
    }
  });
});
