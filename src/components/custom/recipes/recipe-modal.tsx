import { useState } from 'react';
import { 
  Clock, 
  Users, 
  MoreVertical, 
  Bookmark, 
  Edit, 
  History, 
  Share2, 
  Minus, 
  Plus, 
  Star
} from 'lucide-react';
import imgRectangle1 from "@/assets/example-recipe.jpg";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area"; 

interface Ingredient {
  name: string;
  metric: string;
  imperial: string;
}

const ingredients: Ingredient[] = [
  { name: 'Chicken breast, diced', metric: '500g', imperial: '1.1 lb' },
  { name: 'Heavy cream', metric: '240ml', imperial: '1 cup' },
  { name: 'Tomato puree', metric: '400g', imperial: '14 oz' },
  { name: 'Onion, chopped', metric: '1 large', imperial: '1 large' },
  { name: 'Garlic, minced', metric: '4 cloves', imperial: '4 cloves' },
  { name: 'Ginger paste', metric: '15ml', imperial: '1 tbsp' },
  { name: 'Garam masala', metric: '15ml', imperial: '1 tbsp' },
  { name: 'Vegetable oil', metric: '30ml', imperial: '2 tbsp' },
];

export default function RecipeModal() {
  const [servings, setServings] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  const adjustServings = (delta: number) => {
    setServings(prev => Math.max(1, prev + delta));
  };

  const toggleSave = () => setIsSaved(prev => !prev);

  return (
    /* THEME CHANGES:
      1. bg-card / text-card-foreground: Adapts background to White (light) or Black (dark).
      2. border-border: Uses the theme's standard border color.
    */
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-border bg-card text-card-foreground h-[90vh] flex flex-col overflow-hidden p-0 rounded-sm">
      
      <ScrollArea className="h-full w-full">
        
        {/* IMAGE SECTION: 
            This stays dark intentionally because it's an overlay on a photo.
            We keep text-white here regardless of the theme.
        */}
        <div className="relative h-80 md:h-[450px] w-full bg-muted">
          <img 
            src={imgRectangle1} 
            alt="Chicken Tikka Masala" 
            className="w-full h-full object-cover"
          />
          {/* Gradient stays dark to ensure text readability over image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          {/* Actions */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleSave}
              className={`rounded-full backdrop-blur-md transition-all border-0 ${
                isSaved 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                  : 'bg-black/30 hover:bg-black/50 text-white'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md border-0"
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" /> Edit Recipe
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <History className="mr-2 h-4 w-4" /> History
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Title Overlay (Stays White) */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <Badge 
              variant="secondary" 
              className="mb-3 bg-amber-500 text-white hover:bg-amber-600 border-none px-3 py-1"
            >
              <Star className="w-3.5 h-3.5 fill-current mr-1.5" />
              4.8
            </Badge>
            
            <h1 className="mb-3 text-3xl md:text-5xl font-bold tracking-tight">Chicken Tikka Masala</h1>
            
            <div className="flex items-center gap-6 text-sm font-medium text-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>45 mins</span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-gray-500" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{servings} servings</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION: 
            Now uses semantic colors (foreground, muted-foreground, etc)
            to flip automatically between black/white text.
        */}
        <div className="p-8 space-y-8 bg-card">
          
          {/* Description */}
          <div className="space-y-3">
            {/* Uses Amber-600 for light mode visibility, Amber-500 for dark mode pop */}
            <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-500">Description</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              A rich and creamy Indian curry featuring tender chicken pieces in a flavorful tomato-based sauce with aromatic spices. Perfect served over basmati rice with naan bread.
            </p>
          </div>

          <Separator />

          {/* Ingredients Section */}
          <Tabs defaultValue="imperial" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-500">Ingredients</h2>
              
              <div className="flex items-center gap-4">
                <TabsList>
                  <TabsTrigger value="metric">Metric</TabsTrigger>
                  <TabsTrigger value="imperial">Imperial</TabsTrigger>
                </TabsList>

                {/* Servings Adjuster */}
                <div className="flex items-center gap-1 bg-muted rounded-md p-1 border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => adjustServings(-1)}
                    disabled={servings <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium tabular-nums text-foreground">
                    {servings}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => adjustServings(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-4">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="contents">
                  {/* Reusable Ingredient Item Component */}
                  {['imperial', 'metric'].map((type) => (
                    <TabsContent key={type} value={type} className="mt-0">
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors">
                        <span className="text-foreground font-medium">{ingredient.name}</span>
                        <span className="text-amber-600 dark:text-amber-500 font-mono bg-amber-100 dark:bg-amber-500/10 px-2 py-1 rounded text-sm">
                          {type === 'metric' ? ingredient.metric : ingredient.imperial}
                        </span>
                      </div>
                    </TabsContent>
                  ))}
                </div>
              ))}
            </div>
          </Tabs>
        </div>
      </ScrollArea>
    </Card>
  );
}