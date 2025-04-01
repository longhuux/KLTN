
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted py-12 mt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-display text-xl font-bold">RecipeHive</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Share, discover, and cook amazing recipes from around the world.
            </p>
          </div>
          
          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-base mb-4">Discover</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/recipes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/meal-planner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Meal Planner
                  </Link>
                </li>
                <li>
                  <Link to="/suggestions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Ingredients Search
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-4">Community</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Your Profile
                  </Link>
                </li>
                <li>
                  <Link to="/favorites" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Saved Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/create" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Share Recipe
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-base mb-4">About</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RecipeHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
