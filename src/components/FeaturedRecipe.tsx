
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FeaturedRecipeProps {
  id: string;
  title: string;
  description: string;
  image: string;
  time: number;
  rating: number;
  category: string;
}

const FeaturedRecipe = ({
  id,
  title,
  description,
  image,
  time,
  rating,
  category,
}: FeaturedRecipeProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="order-2 md:order-1 p-6 flex flex-col justify-center">
          <Badge variant="outline" className="w-fit mb-4">
            {category}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground mb-4">{description}</p>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <span>{time} min</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2 text-primary" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
          <Button asChild>
            <Link to={`/recipes/${id}`}>
              View Recipe
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="order-1 md:order-2 h-64 md:h-auto">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecipe;
