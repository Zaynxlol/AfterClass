import { GeneratorForm } from "./components/generator-form";

export default function AnswerGeneratorPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Answer Sheet Generator</h1>
        <p className="text-muted-foreground">
          Create structured, exam-style answers for any question.
        </p>
      </div>
      <GeneratorForm />
    </div>
  );
}
