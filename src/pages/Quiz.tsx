import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import Timer from '@/components/Timer';
import CongratsAnimation from '@/components/CongratsAnimation';
import { quizQuestions } from '@/data/quizData';
import { supabase } from '@/integrations/supabase/client';

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizStartTime] = useState(Date.now());
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [character, setCharacter] = useState<any>(null);

  const completeQuiz = useCallback(async (answers: number[]) => {
    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);

    const registrationId = localStorage.getItem('registrationId');

    try {
      const { error } = await supabase
        .from('quiz_results')
        .insert([{
          registration_id: registrationId,
          score,
          total_questions: quizQuestions.length,
          time_taken: timeTaken,
          answers: answers
        }]);

      if (error) throw error;

      setIsQuizComplete(true);
      
      setTimeout(() => {
        localStorage.removeItem('registrationId');
        localStorage.removeItem('selectedCharacter');
        navigate('/');
      }, 5000);
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save quiz results.",
        variant: "destructive"
      });
    }
  }, [quizStartTime, navigate, toast]);

  const handleTabSwitch = useCallback(() => {
    if (!isQuizComplete) {
      toast({
        title: "Quiz Ended",
        description: "Quiz has been ended due to tab switching.",
        variant: "destructive",
      });
      completeQuiz(userAnswers);
    }
  }, [isQuizComplete, userAnswers, toast, completeQuiz]);

  useEffect(() => {
    const savedCharacter = localStorage.getItem('selectedCharacter');
    const registrationId = localStorage.getItem('registrationId');
    
    if (!savedCharacter || !registrationId) {
      toast({
        title: "Access Denied",
        description: "Please complete registration and character selection first.",
        variant: "destructive"
      });
      navigate('/register');
      return;
    }
    
    setCharacter(JSON.parse(savedCharacter));

    // Tab visibility detection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleTabSwitch();
      }
    };

    // Page focus/blur detection
    const handleBlur = () => {
      handleTabSwitch();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    // Prevent right-click context menu
    const preventContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', preventContextMenu);

    // Prevent common keyboard shortcuts for copying
    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'a' || e.key === 's' || e.key === 'v')) {
        e.preventDefault();
      }
      if (e.key === 'F12') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', preventKeyboardShortcuts);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('contextmenu', preventContextMenu);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
    };
  }, [navigate, toast, handleTabSwitch]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Select an Answer",
        description: "Please select an answer before proceeding.",
        variant: "destructive"
      });
      return;
    }

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestionIndex === quizQuestions.length - 1) {
      completeQuiz(newAnswers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "The quiz time has ended.",
    });
    completeQuiz(userAnswers);
  };

  if (!character) return null;

  if (isQuizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
        <CongratsAnimation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <Timer duration={30} onTimeUp={handleTimeUp} />
      
      <div className="container mx-auto max-w-4xl py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{character.avatar}</div>
            <div>
              <h1 className="text-2xl font-bold">{character.name}</h1>
              <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {quizQuestions.length}</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-6 quiz-content">
          <CardHeader>
            <CardTitle className="text-xl">
              Q{currentQuestion.id}. 
            </CardTitle>
            <CardDescription className="text-base whitespace-pre-wrap font-mono">
              {currentQuestion.question}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className="w-full text-left justify-start h-auto p-4 whitespace-pre-wrap font-mono"
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="font-semibold mr-3">{String.fromCharCode(65 + index)})</span>
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Button */}
        <div className="text-center">
          <Button 
            onClick={handleNext}
            size="lg"
            disabled={selectedAnswer === null}
          >
            {currentQuestionIndex === quizQuestions.length - 1 ? 'Complete Quiz' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;