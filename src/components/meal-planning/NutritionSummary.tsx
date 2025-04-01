
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface NutritionProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionSummaryProps {
  nutrition: NutritionProps;
}

const NutritionSummary = ({ nutrition }: NutritionSummaryProps) => {
  // Calculate percentages based on recommended daily values
  // These are simplified targets and should be customized based on user needs
  const proteinTarget = 50; // grams
  const carbsTarget = 275; // grams
  const fatTarget = 78; // grams

  const proteinPercentage = Math.min(100, (nutrition.protein / proteinTarget) * 100);
  const carbsPercentage = Math.min(100, (nutrition.carbs / carbsTarget) * 100);
  const fatPercentage = Math.min(100, (nutrition.fat / fatTarget) * 100);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-lg">
        <span className="font-medium">Total Calories:</span>
        <span>{nutrition.calories} kcal</span>
      </div>
      
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Protein</span>
            <span>{nutrition.protein}g / {proteinTarget}g</span>
          </div>
          <Progress value={proteinPercentage} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Carbs</span>
            <span>{nutrition.carbs}g / {carbsTarget}g</span>
          </div>
          <Progress value={carbsPercentage} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Fat</span>
            <span>{nutrition.fat}g / {fatTarget}g</span>
          </div>
          <Progress value={fatPercentage} className="h-2" />
        </div>
      </div>
    </div>
  );
};

export default NutritionSummary;
