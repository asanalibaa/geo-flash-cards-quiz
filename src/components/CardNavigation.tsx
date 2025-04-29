
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Shuffle } from 'lucide-react';

interface CardNavigationProps {
  currentCard: number;
  totalCards: number;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
}

const CardNavigation: React.FC<CardNavigationProps> = ({
  currentCard,
  totalCards,
  onPrevious,
  onNext,
  onShuffle
}) => {
  return (
    <div className="w-full flex items-center justify-between gap-4 mt-6">
      <Button 
        variant="outline" 
        onClick={onPrevious}
        disabled={currentCard === 0}
        className="flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        <span className="hidden sm:inline">Назад</span>
      </Button>
      
      <div className="text-sm font-medium">
        {currentCard + 1} / {totalCards}
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={onShuffle}
          className="flex items-center gap-2"
        >
          <Shuffle size={16} />
          <span className="hidden sm:inline">Перемешать</span>
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onNext}
          disabled={currentCard === totalCards - 1}
          className="flex items-center gap-2"
        >
          <span className="hidden sm:inline">Вперед</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CardNavigation;
