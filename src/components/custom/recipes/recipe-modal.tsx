import { useState } from 'react';
import { Clock, Star, Users, ChevronDown, ChevronUp, X, MoreVertical, Bookmark, Edit, History, Share2 } from 'lucide-react';
import imgRectangle1 from "@/assets/example-recipe.jpg";

type Unit = 'metric' | 'imperial';

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
  const [unit, setUnit] = useState<Unit>('imperial');
  const [servings, setServings] = useState(4);
  const [isSaved, setIsSaved] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  const adjustServings = (delta: number) => {
    setServings(prev => Math.max(1, prev + delta));
  };

  const toggleSave = () => {
    setIsSaved(prev => !prev);
  };

  const toggleOptions = () => {
    setShowOptions(prev => !prev);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Hero Image Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={imgRectangle1} 
          alt="Chicken Tikka Masala" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Top Action Buttons */}
        <div className="absolute top-0 right-0 p-4 flex items-center gap-2">
          <button 
            onClick={toggleSave}
            className={`w-10 h-10 flex items-center justify-center backdrop-blur-sm rounded-full transition-colors ${
              isSaved 
                ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                : 'bg-black/40 hover:bg-black/60 text-white'
            }`}
            aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
          <div className="relative">
            <button 
              onClick={toggleOptions}
              className={`w-10 h-10 flex items-center justify-center backdrop-blur-sm rounded-full transition-colors ${
                showOptions ? 'bg-amber-500 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
              }`}
              aria-label="Options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            
            {/* Options Dropdown */}
            {showOptions && (
              <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl overflow-hidden min-w-[200px] z-10">
                <button
                  onClick={() => {
                    setShowOptions(false);
                    // Handle edit recipe
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-50 text-gray-700 transition-colors"
                >
                  <Edit className="w-5 h-5 text-amber-600" />
                  <span>Edit Recipe</span>
                </button>
                <button
                  onClick={() => {
                    setShowOptions(false);
                    // Handle recipe history
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-50 text-gray-700 transition-colors"
                >
                  <History className="w-5 h-5 text-amber-600" />
                  <span>Recipe History</span>
                </button>
                <button
                  onClick={() => {
                    setShowOptions(false);
                    // Handle share recipe
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-50 text-gray-700 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-amber-600" />
                  <span>Share Recipe</span>
                </button>
              </div>
            )}
          </div>
          <button 
            className="w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-full text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Recipe Title & Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2">4.8</span>
          </div>
          <h1 className="mb-3 text-[36px] font-bold">Chicken Tikka Masala</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>45 mins</span>
            </div>
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>{servings} servings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <h2 className="text-amber-700 mb-2 font-bold">Description</h2>
          <p className="text-gray-700 leading-relaxed">
            A rich and creamy Indian curry featuring tender chicken pieces in a flavorful tomato-based sauce with aromatic spices. Perfect served over basmati rice with naan bread.
          </p>
        </div>

        {/* Ingredients Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-amber-700 font-bold">Ingredients</h2>
            <div className="flex items-center gap-3">
              {/* Unit Toggle */}
              <button
                onClick={toggleUnit}
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors"
              >
                <span className={unit === 'metric' ? 'font-semibold' : ''}>Metric</span>
                <div className="w-px h-4 bg-amber-400" />
                <span className={unit === 'imperial' ? 'font-semibold' : ''}>Imperial</span>
              </button>

              {/* Servings Adjuster */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => adjustServings(-1)}
                  className="w-8 h-8 flex items-center justify-center border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                  aria-label="Decrease servings"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="w-12 h-8 flex items-center justify-center bg-amber-600 text-white rounded-lg">
                  {servings}
                </div>
                <button
                  onClick={() => adjustServings(1)}
                  className="w-8 h-8 flex items-center justify-center border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                  aria-label="Increase servings"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Ingredients List */}
          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">
                  {unit === 'metric' ? ingredient.metric : ingredient.imperial}
                </span>
                <span className="text-gray-600"> {ingredient.name}</span>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}