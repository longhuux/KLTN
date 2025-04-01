
import React from 'react';
import RecipeCard from './RecipeCard';
import { cn } from '@/lib/utils';

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: number;
  rating: number;
  category: string;
  favorite?: boolean;
}

interface RecipeGridProps {
  recipes: Recipe[];
  className?: string;
}

const RecipeGrid = ({ recipes, className }: RecipeGridProps) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", className)}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          image={recipe.image}
          time={recipe.time}
          rating={recipe.rating}
          category={recipe.category}
          favorite={recipe.favorite}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;
