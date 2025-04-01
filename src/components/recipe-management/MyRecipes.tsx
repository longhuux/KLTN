
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Clock, Edit, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// For now using mock data, would be replaced with API call
const mockRecipes = [
  {
    id: '1',
    title: 'Homemade Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    time: 45,
    category: 'Italian',
    createdAt: '2023-05-15T08:00:00.000Z',
  },
  {
    id: '2',
    title: 'Vegetable Stir Fry',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    time: 20,
    category: 'Asian',
    createdAt: '2023-06-22T08:00:00.000Z',
  },
  {
    id: '3',
    title: 'Chocolate Cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    time: 60,
    category: 'Dessert',
    createdAt: '2023-07-10T08:00:00.000Z',
  },
];

const MyRecipes = () => {
  const { toast } = useToast();
  const [recipes, setRecipes] = useState(mockRecipes);
  const [recipeToEdit, setRecipeToEdit] = useState<string | null>(null);
  
  const handleDelete = (id: string) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
    toast({
      title: "Recipe Deleted",
      description: "Your recipe has been successfully deleted.",
    });
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (recipes.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">You haven't created any recipes yet</h3>
        <p className="text-muted-foreground mb-6">Create your first recipe to see it here</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Card key={recipe.id} className="overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
            <Badge 
              variant="secondary" 
              className="absolute bottom-2 left-2 bg-background/70 backdrop-blur-sm"
            >
              {recipe.category}
            </Badge>
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="line-clamp-1">{recipe.title}</CardTitle>
            <CardDescription>
              Created on {formatDate(recipe.createdAt)}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" /> 
              <span>{recipe.time} min</span>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setRecipeToEdit(recipe.id)}
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 text-destructive"
                >
                  <Trash className="h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    recipe and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => handleDelete(recipe.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MyRecipes;
