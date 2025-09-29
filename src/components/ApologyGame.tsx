import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Import all sorry images
import sorry1 from '@/assets/sorry.jpg';
import sorry2 from '@/assets/sorry2.jpg';
import sorry3 from '@/assets/sorry3.jpg';
import sorry4 from '@/assets/sorry4.jpg';
import sorry5 from '@/assets/sorry5.jpg';
import sorry6 from '@/assets/sorry6.jpg';

const SORRY_IMAGES = [sorry1, sorry2, sorry3, sorry4, sorry5, sorry6];

const BUTTON_TEXTS = [
  "NOH, ABHI BHI GUSSA HUU😡",
  "Arey\n maaf kar do yar",
  "Plwseeee\n maaf ker duuuu👉🏻👈🏻",
  "PLLLLSUEEE\n maaf kl du naa😭",
  "😭😭😭😭",
  "AREYYYYYYYYYYY\n AB KER BHI DDO YR😭😭",
  "Ab toh ker do\ndehko itni sari button laga di h",
  "HAWW abhi tak nhi kiya😭",
  "theek h fir mai\n oor button lagata rahu ga",
  "AOOOOO MOADUIIIIII\n MAAFF KERR DEEEE😭",
  "BAS thok gya mai\n ab loop laga rha",
  "Please please please\n please maaf ker do😭😭😭"
];

