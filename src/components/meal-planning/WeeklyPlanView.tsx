
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Calendar as CalendarIcon, Utensils, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
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
  }
];

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const WeeklyPlanView = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [mealPlans, setMealPlans] = useState<{
    [date: string]: {
      [mealType: string]: typeof MOCK_RECIPES[0][];
    };
  }>({});
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [currentMealType, setCurrentMealType] = useState('');

  const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
  
  const addRecipeToMeal = (recipe: typeof MOCK_RECIPES[0]) => {
    setMealPlans(prev => {
      const newPlans = {...prev};
      if (!newPlans[formattedDate]) {
        newPlans[formattedDate] = {};
      }
      if (!newPlans[formattedDate][currentMealType]) {
        newPlans[formattedDate][currentMealType] = [];
      }
      newPlans[formattedDate][currentMealType] = [
        ...newPlans[formattedDate][currentMealType],
        recipe
      ];
      return newPlans;
    });
    setSearchDialogOpen(false);
    toast({
      title: "Recipe Added",
      description: `Added ${recipe.title} to ${currentMealType}`,
    });
  };

  const removeRecipeFromMeal = (mealType: string, recipeId: string) => {
    setMealPlans(prev => {
      const newPlans = {...prev};
      if (newPlans[formattedDate] && newPlans[formattedDate][mealType]) {
        newPlans[formattedDate][mealType] = newPlans[formattedDate][mealType].filter(
          recipe => recipe.id !== recipeId
        );
      }
      return newPlans;
    });
  };

  const savePlan = () => {
    // Here you would typically save to backend
    toast({
      title: "Plan Saved",
      description: "Your meal plan has been saved successfully.",
    });
  };

  const calculateDailyNutrition = () => {
    if (!formattedDate || !mealPlans[formattedDate]) return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
    let totalNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    
    Object.values(mealPlans[formattedDate]).forEach(mealTypeRecipes => {
      mealTypeRecipes.forEach(recipe => {
        totalNutrition.calories += recipe.nutrition.calories;
        totalNutrition.protein += recipe.nutrition.protein;
        totalNutrition.carbs += recipe.nutrition.carbs;
        totalNutrition.fat += recipe.nutrition.fat;
      });
    });
    
    return totalNutrition;
  };

  const openAddRecipeDialog = (mealType: string) => {
    setCurrentMealType(mealType);
    setSearchDialogOpen(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <CalendarIcon className="mr-2 h-5 w-5" />
              <h3 className="text-lg font-medium">Select Date</h3>
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <Button 
              className="w-full mt-4" 
              onClick={savePlan}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Meal Plan
            </Button>
          </CardContent>
        </Card>

        {date && (
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Utensils className="mr-2 h-5 w-5" />
                <h3 className="text-lg font-medium">Daily Nutrition</h3>
              </div>
              <NutritionSummary nutrition={calculateDailyNutrition()} />
            </CardContent>
          </Card>
        )}
      </div>

      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold mb-4">
          {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Select a date'}
        </h2>
        
        {MEAL_TYPES.map((mealType) => (
          <Card key={mealType} className="mb-4">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{mealType}</h3>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => openAddRecipeDialog(mealType)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Recipe
                </Button>
              </div>
              
              <div className="space-y-4">
                {mealPlans[formattedDate]?.[mealType]?.map((recipe) => (
                  <PlanRecipe 
                    key={recipe.id}
                    recipe={recipe}
                    onRemove={() => removeRecipeFromMeal(mealType, recipe.id)}
                  />
                ))}
                
                {(!mealPlans[formattedDate]?.[mealType] || mealPlans[formattedDate]?.[mealType].length === 0) && (
                  <div className="text-center py-6 text-muted-foreground">
                    No recipes added to {mealType.toLowerCase()} yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
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

export default WeeklyPlanView;
