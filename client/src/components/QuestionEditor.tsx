import { useState } from "react";
import { QuestionCategory, questionCategoryLabels } from "@shared/schema";
import { questionsData, categoryColors, borderColors, categoryIcons } from "@/lib/questions";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuestionEditorProps {
  onSave: (updatedQuestions: Record<QuestionCategory, string[]>) => void;
  onCancel: () => void;
}

export function QuestionEditor({ onSave, onCancel }: QuestionEditorProps) {
  // Create a copy of the questions data to edit
  const [editedQuestions, setEditedQuestions] = useState<Record<QuestionCategory, string[]>>({...questionsData});
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory>(QuestionCategory.VULNERABILITY);
  const [newQuestion, setNewQuestion] = useState("");

  // Handle adding a new question
  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setEditedQuestions(prev => ({
        ...prev,
        [selectedCategory]: [...prev[selectedCategory], newQuestion.trim()]
      }));
      setNewQuestion("");
    }
  };

  // Handle removing a question
  const handleRemoveQuestion = (questionToRemove: string) => {
    setEditedQuestions(prev => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].filter(q => q !== questionToRemove)
    }));
  };

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as QuestionCategory);
  };

  // Save all changes
  const handleSaveAll = () => {
    onSave(editedQuestions);
  };

  // Get the icon component for the selected category
  const IconComponent = (LucideIcons as any)[categoryIcons[selectedCategory]];

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <span>Edit Questions</span>
          </CardTitle>
          <div className="flex items-center mt-2">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-2 ${categoryColors[selectedCategory]}`}>
              {IconComponent && <IconComponent className="w-3 h-3" />}
            </div>
            <Select 
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select category to edit" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(QuestionCategory).map(category => (
                  <SelectItem key={category} value={category}>
                    {questionCategoryLabels[category]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Questions for the selected category */}
          <div className="space-y-4 mb-6">
            <h3 className="font-medium">
              Current Questions for {questionCategoryLabels[selectedCategory]}
            </h3>
            
            <div className="space-y-2 max-h-60 overflow-y-auto p-2">
              {editedQuestions[selectedCategory].map((question, index) => (
                <div 
                  key={index} 
                  className="flex items-start justify-between p-2 rounded bg-gray-50"
                >
                  <p className="text-sm flex-1">{question}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 h-auto py-1"
                    onClick={() => handleRemoveQuestion(question)}
                  >
                    <LucideIcons.X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {editedQuestions[selectedCategory].length === 0 && (
                <p className="text-sm text-gray-500 italic">No questions in this category yet.</p>
              )}
            </div>
          </div>
          
          {/* Add new question */}
          <div className="space-y-3 mb-6">
            <h3 className="font-medium">Add New Question</h3>
            <Textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type a new question here..."
              className="min-h-[80px]"
            />
            <Button 
              onClick={handleAddQuestion}
              disabled={!newQuestion.trim()}
              className={`${buttonColors[selectedCategory]} ${hoverButtonColors[selectedCategory]}`}
            >
              Add Question
            </Button>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveAll}>
              Save All Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Button colors from questions.ts (these would typically be imported)
const buttonColors = {
  [QuestionCategory.VULNERABILITY]: "bg-red-300",
  [QuestionCategory.ATTRACTION]: "bg-pink-300",
  [QuestionCategory.IDENTITY]: "bg-purple-300",
  [QuestionCategory.CONFLICT]: "bg-orange-300",
  [QuestionCategory.FUTURE]: "bg-blue-300",
  [QuestionCategory.SHADOW]: "bg-slate-300",
  [QuestionCategory.SURPRISE]: "bg-emerald-300",
  [QuestionCategory.DEATH]: "bg-gray-300",
  [QuestionCategory.UNSPOKEN]: "bg-violet-300",
  [QuestionCategory.SYMBOLS]: "bg-amber-300",
  [QuestionCategory.HOME]: "bg-green-300",
  [QuestionCategory.CROSSROADS]: "bg-indigo-300"
};

const hoverButtonColors = {
  [QuestionCategory.VULNERABILITY]: "hover:bg-red-400",
  [QuestionCategory.ATTRACTION]: "hover:bg-pink-400",
  [QuestionCategory.IDENTITY]: "hover:bg-purple-400",
  [QuestionCategory.CONFLICT]: "hover:bg-orange-400",
  [QuestionCategory.FUTURE]: "hover:bg-blue-400",
  [QuestionCategory.SHADOW]: "hover:bg-slate-400",
  [QuestionCategory.SURPRISE]: "hover:bg-emerald-400",
  [QuestionCategory.DEATH]: "hover:bg-gray-400",
  [QuestionCategory.UNSPOKEN]: "hover:bg-violet-400",
  [QuestionCategory.SYMBOLS]: "hover:bg-amber-400",
  [QuestionCategory.HOME]: "hover:bg-green-400",
  [QuestionCategory.CROSSROADS]: "hover:bg-indigo-400"
};