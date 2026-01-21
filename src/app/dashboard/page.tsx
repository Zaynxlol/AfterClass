import Link from "next/link";
import {
  BookMarked,
  Bot,
  FileText,
  Notebook,
  Timer,
  TrendingUp,
} from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const modules = [
  {
    href: "/dashboard/study",
    icon: <Bot className="w-8 h-8" />,
    title: "AI Study Assistant",
    description: "Your personal AI tutor.",
  },
  {
    href: "/dashboard/answer-generator",
    icon: <FileText className="w-8 h-8" />,
    title: "Answer Generator",
    description: "Generate exam-style answers.",
  },
  {
    href: "/dashboard/notes",
    icon: <Notebook className="w-8 h-8" />,
    title: "Notes Builder",
    description: "Create notes from any source.",
  },
  {
    href: "/dashboard/focus",
    icon: <Timer className="w-8 h-8" />,
    title: "Focus Mode",
    description: "Zone in with the Pomodoro timer.",
  },
  {
    href: "/dashboard/progress",
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Progress Tracker",
    description: "Track your learning journey.",
  },
  {
    href: "#",
    icon: <BookMarked className="w-8 h-8" />,
    title: "My Subjects",
    description: "Manage your study subjects.",
  },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight font-headline mb-6">
        Welcome back, Student!
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Link href={mod.href} key={mod.title}>
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <div className="text-primary mb-4">{mod.icon}</div>
                <CardTitle className="font-headline">{mod.title}</CardTitle>
                <CardDescription>{mod.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
