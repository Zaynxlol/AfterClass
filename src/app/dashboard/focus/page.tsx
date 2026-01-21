import { PomodoroTimer } from "./components/pomodoro-timer";

export default function FocusPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-theme(spacing.32))] animate-fade-in-up bg-gradient-to-br from-background via-blue-50 to-purple-100 dark:from-background dark:via-slate-900/50 dark:to-purple-950/50">
        <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight font-headline">Focus Mode</h1>
            <p className="text-muted-foreground mt-2">
            Minimize distractions and get in the zone.
            </p>
        </div>
        <PomodoroTimer />
    </div>
  )
}
