import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface TimerProps {
  duration: number; // in minutes
  onTimeUp: () => void;
}

const Timer = ({ duration, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isWarning = timeLeft <= 300; // 5 minutes
  const isCritical = timeLeft <= 60; // 1 minute

  return (
    <Card className="fixed top-4 right-4 z-50">
      <div className={`px-4 py-2 font-mono text-lg font-bold ${
        isCritical ? 'text-quiz-error' : 
        isWarning ? 'text-quiz-warning' : 
        'text-primary'
      }`}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
    </Card>
  );
};

export default Timer;