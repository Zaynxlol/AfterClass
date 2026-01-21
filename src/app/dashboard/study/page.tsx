import { ChatSection } from "./components/chat-section";

export default function StudyPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">AI Study Assistant</h1>
        <p className="text-muted-foreground">Your personal AI tutor. Ask anything!</p>
      </div>
      <ChatSection />
    </div>
  )
}
