import { config } from 'dotenv';
config();

import '@/ai/flows/generate-exam-style-answers.ts';
import '@/ai/flows/ai-quick-topic-summaries.ts';
import '@/ai/flows/ai-exam-focused-answers.ts';
import '@/ai/flows/ai-simple-explanations.ts';
import '@/ai/flows/generate-notes-from-pdf.ts';
import '@/ai/flows/generate-daily-study-plans.ts';
import '@/ai/flows/personalized-revision-suggestions.ts';
import '@/ai/flows/gentle-ai-study-reminders.ts';