import { useState, useEffect, useRef } from 'react';
import { Search, Command, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchResults from './SearchResults';
import SearchFilters from './SearchFilters';
import { cn } from '@/lib/utils';

interface SearchInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface SearchFilters {
  fileTypes: string[];
  dateRange: string;
  dateFrom?: Date;
  dateTo?: Date;
  folder: string;
}

const SearchInterface = ({ isOpen, onClose }: SearchInterfaceProps) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    fileTypes: [],
    dateRange: 'all',
    folder: ''
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const clearQuery = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 spotlight-overlay animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="flex items-start justify-center min-h-screen pt-[15vh] px-4">
        <div className="w-full max-w-2xl animate-slide-in-up">
          {/* Search Bar */}
          <div className="glass-card rounded-xl p-6 shadow-glass-lg mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 flex-1 relative">
                <Search className="w-5 h-5 text-foreground-muted absolute left-0" />
                <Input
                  ref={inputRef}
                  placeholder="Search your files with AI..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border-0 bg-transparent text-lg placeholder:text-foreground-muted focus-visible:ring-0 search-input pl-8 pr-20"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-gradient-primary hover:shadow-glow-primary px-4 absolute right-0"
                  onClick={() => {/* Search submission logic */}}
                >
                  Search
                </Button>
                {query && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearQuery}
                    className="p-1 h-auto hover:bg-secondary absolute right-20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={showFilters ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.fileTypes.length > 0 || filters.dateRange !== 'all' || filters.folder !== '') && (
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                <span className="text-sm text-foreground-muted">Filters:</span>
                {filters.fileTypes.map(type => (
                  <Badge key={type} variant="secondary" className="gap-1">
                    {type.toUpperCase()}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => setFilters(prev => ({
                        ...prev,
                        fileTypes: prev.fileTypes.filter(t => t !== type)
                      }))}
                    />
                  </Badge>
                ))}
                {filters.dateRange !== 'all' && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.dateRange}
                    <X 
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setFilters(prev => ({ ...prev, dateRange: 'all' }))}
                    />
                  </Badge>
                )}
                {filters.folder !== '' && (
                  <Badge variant="secondary" className="gap-1">
                    📁 {filters.folder}
                    <X 
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => setFilters(prev => ({ ...prev, folder: '' }))}
                    />
                  </Badge>
                )}
              </div>
            )}

            {/* Keyboard Shortcut Hint */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-4 text-xs text-foreground-muted">
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-secondary rounded text-xs">↵</kbd>
                  Search
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-secondary rounded text-xs">Esc</kbd>
                  Close
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-foreground-muted">
                <Command className="w-3 h-3" />
                <span>AI File Searcher</span>
              </div>
            </div>
          </div>

          {/* Search Filters Panel */}
          {showFilters && (
            <SearchFilters 
              filters={filters}
              onFiltersChange={setFilters}
            />
          )}

          {/* Search Results */}
          {query.length > 0 && (
            <SearchResults query={query} filters={filters} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInterface;