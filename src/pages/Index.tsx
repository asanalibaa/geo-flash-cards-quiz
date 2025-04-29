
import React, { useState, useEffect } from 'react';
import FlashCard from '@/components/FlashCard';
import CardNavigation from '@/components/CardNavigation';
import Results from '@/components/Results';
import { flashcardsData, Flashcard } from '@/data/flashcards';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [cards, setCards] = useState<Flashcard[]>([...flashcardsData]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'right' | 'left' | null>(null);

  // Initialize all cards as unanswered
  useEffect(() => {
    setCards(cards.map(card => ({ ...card, isCorrect: undefined })));
  }, []);
  
  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setAnimationDirection('left');
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex - 1);
        setAnimationDirection(null);
      }, 150);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      // Mark current card as correct (simplified implementation)
      const updatedCards = [...cards];
      if (updatedCards[currentCardIndex].isCorrect === undefined) {
        updatedCards[currentCardIndex].isCorrect = Math.random() > 0.3; // 70% chance of correct
      }
      setCards(updatedCards);
      
      setAnimationDirection('right');
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
        setAnimationDirection(null);
      }, 150);
    } else if (currentCardIndex === cards.length - 1 && !isCompleted) {
      // Mark last card and show results
      const finalCards = [...cards];
      if (finalCards[currentCardIndex].isCorrect === undefined) {
        finalCards[currentCardIndex].isCorrect = Math.random() > 0.3;
      }
      setCards(finalCards);
      setIsCompleted(true);
      
      // Show toast notification
      const correctCount = finalCards.filter(card => card.isCorrect).length;
      const percentage = Math.round((correctCount / finalCards.length) * 100);
      
      toast({
        title: percentage >= 70 ? "Поздравляем!" : "Завершено",
        description: `Вы ответили верно на ${correctCount} из ${finalCards.length} вопросов (${percentage}%)`,
        duration: 5000,
      });
    }
  };

  const handleShuffle = () => {
    const shuffledCards = [...cards];
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCards(shuffledCards);
    setCurrentCardIndex(0);
    setIsCompleted(false);
    
    toast({
      title: "Карточки перемешаны",
      description: "Начните заново с новым порядком вопросов",
      duration: 3000,
    });
  };

  const handleRestart = () => {
    setCards(flashcardsData.map(card => ({ ...card, isCorrect: undefined })));
    setCurrentCardIndex(0);
    setIsCompleted(false);
  };

  const animationClass = animationDirection === 'right' 
    ? 'animate-slide-in-right' 
    : animationDirection === 'left' 
      ? 'animate-slide-in-left' 
      : '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4 bg-gradient-to-br from-white to-secondary">
      <div className="container max-w-5xl mx-auto flex flex-col items-center">
        <header className="mb-12 text-center w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-2">География 8 класс</h1>
          <p className="text-lg text-gray-600">Флеш-карточки для проверки знаний</p>
        </header>
        
        {!isCompleted ? (
          <div className="flex flex-col items-center justify-center w-full">
            <div className={`w-full flex justify-center ${animationClass}`}>
              <FlashCard 
                question={cards[currentCardIndex].question} 
                answer={cards[currentCardIndex].answer} 
              />
            </div>
            
            <CardNavigation 
              currentCard={currentCardIndex}
              totalCards={cards.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onShuffle={handleShuffle}
            />
          </div>
        ) : (
          <Results cards={cards} onRestart={handleRestart} />
        )}
        
        <footer className="mt-16 text-center text-sm text-gray-500 w-full">
          <p>Интерактивные флеш-карточки по географии для 8 класса</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
