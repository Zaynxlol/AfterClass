import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, Flame, Lightbulb, Star } from "lucide-react";

const stats = [
    { icon: <Flame className="w-6 h-6 text-orange-500" />, value: "5 Days", label: "Study Streak" },
    { icon: <Star className="w-6 h-6 text-yellow-500" />, value: "1,250", label: "XP Points" },
];

const achievements = [
    { icon: <Award className="w-8 h-8 text-yellow-600" />, title: "First Steps", description: "Completed your first study session." },
    { icon: <Award className="w-8 h-8 text-slate-500" />, title: "Note Taker", description: "Created your first 5 notes." },
    { icon: <Award className="w-8 h-8 text-amber-800" />, title: "AI Enthusiast", description: "Used the AI assistant 10 times." },
    { icon: <Award className="w-8 h-8" />, title: "Locked", description: "Achieve a 7-day streak." },
];

const revisionSuggestions = ["Photosynthesis", "Newton's Laws of Motion", "The Cold War"];

export default function ProgressPage() {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Your Progress</h1>
            <p className="text-muted-foreground">
            Keep up the great work! Here&apos;s a summary of your journey.
            </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
            {stats.map(stat => (
                <Card key={stat.label}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                        {stat.icon}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Achievements</CardTitle>
                <CardDescription>Badges you&apos;ve earned for your hard work.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {achievements.map(ach => (
                    <div key={ach.title} className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${ach.title === 'Locked' ? 'bg-muted' : 'bg-primary/10'}`}>
                           {ach.icon}
                        </div>
                        <div>
                            <p className="font-semibold">{ach.title}</p>
                            <p className="text-sm text-muted-foreground">{ach.description}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Revision Suggestions</CardTitle>
                    <CardDescription>AI-powered suggestions on topics to review.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {revisionSuggestions.map(topic => (
                        <div key={topic} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <p className="font-medium">{topic}</p>
                            <Button variant="secondary" size="sm">Review</Button>
                        </div>
                    ))}
                    <Button className="w-full mt-2"><Lightbulb className="w-4 h-4 mr-2"/>Get New Suggestions</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Daily Study Plan</CardTitle>
                    <CardDescription>Your personalized study plan for today.</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4"/>
                    <p className="text-muted-foreground mb-4">Ready to start your day? Generate a study plan tailored to your progress.</p>
                    <Button><Calendar className="w-4 h-4 mr-2"/>Generate Today&apos;s Plan</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
