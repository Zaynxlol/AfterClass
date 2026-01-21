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
  
  // Update document title
  useEffect(() => {
    document.title = `${time} - ${isBreak ? 'Break' : 'Focus'} | AfterClassAI`;
  }, [time, isBreak]);

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-8">
        <div className={`mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-full border-8 ${isBreak ? 'border-accent' : 'border-primary'}`}>
            <h2 className="text-6xl font-bold font-mono">{time}</h2>
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={toggleTimer} size="lg">
            {isActive ? <Pause className="w-6 h-6 mr-2" /> : <Play className="w-6 h-6 mr-2" />}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button onClick={() => resetTimer(isBreak)} variant="outline" size="lg">
            <RotateCcw className="w-6 h-6 mr-2" />
            Reset
          </Button>
        </div>
        <div className="mt-6 text-center">
            <p className="text-lg font-semibold">
                {isBreak ? "Break Time" : "Focus Session"}
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
