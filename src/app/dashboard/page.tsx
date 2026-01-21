import Link from "next/link";
import {
  ArrowRight,
  BarChart,
  BookCopy,
  BrainCircuit,
  CheckCircle2,
  Flame,
  Lightbulb,
  Timer,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const stats = [
  {
    icon: <Timer className="w-6 h-6 text-primary" />,
    value: "4.5h",
    label: "Study Time Today",
  },
  {
    icon: <Flame className="w-6 h-6 text-orange-500" />,
    value: "5 Days",
    label: "Current Streak",
  },
  {
    icon: <BookCopy className="w-6 h-6 text-green-500" />,
    value: "3",
    label: "Weak Topics",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6 text-blue-500" />,
    value: "8",
    label: "Tasks Completed",
  },
];

const aiSuggestions = [
    { icon: <BrainCircuit size={20}/>, text: "Review the process of cellular respiration."},
    { icon: <BrainCircuit size={20}/>, text: "Practice past paper questions on algebra."},
    { icon: <BrainCircuit size={20}/>, text: "Summarize the key events of the Cold War."},
]

export default function Dashboard() {
  const greeting = getGreeting();
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 via-background to-background animate-fade-in-up">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          {greeting}, Student! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Your daily AI insight: "The secret to getting ahead is getting started."
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={stat.label}
            style={{ animationDelay: `${i * 100 + 200}ms` }}
            className="h-full transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.label}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <CardHeader>
            <CardTitle>Continue Studying</CardTitle>
            <CardDescription>You were last studying Biology.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                        <BarChart className="w-6 h-6 text-green-600 dark:text-green-400"/>
                    </div>
                    <div>
                        <h3 className="font-semibold">Cellular Respiration</h3>
                        <p className="text-sm text-muted-foreground">You are 75% through this topic.</p>
                    </div>
                </div>
                <Progress value={75} />
                <Button asChild className="group">
                    <Link href="/dashboard/study">Resume <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/></Link>
                </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: '700ms' }}>
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
            <CardDescription>What to focus on next.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiSuggestions.map((suggestion, i) => (
                <div key={i} className="flex items-center gap-3 p-3 -m-3 rounded-lg hover:bg-muted/50 transition-colors">
                   <div className="text-primary">{suggestion.icon}</div>
                    <p className="text-sm font-medium">{suggestion.text}</p>
                </div>
            ))}
            <Button variant="outline" className="w-full">
                <Lightbulb className="w-4 h-4 mr-2"/>
                Refresh Suggestions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
