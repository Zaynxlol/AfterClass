import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, FileText, Notebook, Timer, Star, MoveRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const features = [
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "AI Study Assistant",
    description: "Get instant answers, simple explanations, and exam-focused guidance on any topic.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Answer Sheet Generator",
    description: "Generate structured, exam-style answers complete with formatting and keywords.",
  },
  {
    icon: <Notebook className="w-8 h-8 text-primary" />,
    title: "Smart Notes Builder",
    description: "Automatically create concise notes from your study materials, including PDFs and images.",
  },
  {
    icon: <Timer className="w-8 h-8 text-primary" />,
    title: "Focus Mode",
    description: "Stay on track with a built-in Pomodoro timer and gentle AI-powered reminders.",
  },
];

const testimonials = [
  {
    name: "Sarah L.",
    title: "University Student",
    avatar: "https://picsum.photos/seed/1/40/40",
    text: "AfterClass has been a game-changer for my exam prep. The AI assistant helps me understand complex topics in minutes!",
  },
  {
    name: "David C.",
    title: "High School Student",
    avatar: "https://picsum.photos/seed/2/40/40",
    text: "I love the notes builder. It saves me so much time, and the focus mode is great for staying productive. Highly recommend!",
  },
  {
    name: "Emily R.",
    title: "Postgraduate Student",
    avatar: "https://picsum.photos/seed/3/40/40",
    text: "The ability to generate exam-style answers has been invaluable. It's like having a personal tutor available 24/7.",
  }
]

const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo />
        </Link>
        <nav className="ml-auto flex items-center gap-2 sm:gap-4">
          <Button asChild variant="ghost">
            <Link href="/login" prefetch={false}>
              Log In
            </Link>
          </Button>
          <Button asChild className="group">
            <Link href="/dashboard" prefetch={false}>
              Get Started
              <MoveRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none font-headline text-glow animate-fade-in-up">
                    Study Smarter, Not Harder
                  </h1>
                  <p style={{animationDelay: '200ms'}} className="max-w-[700px] text-muted-foreground md:text-xl animate-fade-in-up">
                    AfterClass is your intelligent study companion, designed to help you learn faster, understand deeper, and achieve your academic goals. For free.
                  </p>
                </div>
                <div style={{animationDelay: '400ms'}} className="animate-fade-in-up">
                  <Button asChild size="lg" className="group">
                    <Link href="/dashboard" prefetch={false}>
                      Start Studying Free
                      <MoveRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary/20 text-secondary-foreground border border-secondary/30 px-3 py-1 text-sm font-medium">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AfterClass is packed with powerful, AI-driven tools designed to enhance your learning experience, all completely free.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature, i) => (
                <Card key={feature.title} style={{animationDelay: `${i * 150}ms`}} className="h-full bg-card/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up">
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Loved by Students Everywhere</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See how AfterClass is helping students like you achieve their academic goals.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="glassmorphism-dark">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/90 text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Ready to Elevate Your Studies?</h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl my-4">
              Join thousands of students who are studying smarter with AfterClass. It's free to get started.
            </p>
            <Button size="lg" variant="secondary" asChild className="group text-secondary-foreground">
              <Link href="/dashboard">
                Start Your Journey
                <MoveRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 AfterClassAI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
