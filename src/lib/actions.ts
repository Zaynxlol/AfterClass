"use server";

import { explainSimply } from "@/ai/flows/ai-simple-explanations";
import { generateExamFocusedAnswer } from "@/ai/flows/ai-exam-focused-answers";
import { summarizeTopic } from "@/ai/flows/ai-quick-topic-summaries";
import { generateExamStyleAnswer } from "@/ai/flows/generate-exam-style-answers";
import { generateNotesFromPdf } from "@/ai/flows/generate-notes-from-pdf";

export async function getSimpleExplanation(topic: string) {
  const result = await explainSimply({ topic });
  return result.explanation;
}

export async function getExamFocusedAnswer(topic: string) {
  // Using default values as context isn't fully implemented
  const result = await generateExamFocusedAnswer({
    question: topic,
    subject: "General",
    educationLevel: "High School",
    marks: 5,
  });
  return result.answer;
}

export async function getQuickRevision(topic: string) {
  const result = await summarizeTopic({ topic });
  return result.summary;
}

export async function generateAnswerAction(formData: FormData) {
  const question = formData.get("question") as string;
  const subject = formData.get("subject") as string;
  const educationLevel = formData.get("educationLevel") as string;
  const marks = parseInt(formData.get("marks") as string, 10);

  const result = await generateExamStyleAnswer({
    question,
    subject,
    educationLevel,
    marks,
  });
  return result.answer;
}

export async function generateNotesFromTextAction(topic: string) {
    const result = await summarizeTopic({ topic });
    return result.summary;
}

export async function generateNotesFromFileAction(fileDataUri: string) {
    const result = await generateNotesFromPdf({ fileDataUri });
    return result.notes;
}
