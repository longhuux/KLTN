
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, X } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface PlanRecipeProps {
  recipe: Recipe;
  onRemove: () => void;
}

const PlanRecipe = ({ recipe, onRemove }: PlanRecipeProps) => {
  return (
    <div className="flex items-center gap-4 p-3 border rounded-md">
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="w-20 h-20 object-cover rounded-md"
      />
      
      <div className="flex-1">
        <h4 className="font-medium">{recipe.title}</h4>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span>{recipe.time} min</span>
        </div>
        
        <div className="flex gap-3 mt-1 text-sm">
          <span>{recipe.nutrition.calories} kcal</span>
          <span>•</span>
          <span>Protein: {recipe.nutrition.protein}g</span>
          <span>•</span>
          <span>Carbs: {recipe.nutrition.carbs}g</span>
          <span>•</span>
          <span>Fat: {recipe.nutrition.fat}g</span>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  );
};

export default PlanRecipe;
