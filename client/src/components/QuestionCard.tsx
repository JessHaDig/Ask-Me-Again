import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuestionCategory, questionCategoryLabels } from "@shared/schema";
import { questionsData, categoryColors, categoryIcons } from "@/lib/questions";
import { wildcardPrompts } from "@/lib/wildcardPrompts";
import * as LucideIcons from "lucide-react";
import { ChevronLeft, RefreshCw, Sparkles } from "lucide-react";

interface QuestionCardProps {
  category: QuestionCategory;
  onBackToCategories: () => void;
}

export function QuestionCard({ category, onBackToCategories }: QuestionCardProps) {
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isWildcardActive, setIsWildcardActive] = useState(false);
  const [shownWildcards, setShownWildcards] = useState<number[]>([]);
  
  // Track shown questions to avoid repeats
  const shownQuestionsRef = useRef<Record<QuestionCategory, string[]>>({} as Record<QuestionCategory, string[]>);

  // Get random question that hasn't been shown yet
  const getRandomQuestion = (category: QuestionCategory): string => {
    const questions = questionsData[category];
    const shownQuestions = shownQuestionsRef.current[category] || [];
    
    // If all questions have been shown, reset tracking
    if (shownQuestions.length >= questions.length) {
      shownQuestionsRef.current[category] = [];
    }
    
    // Filter out previously shown questions
    const availableQuestions = questions.filter(
      q => !shownQuestionsRef.current[category]?.includes(q)
    );
    
    // Get random question from available questions
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const newQuestion = availableQuestions[randomIndex];
    
    // Add to shown questions
    if (!shownQuestionsRef.current[category]) {
      shownQuestionsRef.current[category] = [];
    }
    shownQuestionsRef.current[category].push(newQuestion);
    
    return newQuestion;
  };

  // Get a random wildcard prompt
  const getRandomWildcard = (): string => {
    let availableIndices = [...Array(wildcardPrompts.length).keys()].filter(
      index => !shownWildcards.includes(index)
    );
    
    // If all wildcards have been shown, reset
    if (availableIndices.length === 0) {
      setShownWildcards([]);
      availableIndices = [...Array(wildcardPrompts.length).keys()];
    }
    
    // Get random wildcard index
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const selectedIndex = availableIndices[randomIndex];
    
    // Add to shown wildcards
    setShownWildcards(prev => [...prev, selectedIndex]);
    
    return wildcardPrompts[selectedIndex];
  };

  // Display a new question with animation
  const displayNewQuestion = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsWildcardActive(false); // Reset wildcard state
    
    // Animate out
    setTimeout(() => {
      // If it's the surprise category, pick a random category
      const actualCategory = category === QuestionCategory.SURPRISE 
        ? Object.values(QuestionCategory).filter(c => c !== QuestionCategory.SURPRISE)[
            Math.floor(Math.random() * (Object.values(QuestionCategory).length - 1))
          ]
        : category;
        
      const newQuestion = getRandomQuestion(actualCategory);
      setCurrentQuestion(newQuestion);
      
      // Animate in
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  };
  
  // Display a wildcard prompt
  const displayWildcard = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsWildcardActive(true);
    
    // Animate out
    setTimeout(() => {
      const wildcard = getRandomWildcard();
      setCurrentQuestion(wildcard);
      
      // Animate in
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, 300);
  };

  // Initialize with a random question
  useEffect(() => {
    // Initialize all categories first
    const categories = Object.values(QuestionCategory);
    categories.forEach(cat => {
      if (!shownQuestionsRef.current[cat]) {
        shownQuestionsRef.current[cat] = [];
      }
    });
    
    // Then generate the initial question
    const initialCategory = category === QuestionCategory.SURPRISE 
      ? Object.values(QuestionCategory).filter(c => c !== QuestionCategory.SURPRISE)[
          Math.floor(Math.random() * (Object.values(QuestionCategory).length - 1))
        ]
      : category;
      
    const initialQuestion = getRandomQuestion(initialCategory);
    setCurrentQuestion(initialQuestion);
  }, [category]);

  // Get the icon component
  const IconComponent = (LucideIcons as any)[categoryIcons[category]];

  return (
    <Card className="shadow-md animate-fade-in w-full max-w-2xl mx-auto border border-secondary/30">
      <CardContent className="p-8">
        {/* Category indicator */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${isWildcardActive ? 'bg-primary/20' : categoryColors[category]}`}>
              {isWildcardActive ? (
                <Sparkles className="w-5 h-5 text-primary" />
              ) : (
                IconComponent && <IconComponent className="w-5 h-5" />
              )}
            </div>
            <span className="text-lg font-medium brand-font">
              {isWildcardActive ? "Wildcard" : questionCategoryLabels[category]}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-sm font-normal hover:bg-secondary/20"
            onClick={onBackToCategories}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to themes
          </Button>
        </div>
        
        {/* Question Display */}
        <div className="py-8 px-4">
          <p className={`text-2xl sm:text-3xl font-medium text-center transition-opacity duration-300 brand-font ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {currentQuestion}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="px-8 py-6 text-base font-normal hover:bg-primary/90 transition-all"
            onClick={displayNewQuestion}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Ask Me Again
          </Button>
          
          <Button 
            variant="outline"
            className="px-8 py-6 text-base font-normal border-secondary/40 hover:bg-secondary/20 transition-all flex items-center"
            onClick={displayWildcard}
          >
            <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
            Wildcard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
