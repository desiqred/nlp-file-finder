# AI File Searcher

A modern web application for searching files using natural language queries, built with React and TypeScript.

## Features

- **Natural Language Search**: Find files using descriptions like "Find the PDF with lasagna recipe I downloaded in March"
- **Advanced Filters**: Filter by file type, date range, and folder location
- **Spotlight-style Interface**: Beautiful, modern UI with search overlay
- **File Previews**: View file snippets and metadata before opening
- **Dark/Light Mode**: Adaptive theming support
- **Mock Data**: Currently demonstrates functionality with realistic mock file data

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:8080` to use the application.

## Usage

### Keyboard Shortcuts
- **Click "Start Searching"** or press the search button to open the interface
- **Escape**: Close search interface
- **Enter**: Execute search

### Search Examples
Try these example queries to see the AI-powered search in action:
- "lasagna recipe" - finds recipe PDFs and documents
- "marketing" - finds presentation files and reports
- "excel" or "spreadsheet" - filters to Excel files
- Use the date and type filters for more specific results

## Features Demonstrated

### Smart Search Interface
- Natural language query processing
- Real-time search results with relevance scoring
- File type detection with appropriate icons
- Snippet previews of file contents

### Advanced Filtering
- File type filters (PDF, DOC, XLS, PPT, etc.)
- Date range selection (today, week, month, year, custom)
- Folder location filtering
- Active filter management with remove options

### Modern UI/UX
- Glass morphism design with backdrop blur
- Smooth animations and transitions
- Responsive layout for all screen sizes
- Intuitive keyboard navigation

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Radix UI + shadcn/ui
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: CSS transforms + Tailwind animations

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── SearchInterface.tsx # Main search overlay interface
│   ├── SearchResults.tsx   # Results display with file cards
│   ├── SearchFilters.tsx   # Advanced filter controls
│   └── FileResult.tsx      # Individual file result component
├── pages/
│   └── Index.tsx          # Main landing page
├── lib/
│   └── utils.ts           # Utility functions
└── index.css              # Global styles and design tokens
```

## Development Notes

This is a **frontend-only React application** that demonstrates the UI/UX for an AI-powered file search tool. It currently uses mock data to showcase functionality.

### For VSCode Development:
1. Clone/download the project
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open in your browser to see the live application

### Next Steps for Real Implementation:
1. **Backend Integration**: Add file system scanning and indexing
2. **AI Search**: Integrate with OpenAI embeddings or local search models
3. **File System Access**: Add real file reading and opening capabilities
4. **Desktop App**: Convert to Electron for native Windows integration
5. **Performance**: Add virtual scrolling and search result caching

## Desktop App Option

To convert this to a Windows desktop app later:

1. Install Electron separately using npm (not bun):
   ```bash
   npm install electron electron-builder --save-dev
   ```

2. Add Electron main process file and build scripts

3. Use npm instead of bun for Electron compatibility

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Submit a pull request

## License

MIT License - feel free to use this code for your own projects!