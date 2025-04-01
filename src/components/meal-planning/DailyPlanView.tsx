
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Save, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RecipeSearchDialog from './RecipeSearchDialog';
import NutritionSummary from './NutritionSummary';
import PlanRecipe from './PlanRecipe';

// Mock data - replace with real data from API/database
const MOCK_RECIPES = [
  {
    id: '1',
    title: 'Avocado Toast',
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    time: 10,
    nutrition: { calories: 350, protein: 10, carbs: 30, fat: 20 }
  },
  {
    id: '2',
    title: 'Chicken Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    time: 20,
    nutrition: { calories: 450, protein: 35, carbs: 15, fat: 25 }
  },
  {
    id: '3',
    title: 'Pasta Bolognese',
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFzdGF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    time: 35,
    nutrition: { calories: 650, protein: 25, carbs: 80, fat: 20 }
  }
];

const DailyPlanView = () => {
  const { toast } = useToast();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [recipes, setRecipes] = useState<typeof MOCK_RECIPES>([]);

  const addRecipeToMeal = (recipe: typeof MOCK_RECIPES[0]) => {
    setRecipes(prev => [...prev, recipe]);
    setSearchDialogOpen(false);
    toast({
      title: "Recipe Added",
      description: `Added ${recipe.title} to your daily plan`,
    });
  };

  const removeRecipe = (recipeId: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const savePlan = () => {
    // Here you would typically save to backend
    toast({
      title: "Plan Saved",
      description: "Your daily meal plan has been saved successfully.",
    });
  };

  const exportPlan = () => {
    // Here you would typically generate a PDF or similar
    toast({
      title: "Plan Exported",
      description: "Your daily meal plan has been exported.",
    });
  };

  const calculateTotalNutrition = () => {
    return recipes.reduce((total, recipe) => {
      return {
        calories: total.calories + recipe.nutrition.calories,
        protein: total.protein + recipe.nutrition.protein,
        carbs: total.carbs + recipe.nutrition.carbs,
        fat: total.fat + recipe.nutrition.fat
      };
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Today's Meals</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setSearchDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Recipe
            </Button>
            <Button 
              variant="default" 
              onClick={savePlan}
            >
              <Save className="h-4 w-4 mr-1" />
              Save Plan
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            {recipes.length > 0 ? (
              <div className="space-y-4">
                {recipes.map((recipe) => (
                  <PlanRecipe 
                    key={recipe.id}
                    recipe={recipe}
                    onRemove={() => removeRecipe(recipe.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="mb-4">No recipes added to your daily plan yet</p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Your First Recipe
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Daily Nutrition Summary</h3>
            <NutritionSummary nutrition={calculateTotalNutrition()} />
            
            {recipes.length > 0 && (
              <Button 
                className="w-full mt-6" 
                variant="outline"
                onClick={exportPlan}
              >
                <FileDown className="h-4 w-4 mr-1" />
                Export Meal Plan
              </Button>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Daily Calorie Goals</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Daily Goal:</span>
                <span className="font-medium">2,000 kcal</span>
              </div>
              <div className="flex justify-between">
                <span>Current Total:</span>
                <span className="font-medium">{calculateTotalNutrition().calories} kcal</span>
              </div>
              <div className="flex justify-between">
                <span>Remaining:</span>
                <span className="font-medium">{2000 - calculateTotalNutrition().calories} kcal</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <RecipeSearchDialog 
        open={searchDialogOpen} 
        onOpenChange={setSearchDialogOpen}
        onSelectRecipe={addRecipeToMeal}
        recipes={MOCK_RECIPES}
      />
    </div>
  );
};

export default DailyPlanView;
