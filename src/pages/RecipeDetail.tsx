
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { sampleRecipes } from '@/data/mockData';
import { 
  Clock, 
  Heart, 
  Share2, 
  Bookmark, 
  Star, 
  ChevronLeft, 
  Plus,
  Minus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import RecipeGrid from '@/components/RecipeGrid';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [servings, setServings] = useState(4);
  
  // Find the recipe with the matching ID
  const recipe = sampleRecipes.find(recipe => recipe.id === id);
  
  // Related recipes (just using other recipes for demo)
  const relatedRecipes = sampleRecipes
    .filter(r => r.id !== id)
    .filter(r => r.category === recipe?.category)
    .slice(0, 4);
  
  if (!recipe) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
            <p className="mb-4">Sorry, we couldn't find the recipe you're looking for.</p>
            <Button asChild>
              <Link to="/recipes">Browse Recipes</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-8">
        {/* Back Button and Actions */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to favorites</span>
            </Button>
            <Button variant="outline" size="icon">
              <Bookmark className="h-5 w-5" />
              <span className="sr-only">Save recipe</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share recipe</span>
            </Button>
          </div>
        </div>
        
        {/* Recipe Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="rounded-2xl overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-[400px] object-cover"
            />
          </div>
          
          <div className="flex flex-col">
            <div className="mb-4">
              <Badge variant="outline" className="mb-2">
                {recipe.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{recipe.title}</h1>
              <p className="text-muted-foreground mb-4">{recipe.description}</p>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <span>{recipe.time} min</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-primary" />
                <span>{recipe.rating.toFixed(1)}</span>
              </div>
            </div>
            
            {recipe.author && (
              <div className="flex items-center mb-6">
                <img 
                  src={recipe.author.avatar} 
                  alt={recipe.author.name} 
                  className="w-10 h-10 rounded-full mr-3" 
                />
                <div>
                  <p className="text-sm text-muted-foreground">Recipe by</p>
                  <p className="font-medium">{recipe.author.name}</p>
                </div>
              </div>
            )}
            
            {recipe.diet && recipe.diet.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Diet Preferences</p>
                <div className="flex flex-wrap gap-2">
                  {recipe.diet.map(diet => (
                    <Badge key={diet} variant="secondary">{diet}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {recipe.nutritionFacts && (
              <div className="grid grid-cols-4 gap-4 bg-muted p-4 rounded-lg mb-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Calories</p>
                  <p className="font-bold">{recipe.nutritionFacts.calories}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Protein</p>
                  <p className="font-bold">{recipe.nutritionFacts.protein}g</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Carbs</p>
                  <p className="font-bold">{recipe.nutritionFacts.carbs}g</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Fat</p>
                  <p className="font-bold">{recipe.nutritionFacts.fat}g</p>
                </div>
              </div>
            )}
            
            <div className="mt-auto flex gap-4">
              <Button>Add to Meal Plan</Button>
              <Button variant="outline">Print Recipe</Button>
            </div>
          </div>
        </div>
        
        {/* Recipe Content */}
        <Tabs defaultValue="ingredients" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="notes">Notes & Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ingredients">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Ingredients</h3>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setServings(Math.max(1, servings - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{servings} servings</span>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setServings(servings + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {recipe.ingredients && (
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center">
                        <div className="mr-3 h-5 w-5 rounded-full border flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary opacity-0 transition-opacity hover:opacity-100" />
                        </div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="instructions">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Instructions</h3>
                
                {recipe.instructions && (
                  <ol className="space-y-6">
                    {recipe.instructions.map((step, index) => (
                      <li key={index} className="flex">
                        <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                          {index + 1}
                        </div>
                        <div className="pt-1">{step}</div>
                      </li>
                    ))}
                  </ol>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notes">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-4">Notes & Tips</h3>
                <p>
                  For best results, use freshly grated Parmesan cheese instead of pre-packaged. 
                  You can substitute vegetable broth with chicken broth for a different flavor.
                  If you prefer a lighter version, you can use less butter and cheese.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Similar Recipes</h2>
              <Button variant="outline" asChild>
                <Link to="/recipes">
                  View All <ChevronLeft className="ml-2 h-4 w-4 rotate-180" />
                </Link>
              </Button>
            </div>
            
            <RecipeGrid recipes={relatedRecipes} />
          </section>
        )}
      </div>
    </Layout>
  );
};

export default RecipeDetail;
