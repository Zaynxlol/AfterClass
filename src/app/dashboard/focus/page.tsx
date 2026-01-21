import { PomodoroTimer } from "./components/pomodoro-timer";

export default function FocusPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-theme(spacing.24))]">
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
