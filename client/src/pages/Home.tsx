import { useState } from "react";
import { QuestionCard } from "@/components/QuestionCard";
import { CategorySelection } from "@/components/CategorySelection";
import { QuestionEditor } from "@/components/QuestionEditor";
import { Logo, CompactLogo } from "@/components/Logo";
import { QuestionCategory } from "@shared/schema";
import { questionsData } from "@/lib/questions";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

type AppView = "categories" | "question" | "editor";

export default function Home() {
  const [view, setView] = useState<AppView>("categories");
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
  const [customQuestions, setCustomQuestions] = useState(questionsData);
  
  // Handle category selection
  const handleCategorySelect = (category: QuestionCategory) => {
    setSelectedCategory(category);
    setView("question");
  };
  
  // Return to category selection
  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setView("categories");
  };
  
  // Open question editor
  const handleOpenEditor = () => {
    setView("editor");
  };
  
  // Save questions from editor
  const handleSaveQuestions = (updatedQuestions: Record<QuestionCategory, string[]>) => {
    setCustomQuestions(updatedQuestions);
    setView("categories");
  };
  
  // Cancel question editing
  const handleCancelEdit = () => {
    setView("categories");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div 
            className="cursor-pointer" 
            onClick={handleBackToCategories}
          >
            {view === "categories" ? (
              <Logo className="hidden sm:block" />
            ) : (
              <CompactLogo />
            )}
          </div>
          
          {view === "categories" && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleOpenEditor}
              className="text-primary hover:text-primary/80"
            >
              <Settings className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Edit Questions</span>
            </Button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        {view === "categories" && (
          <div className="w-full">
            <div className="block sm:hidden mb-10">
              <Logo />
            </div>
            <CategorySelection onSelectCategory={handleCategorySelect} />
          </div>
        )}
        
        {view === "question" && selectedCategory && (
          <QuestionCard 
            category={selectedCategory}
            onBackToCategories={handleBackToCategories}
          />
        )}
        
        {view === "editor" && (
          <QuestionEditor 
            onSave={handleSaveQuestions}
            onCancel={handleCancelEdit}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center tagline">
            Because some answers change.
          </p>
        </div>
      </footer>
    </div>
  );
}
