import { useState } from "react";
import { QuestionCategory, questionCategoryLabels } from "@shared/schema";
import { categoryColors, borderColors, categoryIcons } from "@/lib/questions";
import * as LucideIcons from "lucide-react";

interface CategorySelectionProps {
  onSelectCategory: (category: QuestionCategory) => void;
}

export function CategorySelection({ onSelectCategory }: CategorySelectionProps) {
  // Get all category values from the enum
  const categories = Object.values(QuestionCategory);
  
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <h2 className="brand-font text-2xl md:text-3xl font-medium text-center mb-8">
        Choose a conversation theme
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {categories.map((category) => {
          // Dynamically get the icon component based on the name
          const IconComponent = (LucideIcons as any)[categoryIcons[category]];
          
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`
                bg-white
                ${borderColors[category]} 
                border
                shadow-sm
                rounded-lg 
                p-5
                flex 
                flex-col 
                items-center 
                justify-center 
                text-center 
                h-36
                transition-all
                hover:scale-102
                hover:shadow-md
                focus:outline-none
                focus:ring-2
                focus:ring-primary/40
                group
              `}
            >
              <div className={`
                ${categoryColors[category]} 
                rounded-full 
                p-3 
                mb-3
                transition-all
                group-hover:scale-110
              `}>
                {IconComponent && <IconComponent className="w-7 h-7" />}
              </div>
              <span className="font-medium text-sm">{questionCategoryLabels[category]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}