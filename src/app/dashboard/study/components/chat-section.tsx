"use client";

import { useState, useRef, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Loader2, Send, Sparkles, PencilRuler, BookOpen } from "lucide-react";
import {
  getSimpleExplanation,
  getExamFocusedAnswer,
  getQuickRevision,
} from "@/lib/actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type StudyMode = "explain" | "exam" | "revision";

export function ChatSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<StudyMode>("explain");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleModeChange = (newMode: StudyMode) => {
    setMode(newMode);
    setMessages([]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInput("");

    try {
      let response = "";
      if (mode === "explain") {
        response = await getSimpleExplanation(input);
      } else if (mode === "exam") {
        response = await getExamFocusedAnswer(input);
      } else if (mode === "revision") {
        response = await getQuickRevision(input);
      }
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
            <div className="flex gap-2">
                <Button variant={mode === 'explain' ? 'default' : 'outline'} size="sm" onClick={() => handleModeChange('explain')}><Sparkles className="w-4 h-4 mr-2" />Explain Simply</Button>
                <Button variant={mode === 'exam' ? 'default' : 'outline'} size="sm" onClick={() => handleModeChange('exam')}><PencilRuler className="w-4 h-4 mr-2" />Exam-focused</Button>
                <Button variant={mode === 'revision' ? 'default' : 'outline'} size="sm" onClick={() => handleModeChange('revision')}><BookOpen className="w-4 h-4 mr-2" />Quick Revision</Button>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
                 <div className="text-center text-muted-foreground pt-16">
                    <Bot size={48} className="mx-auto" />
                    <p className="mt-4">
                        {mode === 'explain' && "Ask me to explain a complex topic simply."}
                        {mode === 'exam' && "Ask a question to get an exam-style answer."}
                        {mode === 'revision' && "Enter a topic for a quick summary."}
                    </p>
                 </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === "user" ? "justify-end" : ""
                )}
              >
                {message.role === "assistant" && (
                  <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%] whitespace-pre-wrap",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p>{message.content}</p>
                </div>
                 {message.role === "user" && (
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                 <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-6">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            id="message"
            placeholder="Type your question or topic here..."
            className="flex-1"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
