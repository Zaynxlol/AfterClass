import { NotesSection } from "./components/notes-section";

export default function NotesPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Smart Notes & PDF Builder</h1>
        <p className="text-muted-foreground">
          Create, manage, and generate notes effortlessly.
        </p>
      </div>
      <NotesSection />
    </div>
  );
}
