import { FileText, Image, FileSpreadsheet, Video, Music, Archive, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchFilters as SearchFiltersType } from './SearchInterface';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
}

const fileTypeOptions = [
  { type: 'pdf', label: 'PDF', icon: FileText, color: 'text-red-400' },
  { type: 'docx', label: 'Word', icon: FileText, color: 'text-blue-400' },
  { type: 'xlsx', label: 'Excel', icon: FileSpreadsheet, color: 'text-green-400' },
  { type: 'pptx', label: 'PowerPoint', icon: FileText, color: 'text-orange-400' },
  { type: 'jpg', label: 'Images', icon: Image, color: 'text-purple-400' },
  { type: 'mp4', label: 'Videos', icon: Video, color: 'text-pink-400' },
  { type: 'mp3', label: 'Audio', icon: Music, color: 'text-yellow-400' },
  { type: 'zip', label: 'Archives', icon: Archive, color: 'text-gray-400' },
];

const dateRangeOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];

const folderOptions = [
  { value: 'all', label: 'All Folders' },
  { value: 'downloads', label: 'Downloads' },
  { value: 'documents', label: 'Documents' },
  { value: 'pictures', label: 'Pictures' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'work', label: 'Work Files' },
];

const SearchFilters = ({ filters, onFiltersChange }: SearchFiltersProps) => {
  const toggleFileType = (type: string) => {
    const newTypes = filters.fileTypes.includes(type)
      ? filters.fileTypes.filter(t => t !== type)
      : [...filters.fileTypes, type];
    
    onFiltersChange({
      ...filters,
      fileTypes: newTypes
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      fileTypes: [],
      dateRange: 'all',
      folder: 'all'
    });
  };

  const hasActiveFilters = filters.fileTypes.length > 0 || 
                          filters.dateRange !== 'all' || 
                          filters.folder !== 'all';

  return (
    <div className="glass-card rounded-xl p-6 shadow-glass-lg mb-4 animate-slide-in-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Search Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs text-foreground-muted hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* File Types */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">File Types</h4>
          <div className="flex flex-wrap gap-2">
            {fileTypeOptions.map(({ type, label, icon: Icon, color }) => (
              <Button
                key={type}
                variant={filters.fileTypes.includes(type) ? "secondary" : "ghost"}
                size="sm"
                onClick={() => toggleFileType(type)}
                className={cn(
                  "gap-2 border transition-all duration-fast",
                  filters.fileTypes.includes(type) 
                    ? "border-primary/50 shadow-glow-primary" 
                    : "border-transparent hover:border-border"
                )}
              >
                <Icon className={cn("w-4 h-4", color)} />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Date Range and Folder in a row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Range */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Date Modified</h4>
            <Select
              value={filters.dateRange}
              onValueChange={(value) => onFiltersChange({ ...filters, dateRange: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Folder */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Location</h4>
            <Select
              value={filters.folder}
              onValueChange={(value) => onFiltersChange({ ...filters, folder: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {folderOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Filters</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFiltersChange({ ...filters, fileTypes: ['pdf'], dateRange: 'month' })}
              className="gap-2 text-xs"
            >
              📄 Recent PDFs
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFiltersChange({ ...filters, fileTypes: ['docx', 'pptx'], folder: 'work' })}
              className="gap-2 text-xs"
            >
              💼 Work Documents
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFiltersChange({ ...filters, fileTypes: ['jpg', 'png'], dateRange: 'week' })}
              className="gap-2 text-xs"
            >
              🖼️ Recent Images
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFiltersChange({ ...filters, folder: 'downloads', dateRange: 'month' })}
              className="gap-2 text-xs"
            >
              ⬇️ Recent Downloads
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;