export default function ApologyGame() {
  const [hits, setHits] = useState(0);
  const [gamePhase, setGamePhase] = useState<'hitting' | 'evil' | 'pleading' | 'buttons'>('hitting');
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 20, y: 50 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{id: number, x: number, y: number}>>([]);
  const navigate = useNavigate();

  const maxHits = 6;
  const hpPercentage = Math.max(0, ((maxHits - hits) / maxHits) * 100);

  const handleImageClick = () => {
    if (hits < maxHits) {
      setHits(hits + 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 200);
      
      if (hits + 1 === maxHits) {
        setTimeout(() => {
          setGamePhase('evil');
          setTimeout(() => {
            setGamePhase('pleading');
            setTimeout(() => {
              setGamePhase('buttons');
            }, 3000);
          }, 7000);
        }, 1000);
      }
    }
  };

  const handleForgiveButton = () => {
    navigate('/celebration');
  };

  const handleAngryButton = () => {
    if (buttonClickCount < BUTTON_TEXTS.length - 1) {
      setButtonClickCount(buttonClickCount + 1);
    }
    
    // Generate random position for the button (much farther bounces)
    const newX = Math.random() * 85 + 5; // 5-90% of screen width
    const newY = Math.random() * 80 + 10; // 10-90% of screen height
    setButtonPosition({ x: newX, y: newY });
    
    // Spawn multiple floating emojis near button (cumulative effect)
    const baseEmojiCount = 4;
    const additionalEmojis = buttonClickCount;
    const totalEmojis = baseEmojiCount + additionalEmojis;
    
    const newEmojis = Array.from({ length: totalEmojis }, (_, i) => {
      const emojiId = Date.now() + i;
      const emojiX = buttonPosition.x + (Math.random() * 20 - 10);
      const emojiY = buttonPosition.y + (Math.random() * 20 - 10);
      return { id: emojiId, x: emojiX, y: emojiY };
    });
    
    setFloatingEmojis(prev => [...prev, ...newEmojis]);
    
    // Remove emojis after animation
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(emoji => !newEmojis.find(newEmoji => newEmoji.id === emoji.id)));
    }, 2000);
  };

  const currentImage = SORRY_IMAGES[Math.min(hits, SORRY_IMAGES.length - 1)];
  const currentButtonText = BUTTON_TEXTS[Math.min(buttonClickCount, BUTTON_TEXTS.length - 1)];

  if (gamePhase === 'hitting') {
    return (
      <div className="min-h-screen bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Floating sad emojis background */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-6xl opacity-15 gentle-float"
              style={{
                left: `${Math.random() * 90 + 5}%`,
                top: `${Math.random() * 80 + 10}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            >
              😭
            </div>
          ))}
        </div>
        
        <div className="text-center space-y-8 z-10">
          <h1 className="text-4xl font-bold text-primary mb-8">
            Hit him as harder u can.
          </h1>
          
          <div className="space-y-6">
            <div className="w-64 mx-auto">
              <Progress value={hpPercentage} className="h-6" />
              <p className="text-sm text-muted-foreground mt-2">HP: {hpPercentage.toFixed(0)}%</p>
            </div>
            
            <div className="flex justify-center">
              <div 
                className={cn(
                  "cursor-pointer transform transition-transform duration-200 gentle-float",
                  isAnimating && "scale-90"
                )}
                onClick={handleImageClick}
              >
                <img 
                  src={currentImage} 
                  alt="Sorry character" 
                  className="w-64 h-64 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                />
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground">
              Click to hit! ({hits}/{maxHits})
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (gamePhase === 'evil') {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-destructive/10 to-destructive/20">
        {/* Evil emoji background */}
        <div className="absolute inset-0 text-4xl leading-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <span 
              key={i} 
              className="absolute text-red-600"
              style={{
                left: `${Math.random() * 95}%`,
                top: `${Math.random() * 95}%`,
                opacity: Math.random() * 0.4 + 0.1,
              }}
            >
              😈
            </span>
          ))}
        </div>
        <div className="z-20 text-center bg-black/50 p-8 rounded-3xl backdrop-blur-sm">
          <h1 className="text-6xl sm:text-8xl font-black text-white animate-pulse drop-shadow-2xl">
            PHEL DALA MANGU KO
          </h1>
        </div>
      </div>
    );
  }

  if (gamePhase === 'pleading') {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Sad emoji background */}
        <div className="absolute inset-0 text-4xl leading-none overflow-hidden opacity-20">
          {Array.from({ length: 150 }).map((_, i) => (
            <span 
              key={i} 
              className="absolute"
              style={{
                left: `${(i % 15) * 6.67}%`,
                top: `${Math.floor(i / 15) * 10}%`,
              }}
            >
              {['🤕', '🥲', '🥺'][i % 3]}
            </span>
          ))}
        </div>
        <div className="z-10 text-center fade-in">
          <h1 className="text-4xl font-bold text-primary mb-8 px-4">
            Ab toh itna maar liya h<br> ab toh maaf ker do😭😭
          </h1>
        </div>
      </div>
    );
  }

  if (gamePhase === 'buttons') {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-8">
        {/* Sad emoji background */}
        <div className="absolute inset-0 text-4xl leading-none overflow-hidden opacity-20">
          {Array.from({ length: 150 }).map((_, i) => (
            <span 
              key={i} 
              className="absolute"
              style={{
                left: `${(i % 15) * 6.67}%`,
                top: `${Math.floor(i / 15) * 10}%`,
              }}
            >
              {['🤕', '🥲', '🥺'][i % 3]}
            </span>
          ))}
        </div>
        
        <div className="z-10 text-center space-y-8 fade-in">
          <h1 className="text-4xl font-bold text-primary mb-8 px-4">
            Ab toh itna maar liya h ab toh maaf ker do😭😭
          </h1>
          
          {/* Right-aligned forgive button - larger */}
          <div className="fixed right-8 top-1/2 transform -translate-y-1/2">
            <Button 
              onClick={handleForgiveButton}
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-8 px-16 text-2xl shadow-2xl"
            >
              JA Maaf kiya
            </Button>
          </div>
          
          {/* Moving angry button with fiery effect - slightly smaller than forgive button */}
          <Button 
            onClick={handleAngryButton}
            variant="destructive"
            size="lg"
            className={cn(
              "absolute font-bold py-6 px-12 text-xl transition-all duration-300 bounce-animation fiery-button",
              "hover:scale-105 shadow-2xl"
            )}
            style={{
              left: `${buttonPosition.x}%`,
              top: `${buttonPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {currentButtonText}
          </Button>
          
          {/* Floating emojis */}
          {floatingEmojis.map(emoji => (
            <div
              key={emoji.id}
              className="absolute text-4xl pointer-events-none floating-emoji opacity-70"
              style={{
                left: `${emoji.x}%`,
                top: `${emoji.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              😭
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}