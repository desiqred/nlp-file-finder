import React from 'react';
import { ExternalLink, FolderOpen, Star, Calendar, HardDrive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface FileResultProps {
  file: {
    id: string;
    name: string;
    path: string;
    type: string;
    size: string;
    modified: string;
    snippet?: string;
    relevance: number;
  };
  icon: React.ReactNode;
  onOpen: () => void;
  onOpenLocation: () => void;
  index: number;
}

const FileResult = ({ file, icon, onOpen, onOpenLocation, index }: FileResultProps) => {
  const getFileTypeBadge = (type: string) => {
    const badgeClass = `file-badge file-badge-${type.toLowerCase()}`;
    return (
      <Badge className={cn(badgeClass)}>
        {type.toUpperCase()}
      </Badge>
    );
  };

  const formatPath = (path: string) => {
    const parts = path.split('\\');
    if (parts.length > 4) {
      return `${parts[0]}\\...\\${parts[parts.length - 2]}\\${parts[parts.length - 1]}`;
    }
    return path;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 0.9) return 'text-green-400';
    if (relevance >= 0.7) return 'text-yellow-400';
    return 'text-orange-400';
  };

  return (
    <div 
      className="group p-4 rounded-lg border border-border hover:border-border-hover bg-gradient-surface hover:bg-secondary/30 transition-all duration-smooth animate-fade-in cursor-pointer"
      style={{ animationDelay: `${index * 50}ms` }}
      onClick={onOpen}
    >
      <div className="flex items-start gap-3">
        {/* File Icon & Type */}
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 rounded-lg bg-secondary/50 group-hover:bg-secondary/70 transition-colors">
            {icon}
          </div>
          {getFileTypeBadge(file.type)}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* File Name & Relevance */}
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {file.name}
                </h4>
                <Star className={cn("w-3 h-3", getRelevanceColor(file.relevance))} />
                <span className={cn("text-xs font-medium", getRelevanceColor(file.relevance))}>
                  {Math.round(file.relevance * 100)}%
                </span>
              </div>

              {/* File Path */}
              <div className="flex items-center gap-1 mb-2 text-sm text-foreground-muted">
                <HardDrive className="w-3 h-3" />
                <span className="truncate" title={file.path}>
                  {formatPath(file.path)}
                </span>
              </div>

              {/* File Snippet */}
              {file.snippet && (
                <p className="text-sm text-foreground-muted mb-3 line-clamp-2 leading-relaxed">
                  {file.snippet}
                </p>
              )}

              {/* File Metadata */}
              <div className="flex items-center gap-4 text-xs text-foreground-muted">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(file.modified)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary/60"></span>
                  <span>{file.size}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen();
                }}
                className="gap-2 text-xs h-8"
              >
                <ExternalLink className="w-3 h-3" />
                Open
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLocation();
                }}
                className="gap-2 text-xs h-8 hover:bg-secondary"
              >
                <FolderOpen className="w-3 h-3" />
                Location
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileResult;