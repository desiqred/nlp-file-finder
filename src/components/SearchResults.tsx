import { useState, useMemo } from 'react';
import { FileText, Image, FileSpreadsheet, Video, Music, Archive, FolderOpen, ExternalLink, Clock, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FileResult from './FileResult';
import { SearchFilters } from './SearchInterface';

interface FileData {
  id: string;
  name: string;
  path: string;
  type: string;
  size: string;
  modified: string;
  content?: string;
  snippet?: string;
  relevance: number;
}

interface SearchResultsProps {
  query: string;
  filters: SearchFilters;
}

// Mock file data - in a real app, this would come from the indexing system
const mockFiles: FileData[] = [
  {
    id: '1',
    name: 'Grandmas_Lasagna_Recipe.pdf',
    path: 'C:\\Users\\John\\Downloads\\Recipes\\Grandmas_Lasagna_Recipe.pdf',
    type: 'pdf',
    size: '2.4 MB',
    modified: '2024-03-15',
    snippet: 'Classic Italian lasagna recipe with ricotta, ground beef, and homemade tomato sauce. Serves 8-10 people...',
    relevance: 0.95
  },
  {
    id: '2',
    name: 'Marketing_Presentation_Q1_2024.pptx',
    path: 'C:\\Users\\John\\Documents\\Work\\Marketing_Presentation_Q1_2024.pptx',
    type: 'pptx',
    size: '15.7 MB',
    modified: '2024-08-18',
    snippet: 'Q1 2024 Marketing Strategy Overview - Digital transformation initiatives, customer acquisition strategies...',
    relevance: 0.88
  },
  {
    id: '3',
    name: 'Family_Recipes_Collection.docx',
    path: 'C:\\Users\\John\\Documents\\Personal\\Family_Recipes_Collection.docx',
    type: 'docx',
    size: '847 KB',
    modified: '2024-03-20',
    snippet: 'A collection of traditional family recipes including lasagna, meatballs, and Sunday gravy...',
    relevance: 0.82
  },
  {
    id: '4',
    name: 'Weekly_Marketing_Report.xlsx',
    path: 'C:\\Users\\John\\Documents\\Work\\Reports\\Weekly_Marketing_Report.xlsx',
    type: 'xlsx',
    size: '1.2 MB',
    modified: '2024-08-19',
    snippet: 'Weekly marketing metrics and KPI analysis for August 2024...',
    relevance: 0.75
  },
  {
    id: '5',
    name: 'Italian_Cooking_Guide.pdf',
    path: 'C:\\Users\\John\\Downloads\\Cookbooks\\Italian_Cooking_Guide.pdf',
    type: 'pdf',
    size: '28.3 MB',
    modified: '2024-02-10',
    snippet: 'Complete guide to authentic Italian cuisine including pasta, sauces, and traditional recipes...',
    relevance: 0.68
  },
  {
    id: '6',
    name: 'Marketing_Team_Photos.zip',
    path: 'C:\\Users\\John\\Pictures\\Work\\Marketing_Team_Photos.zip',
    type: 'zip',
    size: '156 MB',
    modified: '2024-08-17',
    snippet: 'Photo archive from marketing team events and presentations...',
    relevance: 0.42
  }
];

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return <FileText className="w-5 h-5 text-red-400" />;
    case 'docx':
    case 'doc':
      return <FileText className="w-5 h-5 text-blue-400" />;
    case 'xlsx':
    case 'xls':
      return <FileSpreadsheet className="w-5 h-5 text-green-400" />;
    case 'pptx':
    case 'ppt':
      return <FileText className="w-5 h-5 text-orange-400" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <Image className="w-5 h-5 text-purple-400" />;
    case 'mp4':
    case 'avi':
    case 'mov':
      return <Video className="w-5 h-5 text-pink-400" />;
    case 'mp3':
    case 'wav':
      return <Music className="w-5 h-5 text-yellow-400" />;
    case 'zip':
    case 'rar':
      return <Archive className="w-5 h-5 text-gray-400" />;
    default:
      return <FileText className="w-5 h-5 text-foreground-muted" />;
  }
};

const SearchResults = ({ query, filters }: SearchResultsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const filteredResults = useMemo(() => {
    let results = mockFiles.filter(file => {
      // Simple text matching - in real app, this would be AI-powered semantic search
      const searchableText = `${file.name} ${file.snippet || ''}`.toLowerCase();
      const queryLower = query.toLowerCase();
      
      const matchesQuery = searchableText.includes(queryLower) || 
                          queryLower.split(' ').some(term => searchableText.includes(term));
      
      if (!matchesQuery) return false;

      // Apply filters
      if (filters.fileTypes.length > 0 && !filters.fileTypes.includes(file.type)) {
        return false;
      }

      // Date range filter
      if (filters.dateRange !== 'all') {
        const fileDate = new Date(file.modified);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - fileDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (filters.dateRange) {
          case 'today':
            if (daysDiff > 0) return false;
            break;
          case 'week':
            if (daysDiff > 7) return false;
            break;
          case 'month':
            if (daysDiff > 30) return false;
            break;
          case 'year':
            if (daysDiff > 365) return false;
            break;
        }
      }

      // Folder filter
      if (filters.folder !== 'all') {
        const folderName = filters.folder.toLowerCase();
        if (!file.path.toLowerCase().includes(folderName)) {
          return false;
        }
      }

      return true;
    });

    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance);
  }, [query, filters]);

  const openFile = (filePath: string) => {
    // In a real desktop app, this would open the file
    console.log('Opening file:', filePath);
  };

  const openLocation = (filePath: string) => {
    // In a real desktop app, this would open the folder containing the file
    console.log('Opening location:', filePath);
  };

  if (!query) return null;

  return (
    <div className="glass-card rounded-xl p-6 shadow-glass-lg animate-slide-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">
            {isLoading ? 'Searching...' : `${filteredResults.length} results`}
          </h3>
          {!isLoading && filteredResults.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              AI-powered
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-foreground-muted">
          <Clock className="w-3 h-3" />
          <span>{isLoading ? '...' : '0.24s'}</span>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="w-5 h-5 bg-secondary rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-secondary rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-secondary rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="text-center py-8 text-foreground-muted">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg mb-2">No files found</p>
          <p className="text-sm">Try adjusting your search query or filters</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {filteredResults.map((file, index) => (
            <FileResult
              key={file.id}
              file={file}
              icon={getFileIcon(file.type)}
              onOpen={() => openFile(file.path)}
              onOpenLocation={() => openLocation(file.path)}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;