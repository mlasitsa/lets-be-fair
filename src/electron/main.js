import { app, BrowserWindow, ipcMain } from 'electron';
import path, { dirname } from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { io } from 'socket.io-client';


const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const socket = io('http://localhost:3001');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width : 1000,
    height: 800,
    webPreferences: {
      nodeIntegration : false,                         // disable Node in renderer (look inot this)
      contextIsolation: true,                          // isolate context (look into this)
      preload        : path.join(__dirname, 'preload.js') // expose safe API (look into this)
    }
  });

  mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on('start-python', (event, { role, roomCode }) => {
  console.log('Received ROLE and ROOM from React:', role, roomCode);

  if (role === 'interviewee') {
    const scriptPath = path.join(__dirname, 'stream_processes.py');
    const child = spawn('python', [scriptPath]);

    child.stdout.on('data', (data) => {
      try {
        const parsed = JSON.parse(data.toString());
        socket.emit('candidate-data', { processes: parsed, room: roomCode });
      } catch (e) {
        console.error('Failed to parse Python JSON:', e);
      }
    });

    child.stderr.on('data', (err) => {
      console.error('Python error:', err.toString());
    });

    child.on('exit', (code) => {
      console.log(`Python script exited with code ${code}`);
    });
  }
});
