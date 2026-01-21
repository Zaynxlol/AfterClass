"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WORK_MINS = 25;
const BREAK_MINS = 5;

export function PomodoroTimer() {
  const [minutes, setMinutes] = useState(WORK_MINS);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const { toast } = useToast();

  const totalDuration = (isBreak ? BREAK_MINS : WORK_MINS) * 60;
  const timeRemaining = minutes * 60 + seconds;
  const progress = ((totalDuration - timeRemaining) / totalDuration) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer finished
          if (isBreak) {
            toast({ title: "Break's over!", description: "Time to get back to work." });
            resetTimer(false);
          } else {
            toast({ title: "Great work!", description: "Time for a short break." });
            resetTimer(true);
          }
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, minutes, isBreak, toast]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = (startBreak: boolean) => {
    setIsActive(false);
    setIsBreak(startBreak);
    setMinutes(startBreak ? BREAK_MINS : WORK_MINS);
    setSeconds(0);
  };

  const time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  useEffect(() => {
    document.title = `${time} - ${isBreak ? 'Break' : 'Focus'} | AfterClassAI`;
  }, [time, isBreak]);

  return (
    <Card className="w-full max-w-md glassmorphism-dark">
      <CardContent className="p-8">
        <div className="relative mx-auto mb-8 flex h-64 w-64 items-center justify-center">
            <svg className="absolute inset-0" viewBox="0 0 100 100">
                <circle className="stroke-current text-muted/20" strokeWidth="4" cx="50" cy="50" r="45" fill="transparent" />
                <circle
                    className={`stroke-current ${isBreak ? 'text-secondary' : 'text-primary'} transition-all duration-1000 ease-linear`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 45}
                    strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <h2 className="text-6xl font-bold font-mono">{time}</h2>
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={toggleTimer} size="lg" className="w-32">
            {isActive ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button onClick={() => resetTimer(isBreak)} variant="outline" size="lg" className="w-32">
            <RotateCcw className="w-6 h-6 mr-2" />
            Reset
          </Button>
        </div>
        <div className="mt-8 text-center">
            <p className="text-lg font-semibold tracking-wider uppercase" style={{color: isBreak ? 'hsl(var(--secondary))' : 'hsl(var(--primary))'}}>
                {isBreak ? "Break Time" : "Focus Session"}
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
