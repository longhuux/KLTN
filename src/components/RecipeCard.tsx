
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  time: number; // in minutes
  rating: number;
  category: string;
  favorite?: boolean;
  className?: string;
}

const RecipeCard = ({
  id,
  title,
  image,
  time,
  rating,
  category,
  favorite = false,
  className,
}: RecipeCardProps) => {
  const [isFavorite, setIsFavorite] = React.useState(favorite);
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // In a real app, you would send this to your API
  };
  
  return (
    <div className={cn("recipe-card group", className)}>
      <Link to={`/recipes/${id}`} className="block">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="recipe-card-img transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
            onClick={toggleFavorite}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
              )}
            />
            <span className="sr-only">
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </span>
          </Button>
          <Badge
            variant="secondary"
            className="absolute bottom-2 left-2 bg-background/70 backdrop-blur-sm text-xs"
          >
            {category}
          </Badge>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{time} min</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs font-medium">
                {rating.toFixed(1)}★
              </span>
            </div>
          </div>
          <h3 className="font-medium text-base line-clamp-2">{title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
