
import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Bookmark, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ChallengeHeaderProps {
  title: string;
  isBookmarked: boolean;
  handleBookmark: () => void;
  handleShare: () => void;
  downloadChallengeGuide: () => void;
}

export const ChallengeHeader = ({
  title,
  isBookmarked,
  handleBookmark,
  handleShare,
  downloadChallengeGuide,
}: ChallengeHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div>
        <Link to="/challenges" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Retour aux challenges
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={handleBookmark}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
          <span className="hidden sm:inline">{isBookmarked ? "Enregistré" : "Enregistrer"}</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-1"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Partager</span>
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          className="gap-1"
          onClick={downloadChallengeGuide}
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Guide PDF</span>
        </Button>
      </div>
    </div>
  );
};
