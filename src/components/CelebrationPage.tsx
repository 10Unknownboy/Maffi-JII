import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function CelebrationPage() {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);

    // Add background music
    const audio = new Audio('/yee.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    
    // Auto-play with user interaction fallback
    const playAudio = () => {
      audio.play().catch(console.log);
    };
    
    playAudio();
    document.addEventListener('click', playAudio, { once: true });

    return () => {
      clearTimeout(timer);
      audio.pause();
      document.removeEventListener('click', playAudio);
    };
  }, []);

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen celebration-background flex flex-col items-center justify-center relative overflow-hidden p-8">
      {/* Enhanced confetti particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            className={`absolute confetti`}
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              backgroundColor: `hsl(${Math.random() * 360}, 80%, 70%)`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: `0 0 10px hsl(${Math.random() * 360}, 80%, 70%)`,
            }}
          />
        ))}
        {/* Add sparkly star particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-2xl confetti opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
      
      {/* Main celebration text */}
      <div className="text-center z-10 space-y-8">
        <h1 className="text-6xl sm:text-8xl font-black text-white animate-bounce tracking-wider">
          YYYEEEE
        </h1>
        <h2 className="text-5xl sm:text-7xl font-black text-accent animate-pulse">
          PARTYY
        </h2>
        
        {/* Message that appears after 2 seconds */}
        {showMessage && (
          <div className="fade-in space-y-6">
            <p className="text-xl sm:text-2xl text-white bg-black/20 rounded-2xl p-6 backdrop-blur-sm">
              ab msg bhi ker digye👉🏻👈🏻 toda jaldi me banaya h toh bataiye kesi bani website
            </p>
            
            <Button 
              onClick={handleBackHome}
              variant="secondary"
              size="lg"
              className="bg-white/90 text-primary hover:bg-white font-bold py-4 px-8"
            >
              Start Again 🔄
            </Button>
          </div>
        )}
      </div>
      
      {/* Dancing emojis */}
      <div className="absolute bottom-0 left-0 right-0 text-6xl flex justify-center space-x-4 animate-bounce">
        <span>🎉</span>
        <span>🎊</span>
        <span>🥳</span>
        <span>🎈</span>
        <span>🎆</span>
      </div>
    </div>
  );
}