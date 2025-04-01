
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import FeaturedRecipe from '@/components/FeaturedRecipe';
import RecipeGrid from '@/components/RecipeGrid';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  featuredRecipe, 
  trendingRecipes, 
  newRecipes, 
  categories 
} from '@/data/mockData';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredTrending = selectedCategory 
    ? trendingRecipes.filter(recipe => recipe.category === selectedCategory) 
    : trendingRecipes;
    
  const filteredNew = selectedCategory 
    ? newRecipes.filter(recipe => recipe.category === selectedCategory) 
    : newRecipes;
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="container py-8 md:py-12 animate-fade-in">
        <div className="grid grid-cols-1 gap-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Delicious Recipes
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find and share the best recipes from around the world.
            </p>
          </div>
          
          <div className="max-w-xl mx-auto w-full mb-8">
            <SearchBar />
          </div>
          
          <FeaturedRecipe 
            id={featuredRecipe.id}
            title={featuredRecipe.title}
            description={featuredRecipe.description}
            image={featuredRecipe.image}
            time={featuredRecipe.time}
            rating={featuredRecipe.rating}
            category={featuredRecipe.category}
          />
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="container py-8 md:py-12 animate-fade-up" style={{animationDelay: "0.2s"}}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Popular Categories</h2>
            <p className="text-muted-foreground">Filter recipes by your favorite categories</p>
          </div>
        </div>
        
        <CategoryFilter 
          categories={categories.slice(0, 10)} 
          onSelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </section>
      
      {/* Trending Recipes Section */}
      <section className="container py-8 md:py-12 animate-fade-up" style={{animationDelay: "0.4s"}}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Trending Now</h2>
            <p className="text-muted-foreground">Our most popular recipes this week</p>
          </div>
          <Button variant="outline" asChild className="mt-4 md:mt-0">
            <Link to="/recipes">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <RecipeGrid recipes={filteredTrending} />
      </section>
      
      {/* New Recipes Section */}
      <section className="container py-8 md:py-12 animate-fade-up" style={{animationDelay: "0.6s"}}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Recently Added</h2>
            <p className="text-muted-foreground">Fresh recipes from our community</p>
          </div>
          <Button variant="outline" asChild className="mt-4 md:mt-0">
            <Link to="/recipes">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <RecipeGrid recipes={filteredNew} />
      </section>
      
      {/* Call to Action */}
      <section className="container py-12 md:py-16 animate-fade-up" style={{animationDelay: "0.8s"}}>
        <div className="bg-accent rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to share your culinary creations?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join our community of food enthusiasts and share your favorite recipes with the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/login">
                Sign Up Now
              </Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/recipes">
                Explore Recipes
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
