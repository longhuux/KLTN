
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  time: number;
  rating: number;
  category: string;
  diet?: string[];
  favorite?: boolean;
  ingredients?: string[];
  instructions?: string[];
  nutritionFacts?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  author?: {
    id: string;
    name: string;
    avatar: string;
  };
}

export const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Appetizer",
  "Soup",
  "Salad",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Keto",
  "Paleo",
  "Low-Carb",
  "High-Protein",
];

export const dietPreferences = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Paleo",
  "Low-Carb",
  "High-Protein",
  "Low-Fat",
  "Low-Sodium",
];

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    title: "Creamy Garlic Parmesan Risotto",
    description: "A rich and creamy Italian risotto with garlic, parmesan, and fresh herbs.",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2070&auto=format&fit=crop",
    time: 45,
    rating: 4.8,
    category: "Dinner",
    diet: ["Vegetarian"],
    ingredients: [
      "1 1/2 cups Arborio rice",
      "1 quart vegetable broth",
      "1/2 cup dry white wine",
      "1 small onion, finely chopped",
      "3 cloves garlic, minced",
      "1 cup grated Parmesan cheese",
      "2 tbsp butter",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "Fresh parsley for garnish"
    ],
    instructions: [
      "In a saucepan, warm the broth over low heat.",
      "In a large pot, heat oil over medium heat. Add onion and sauté until softened.",
      "Add garlic and rice, cook for 2 minutes until rice is slightly translucent.",
      "Add wine and cook until absorbed.",
      "Add 1/2 cup warm broth to rice, and stir until absorbed.",
      "Continue adding broth 1/2 cup at a time, allowing each addition to be absorbed before adding more.",
      "Cook until rice is tender and creamy, about 20-25 minutes.",
      "Remove from heat and stir in Parmesan cheese and butter.",
      "Season with salt and pepper. Garnish with parsley before serving."
    ],
    nutritionFacts: {
      calories: 320,
      protein: 10,
      carbs: 45,
      fat: 12
    },
    author: {
      id: "auth1",
      name: "Chef Maria",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    id: "2",
    title: "Honey Glazed Salmon",
    description: "Perfectly seared salmon with a sweet and savory honey glaze.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop",
    time: 25,
    rating: 4.7,
    category: "Dinner",
    diet: ["High-Protein", "Gluten-Free"],
    favorite: true
  },
  {
    id: "3",
    title: "Avocado Toast with Poached Eggs",
    description: "The ultimate breakfast: creamy avocado on toast topped with perfectly poached eggs.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1780&auto=format&fit=crop",
    time: 15,
    rating: 4.5,
    category: "Breakfast",
    diet: ["Vegetarian"]
  },
  {
    id: "4",
    title: "Triple Chocolate Brownies",
    description: "Decadent triple chocolate brownies that are fudgy on the inside with a crackly top.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1887&auto=format&fit=crop",
    time: 40,
    rating: 4.9,
    category: "Dessert",
  },
  {
    id: "5",
    title: "Mediterranean Chickpea Salad",
    description: "A refreshing salad with chickpeas, cucumber, tomatoes, and feta cheese.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    time: 15,
    rating: 4.3,
    category: "Salad",
    diet: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "6",
    title: "Classic Beef Burger",
    description: "Juicy homemade beef burger with all the classic toppings.",
    image: "https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?q=80&w=1964&auto=format&fit=crop",
    time: 30,
    rating: 4.6,
    category: "Lunch"
  },
  {
    id: "7",
    title: "Vegetable Stir Fry",
    description: "Quick and colorful vegetable stir fry with a savory sauce.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=2072&auto=format&fit=crop",
    time: 20,
    rating: 4.2,
    category: "Dinner",
    diet: ["Vegetarian", "Vegan"]
  },
  {
    id: "8",
    title: "Blueberry Pancakes",
    description: "Fluffy pancakes loaded with fresh blueberries.",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=2070&auto=format&fit=crop",
    time: 25,
    rating: 4.4,
    category: "Breakfast"
  },
  {
    id: "9",
    title: "Caprese Salad",
    description: "Simple Italian salad with fresh tomatoes, mozzarella, and basil.",
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=1887&auto=format&fit=crop",
    time: 10,
    rating: 4.1,
    category: "Salad",
    diet: ["Vegetarian", "Gluten-Free"]
  },
  {
    id: "10",
    title: "Mushroom Risotto",
    description: "Creamy risotto with wild mushrooms and parmesan.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=2069&auto=format&fit=crop",
    time: 50,
    rating: 4.7,
    category: "Dinner",
    diet: ["Vegetarian"],
    favorite: true
  }
];

export const featuredRecipe = sampleRecipes[0];

export const trendingRecipes = sampleRecipes.slice(1, 5);

export const newRecipes = sampleRecipes.slice(5, 9);
