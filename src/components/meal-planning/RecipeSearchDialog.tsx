
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface RecipeSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  recipes: Recipe[];
}

const RecipeSearchDialog = ({ 
  open, 
  onOpenChange, 
  onSelectRecipe,
  recipes 
}: RecipeSearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Recipe to Meal Plan</DialogTitle>
          <DialogDescription>
            Search for recipes to add to your meal plan.
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div 
                key={recipe.id}
                className="flex items-center gap-4 p-3 hover:bg-accent rounded-md cursor-pointer transition-colors"
                onClick={() => onSelectRecipe(recipe)}
              >
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{recipe.title}</h4>
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <span>{recipe.time} min</span>
                    <span>{recipe.nutrition.calories} kcal</span>
                  </div>
                </div>
                <Button size="sm" variant="ghost">Add</Button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No recipes found matching your search.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeSearchDialog;
