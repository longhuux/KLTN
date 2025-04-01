
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, X } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchBar from '@/components/SearchBar';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [showSearch, setShowSearch] = React.useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-6 mt-8">
                  <Link to="/" className="font-display text-lg font-semibold hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link to="/recipes" className="font-display text-lg font-semibold hover:text-primary transition-colors">
                    Recipes
                  </Link>
                  <Link to="/meal-planner" className="font-display text-lg font-semibold hover:text-primary transition-colors">
                    Meal Planner
                  </Link>
                  <Link to="/suggestions" className="font-display text-lg font-semibold hover:text-primary transition-colors">
                    Discover
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          )}
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-bold">RecipeHive</span>
          </Link>
          
          {/* Desktop Nav */}
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/recipes" className="text-sm font-medium hover:text-primary transition-colors">
                Recipes
              </Link>
              <Link to="/meal-planner" className="text-sm font-medium hover:text-primary transition-colors">
                Meal Planner
              </Link>
              <Link to="/suggestions" className="text-sm font-medium hover:text-primary transition-colors">
                Discover
              </Link>
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {!isMobile && !showSearch && (
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          
          {showSearch && !isMobile && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
              <div className="w-full max-w-2xl px-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Search Recipes</h2>
                  <Button variant="ghost" size="icon" onClick={toggleSearch}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close search</span>
                  </Button>
                </div>
                <SearchBar />
              </div>
            </div>
          )}
          
          {isMobile && (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
          )}
          
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
