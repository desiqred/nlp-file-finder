# AI File Searcher

A Windows desktop application for searching files using natural language queries, built with React and Electron.

## Features

- **Natural Language Search**: Find files using descriptions like "Find the PDF with lasagna recipe I downloaded in March"
- **Advanced Filters**: Filter by file type, date range, and folder location
- **Spotlight-style Interface**: Beautiful, modern UI with Alt+Space global shortcut
- **File Previews**: View file snippets and metadata before opening
- **Dark/Light Mode**: Adaptive theming support

## Quick Start

### Web Version (Development)
```bash
# Install dependencies
npm install

# Run web version
npm run dev
```
Visit `http://localhost:8080` to use the web interface.

### Desktop App Setup

To convert this to a working Windows desktop app:

1. **Install Electron dependencies:**
   ```bash
   npm install electron electron-builder concurrently wait-on --save-dev
   ```

2. **Add desktop scripts to package.json:**
   ```json
   {
     "main": "public/electron.js",
     "scripts": {
       "electron": "electron .",
       "electron-dev": "concurrently \"npm run dev\" \"wait-on http://localhost:8080 && electron .\"",
       "dist": "npm run build && electron-builder"
     }
   }
   ```

3. **Run desktop app:**
   ```bash
   # Development mode (hot reload)
   npm run electron-dev
   
   # Production mode
   npm run build
   npm run electron
   
   # Build installer
   npm run dist
   ```

## Usage

### Keyboard Shortcuts
- **Alt + Space**: Open search interface (desktop app only)
- **Escape**: Close search interface
- **Enter**: Execute search

### Search Examples
- "Find the PDF with lasagna recipe I downloaded in March"
- "Show me the marketing PowerPoint from last week"
- "Excel files modified today"
- "Documents in the downloads folder"

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Desktop**: Electron (optional)
- **UI Components**: Radix UI + shadcn/ui
- **Build Tool**: Vite
- **Package Manager**: npm/bun

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── SearchInterface.tsx # Main search interface
│   ├── SearchResults.tsx   # Results display
│   ├── SearchFilters.tsx   # Filter controls
│   └── FileResult.tsx      # Individual file result
├── pages/
│   └── Index.tsx          # Main page
└── lib/
    └── utils.ts           # Utility functions
```

## Development Notes

The app is currently set up as a React web application with mock data. The Electron configuration files are included but dependencies need to be installed separately.

For VSCode development:
1. Use the web version for rapid development
2. Install Electron dependencies when ready to build desktop app
3. The app includes proper TypeScript types and modern React patterns

## Next Steps

1. **Backend Integration**: Connect to a real file indexing system
2. **AI Search**: Integrate with OpenAI or local embedding models
3. **File System Access**: Add real file system scanning capabilities
4. **Performance**: Implement virtual scrolling for large result sets

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License