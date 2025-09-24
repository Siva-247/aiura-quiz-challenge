import { useEffect, useState } from 'react';

const CongratsAnimation = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="text-center space-y-6">
      <div className={`transform transition-all duration-1000 ${show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-4xl font-bold text-primary mb-2">Congratulations!</h1>
        <p className="text-xl text-muted-foreground">You've completed the quiz!</p>
      </div>
      
      <div className="flex justify-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`text-2xl animate-bounce`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          >
            ⭐
          </div>
        ))}
      </div>
    </div>
  );
};

export default CongratsAnimation;