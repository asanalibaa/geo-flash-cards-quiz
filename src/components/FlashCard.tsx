
import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';

interface FlashCardProps {
  question: string;
  answer: string;
}

const FlashCard: React.FC<FlashCardProps> = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleHint = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHint(!showHint);
  };

  return (
    <div 
      className={`flip-card w-full max-w-xl h-80 sm:h-96 ${isFlipped ? 'flipped' : ''}`} 
      onClick={handleFlip}
    >
      <div className="flip-card-inner relative w-full h-full">
        {/* Front of the card */}
        <div className="flip-card-front absolute w-full h-full rounded-xl p-8 sm:p-10 shadow-lg bg-white border flex flex-col">
          <div className="hint-button absolute top-4 left-4 flex items-center gap-1 text-xs text-gray-500 hover:text-primary cursor-pointer" onClick={toggleHint}>
            <Lightbulb size={16} />
            <span>Get a hint</span>
          </div>
          
          <div className="flex items-center justify-center flex-1">
            <h2 className="text-xl sm:text-2xl font-medium text-center">{question}</h2>
          </div>
          
          {showHint && !isFlipped && (
            <div className="absolute bottom-4 left-0 right-0 mx-auto text-center text-sm text-primary">
              Подсказка: нажмите на карточку, чтобы увидеть ответ
            </div>
          )}
        </div>
        
        {/* Back of the card */}
        <div className="flip-card-back absolute w-full h-full rounded-xl p-8 sm:p-10 shadow-lg bg-secondary border flex flex-col">
          <div className="flex items-center justify-center flex-1">
            <p className="text-xl sm:text-2xl font-medium text-center">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
