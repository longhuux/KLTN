
import { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  onSelect: (category: string | null) => void;
  selectedCategory: string | null;
}

const CategoryFilter = ({ 
  categories, 
  onSelect, 
  selectedCategory 
}: CategoryFilterProps) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex space-x-2 p-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          size="sm"
          className="rounded-full text-xs"
          onClick={() => onSelect(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className="rounded-full text-xs"
            onClick={() => onSelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CategoryFilter;
