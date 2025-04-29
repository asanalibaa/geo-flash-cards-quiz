
import React, { useState, useEffect } from 'react';
import { Lightbulb, Pyramid, Globe, Mountain, Map, Compass } from 'lucide-react';

interface FlashCardProps {
  question: string;
  answer: string;
  resetFlip?: boolean;
}

const FlashCard: React.FC<FlashCardProps> = ({ question, answer, resetFlip = false }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Reset the card to question side when resetFlip prop changes
  useEffect(() => {
    if (resetFlip) {
      setIsFlipped(false);
      setShowHint(false); // Also reset the hint state when navigating
    }
  }, [resetFlip]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleHint = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHint(!showHint);
  };

  return (
    <div 
      className={`flip-card w-full max-w-2xl h-96 sm:h-[450px] ${isFlipped ? 'flipped' : ''}`} 
      onClick={handleFlip}
    >
      <div className="flip-card-inner relative w-full h-full">
        {/* Front of the card */}
        <div className="flip-card-front absolute w-full h-full rounded-xl p-8 sm:p-12 shadow-lg bg-white border flex flex-col">
          <div className="hint-button absolute top-4 left-4 flex items-center gap-1 text-xs text-gray-500 hover:text-primary cursor-pointer" onClick={toggleHint}>
            <Lightbulb size={16} />
            <span>Get a hint</span>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4">
            <Pyramid size={24} className="text-primary opacity-60" />
          </div>

          <div className="absolute bottom-4 left-4">
            <Globe size={20} className="text-primary opacity-40" />
          </div>
          
          <div className="absolute bottom-4 right-4">
            <Mountain size={20} className="text-primary opacity-40" />
          </div>

          <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
            <Compass size={16} className="text-primary opacity-30" />
          </div>

          <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
            <Map size={16} className="text-primary opacity-30" />
          </div>
          
          <div className="flex items-center justify-center flex-1">
            <h2 className="text-2xl sm:text-3xl font-medium text-center">{question}</h2>
          </div>
          
          {showHint && !isFlipped && (
            <div className="absolute bottom-4 left-0 right-0 mx-auto text-center text-sm text-primary">
              Подсказка: нажмите на карточку, чтобы увидеть ответ
            </div>
          )}
        </div>
        
        {/* Back of the card */}
        <div className="flip-card-back absolute w-full h-full rounded-xl p-8 sm:p-12 shadow-lg bg-secondary border flex flex-col">
          <div className="absolute top-4 right-4">
            <Pyramid size={24} className="text-primary opacity-60" />
          </div>

          <div className="absolute bottom-4 left-4">
            <Globe size={20} className="text-primary opacity-40" />
          </div>
          
          <div className="absolute bottom-4 right-4">
            <Mountain size={20} className="text-primary opacity-40" />
          </div>
          
          <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
            <Compass size={16} className="text-primary opacity-30" />
          </div>

          <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
            <Map size={16} className="text-primary opacity-30" />
          </div>
          
          <div className="flex items-center justify-center flex-1">
            <p className="text-2xl sm:text-3xl font-medium text-center">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
