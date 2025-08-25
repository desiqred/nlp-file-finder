import { useState, useEffect } from 'react';
import { Search, Command, Folder, Settings, Info, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SearchInterface from '@/components/SearchInterface';
import { cn } from '@/lib/utils';

const Index = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [indexedFiles, setIndexedFiles] = useState(12847);
  const [isIndexing, setIsIndexing] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + Space to open search
      if (e.altKey && e.code === 'Space') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const startIndexing = () => {
    setIsIndexing(true);
    // Simulate indexing process
    setTimeout(() => {
      setIsIndexing(false);
      setIndexedFiles(prev => prev + Math.floor(Math.random() * 100));
    }, 3000);
  };

  const stats = [
    { label: 'Total Files Indexed', value: indexedFiles.toLocaleString(), icon: Folder },
    { label: 'Search Speed', value: '< 0.5s', icon: Zap },
    { label: 'File Types', value: '25+', icon: Command },
    { label: 'Storage Scanned', value: '847 GB', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_50%)]" />
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-primary shadow-glass-md">
                <Search className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                  AI File Searcher
                </h1>
                <p className="text-lg text-foreground-muted mt-1">
                  Natural language file search for Windows
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto leading-relaxed">
              Find your files using natural language. No more remembering exact file names—just describe what you're looking for.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                size="lg"
                onClick={() => setIsSearchOpen(true)}
                className="gap-3 px-8 py-6 text-lg bg-gradient-primary hover:shadow-glow-primary transition-all duration-smooth"
              >
                <Search className="w-5 h-5" />
                Start Searching
              </Button>
              
              <div className="flex items-center gap-2 text-sm text-foreground-muted">
                <kbd className="px-3 py-2 bg-secondary rounded-lg border border-border font-mono">Alt</kbd>
                <span>+</span>
                <kbd className="px-3 py-2 bg-secondary rounded-lg border border-border font-mono">Space</kbd>
                <span className="ml-2">Quick search hotkey</span>
              </div>
            </div>

            {/* Example Queries */}
            <div className="max-w-2xl mx-auto">
              <p className="text-sm text-foreground-muted mb-4">Try searching for:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Find the PDF with lasagna recipe I downloaded in March",
                  "Show me the marketing PowerPoint from last week",
                  "Pictures from vacation last summer",
                  "Excel files with budget in the name"
                ].map((query, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(true)}
                    className="text-left justify-start p-3 h-auto border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-smooth text-xs"
                  >
                    "{query}"
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="glass-card border-border/50">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
                <div className="text-sm text-foreground-muted">{label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI-Powered Search */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI-Powered Search</CardTitle>
                  <CardDescription>Natural language understanding</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground-muted mb-4">
                Use everyday language to find files. Our AI understands context and meaning, not just keywords.
              </p>
              <div className="space-y-2">
                <Badge variant="secondary" className="text-xs">Semantic Search</Badge>
                <Badge variant="secondary" className="text-xs">Content Indexing</Badge>
                <Badge variant="secondary" className="text-xs">OCR Support</Badge>
              </div>
            </CardContent>
          </Card>

          {/* File Indexing */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Folder className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Smart Indexing</CardTitle>
                  <CardDescription>Fast and comprehensive</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground-muted mb-4">
                Automatically indexes file metadata and content from PDFs, Word docs, spreadsheets, and more.
              </p>
              <Button
                onClick={startIndexing}
                disabled={isIndexing}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                {isIndexing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Indexing...
                  </>
                ) : (
                  <>
                    <Settings className="w-4 h-4" />
                    Start Indexing
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Modern Interface */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Command className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-lg">Spotlight Style</CardTitle>
                  <CardDescription>Clean and minimal</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground-muted mb-4">
                Windows 11 inspired design with smooth animations and keyboard shortcuts for power users.
              </p>
              <div className="flex items-center gap-2 text-sm text-foreground-muted">
                <kbd className="px-2 py-1 bg-secondary rounded text-xs">Alt + Space</kbd>
                <span>Quick access</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        <Card className="glass-card border-border/50 mt-16">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6 text-accent" />
              <div>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Set up your AI file search in minutes</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Select Folders</h3>
                <p className="text-sm text-foreground-muted">Choose which folders to index for searching</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Start Indexing</h3>
                <p className="text-sm text-foreground-muted">Let AI analyze your files and create search index</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Start Searching</h3>
                <p className="text-sm text-foreground-muted">Use natural language to find any file instantly</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Interface Overlay */}
      <SearchInterface
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default Index;