
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/layout/Layout';
import MyRecipes from '@/components/recipe-management/MyRecipes';
import CreateRecipe from '@/components/recipe-management/CreateRecipe';

const RecipeManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("my-recipes");

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Recipe Management</h1>
        
        <Tabs defaultValue="my-recipes" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="my-recipes">My Recipes</TabsTrigger>
            <TabsTrigger value="create">Create New Recipe</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-recipes" className="mt-6">
            <MyRecipes />
          </TabsContent>
          
          <TabsContent value="create" className="mt-6">
            <CreateRecipe onSuccess={() => {
              toast({
                title: "Recipe Created",
                description: "Your recipe has been successfully created!",
              });
              setActiveTab("my-recipes");
            }} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RecipeManagement;
