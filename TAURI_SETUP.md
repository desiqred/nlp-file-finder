# Create FileLens.exe with Tauri (Better than Electron)

Tauri creates smaller, faster native executables without the bloat of Electron.

## Why Tauri > Electron
- **10x smaller** file size (2-15MB vs 100-200MB)
- **Native performance** - uses system webview
- **Rust-powered** security and speed
- **No Node.js** bundled in final app

## Setup Steps

### 1. Export to GitHub & Clone Locally
1. Export your Lovable project to GitHub
2. Clone it locally
3. Navigate to project folder

### 2. Install Tauri CLI
```bash
# Install Tauri CLI
npm install -g @tauri-apps/cli

# Add Tauri to project
npm install -D @tauri-apps/cli
npx tauri init
```

### 3. Configure Tauri
When prompted during `tauri init`:
- App name: `FileLens`
- Window title: `FileLens - AI File Search`
- Web assets location: `../dist`
- Development server: `http://localhost:8080`
- Development command: `npm run dev`
- Build command: `npm run build`

### 4. Update package.json
```json
{
  "scripts": {
    "tauri": "tauri",
    "tauri-dev": "tauri dev",
    "tauri-build": "tauri build"
  }
}
```

### 5. Build FileLens.exe
```bash
# Development (hot reload)
npm run tauri-dev

# Production build
npm run tauri-build
```

Your `FileLens.exe` will be in `src-tauri/target/release/bundle/`

## Key Benefits for FileLens
- **Alt+Space** global shortcuts work perfectly
- **File system access** for actual file searching
- **Native file dialogs** and OS integration
- **Tiny 5MB executable** vs 150MB with Electron
- **Better performance** for file operations

## Alternative: PWA
If you want something that works immediately without local setup, I can configure this as a PWA that installs like a desktop app from the browser.