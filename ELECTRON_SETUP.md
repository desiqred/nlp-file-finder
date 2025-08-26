# Create FileLens.exe - Manual Setup

Since Bun has issues with Electron, follow these steps to create your Windows executable:

## Step 1: Export to GitHub
1. Click "Export to GitHub" in Lovable
2. Clone your repo locally
3. Navigate to the project folder

## Step 2: Switch to npm and Install Electron
```bash
# Remove bun.lockb if it exists
rm bun.lockb

# Install with npm instead
npm install

# Add Electron dependencies
npm install --save-dev electron electron-builder concurrently wait-on
```

## Step 3: Create Electron Files

Create `public/electron.js`:
```javascript
const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    show: false,
    icon: path.join(__dirname, 'favicon.ico')
  });

  const startUrl = isDev 
    ? 'http://localhost:8080' 
    : `file://${path.join(__dirname, '../dist/index.html')}`;
  
  mainWindow.loadURL(startUrl);
  mainWindow.once('ready-to-show', () => mainWindow.show());

  // Alt+Space shortcut
  globalShortcut.register('Alt+Space', () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') app.quit();
});
```

## Step 4: Update package.json scripts
Add these to your package.json:
```json
{
  "main": "public/electron.js",
  "scripts": {
    "electron": "electron .",
    "electron-dev": "concurrently \"npm run dev\" \"wait-on http://localhost:8080 && electron .\"",
    "build-electron": "npm run build && electron-builder",
    "dist": "npm run build && electron-builder --win --publish=never"
  },
  "build": {
    "appId": "com.filelens.app",
    "productName": "FileLens",
    "directories": {
      "output": "dist-electron"
    },
    "files": [
      "dist/**/*",
      "public/electron.js"
    ],
    "win": {
      "target": "nsis",
      "icon": "public/favicon.ico"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    }
  }
}
```

## Step 5: Build FileLens.exe
```bash
# Build the React app
npm run build

# Create Windows installer
npm run dist
```

Your `FileLens.exe` will be in the `dist-electron` folder!

## Quick Test
```bash
# Test in development
npm run electron-dev

# Test production build
npm run electron
```