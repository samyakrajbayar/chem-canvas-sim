import { useEffect, useState } from "react";
import { Atom } from "lucide-react";

interface BootloaderProps {
  onComplete: () => void;
}

export const Bootloader = ({ onComplete }: BootloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing molecular engine...");

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: "Loading atomic database..." },
      { progress: 40, text: "Configuring bond calculator..." },
      { progress: 60, text: "Preparing molecular builder..." },
      { progress: 80, text: "Optimizing compound library..." },
      { progress: 100, text: "Ready to explore chemistry!" },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setProgress(step.progress);
        setLoadingText(step.text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="text-center space-y-8 px-4">
        {/* Animated Molecule */}
        <div className="relative w-32 h-32 mx-auto">
          {/* Center atom */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-slow shadow-lg">
            <Atom className="w-6 h-6 text-white" />
          </div>
          
          {/* Orbiting atoms */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4"
              style={{
                animation: `spin-slow ${4 + i}s linear infinite`,
                transformOrigin: `16px ${32 + i * 8}px`,
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary animate-bounce-subtle shadow-md" />
            </div>
          ))}
        </div>

        {/* Title */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Organic Compound Simulator
          </h1>
          <p className="text-muted-foreground">{loadingText}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-full mx-auto space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>
      </div>
    </div>
  );
};
