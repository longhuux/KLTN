
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ImagePlus, Plus, Trash, Upload } from 'lucide-react';

// Form schema for recipe creation
const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  category: z.string().min(1, "Please select a category"),
  cookingTime: z.coerce.number().min(1, "Cooking time must be at least 1 minute"),
  ingredients: z.array(z.string()).min(1, "Add at least one ingredient"),
  instructions: z.array(z.string()).min(1, "Add at least one instruction step"),
  image: z.string().optional(),
  nutritionInfo: z.object({
    calories: z.coerce.number().min(0).optional(),
    protein: z.coerce.number().min(0).optional(),
    carbs: z.coerce.number().min(0).optional(),
    fat: z.coerce.number().min(0).optional(),
  }).optional(),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

interface CreateRecipeProps {
  onSuccess: () => void;
}

const foodCategories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Appetizer",
  "Salad",
  "Main Course",
  "Side Dish",
  "Dessert",
  "Snack",
  "Beverage",
  "Soup",
  "Baked Goods",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Keto",
  "Paleo",
  "Italian",
  "Mexican",
  "Asian",
  "Indian",
  "Mediterranean",
  "American",
];

const CreateRecipe = ({ onSuccess }: CreateRecipeProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      category: "",
      cookingTime: 30,
      ingredients: [""],
      instructions: [""],
      nutritionInfo: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    },
  });
  
  const { control, handleSubmit, watch, setValue } = form;
  
  const ingredients = watch("ingredients");
  const instructions = watch("instructions");
  
  const addIngredient = () => {
    setValue("ingredients", [...ingredients, ""]);
  };
  
  const removeIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setValue("ingredients", updatedIngredients);
  };
  
  const updateIngredient = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setValue("ingredients", updatedIngredients);
  };
  
  const addInstruction = () => {
    setValue("instructions", [...instructions, ""]);
  };
  
  const removeInstruction = (index: number) => {
    const updatedInstructions = [...instructions];
    updatedInstructions.splice(index, 1);
    setValue("instructions", updatedInstructions);
  };
  
  const updateInstruction = (index: number, value: string) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setValue("instructions", updatedInstructions);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server/storage service
      // For now, we'll just use a local preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setImagePreview(imageUrl);
        setValue("image", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (data: RecipeFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting recipe:", data);
      
      // In a real app, you would send this to your API
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSuccess();
    } catch (error) {
      console.error("Error creating recipe:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            {/* Recipe Details */}
            <div className="space-y-4">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipe Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="E.g., Homemade Pizza" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {foodCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={control}
                  name="cookingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cooking Time (minutes)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Ingredients */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">Ingredients</FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addIngredient}
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredients.length === 1}
                    className="h-10 w-10 text-muted-foreground hover:text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {form.formState.errors.ingredients && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.ingredients.message}
                </p>
              )}
            </div>
            
            {/* Instructions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">Instructions</FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addInstruction}
                  className="h-8"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Step
                </Button>
              </div>
              
              {instructions.map((instruction, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="bg-muted rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mt-3">
                      {index + 1}
                    </div>
                    <Textarea
                      value={instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      placeholder={`Step ${index + 1}: Describe what to do`}
                      className="flex-1 min-h-[80px]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeInstruction(index)}
                      disabled={instructions.length === 1}
                      className="h-10 w-10 text-muted-foreground hover:text-destructive mt-2"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {form.formState.errors.instructions && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.instructions.message}
                </p>
              )}
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Image Upload */}
            <div className="space-y-4">
              <FormLabel className="text-base">Recipe Image</FormLabel>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center">
                {imagePreview ? (
                  <div className="space-y-4 w-full">
                    <img 
                      src={imagePreview} 
                      alt="Recipe Preview" 
                      className="w-full h-48 object-cover rounded-md" 
                    />
                    <div className="flex justify-center">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setImagePreview(null);
                          setValue("image", undefined);
                        }}
                      >
                        Remove Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-base font-medium">Upload recipe image</h3>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to upload
                      </p>
                    </div>
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select Image
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Nutrition Information */}
            <div className="space-y-4">
              <FormLabel className="text-base">Nutrition Information (optional)</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="nutritionInfo.calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calories</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0}
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="nutritionInfo.protein"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Protein (g)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0}
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="nutritionInfo.carbs"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carbs (g)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0}
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="nutritionInfo.fat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fat (g)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={0}
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Recipe'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateRecipe;
