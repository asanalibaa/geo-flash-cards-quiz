
import React from 'react';
import { Button } from '@/components/ui/button';
import { Flashcard } from '@/data/flashcards';

interface ResultsProps {
  cards: Flashcard[];
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ cards, onRestart }) => {
  const correctAnswers = cards.filter((card) => card.isCorrect).length;
  const totalCards = cards.length;
  const percentage = Math.round((correctAnswers / totalCards) * 100);
  const isPassed = percentage >= 70;

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-xl shadow-lg bg-white border">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isPassed ? "Отличная работа!" : "Попробуй ещё раз!"}
      </h2>
      
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-primary">{percentage}%</div>
        <p className="text-gray-600 mt-2">
          Вы ответили правильно на {correctAnswers} из {totalCards} вопросов
        </p>
      </div>
      
      <div className="flex justify-center">
        <Button onClick={onRestart} className="px-8">
          Начать заново
        </Button>
      </div>
    </div>
  );
};

export default Results;
