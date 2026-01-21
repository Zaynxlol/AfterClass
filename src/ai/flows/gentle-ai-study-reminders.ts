'use server';
/**
 * @fileOverview A gentle AI study reminder agent.
 *
 * - generateReminder - A function that generates study reminders.
 * - GenerateReminderInput - The input type for the generateReminder function.
 * - GenerateReminderOutput - The return type for the generateReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReminderInputSchema = z.object({
  topic: z.string().describe('The current topic the student is studying.'),
  timeElapsed: z
    .number()
    .describe('The amount of time the student has been studying in minutes.'),
  studyGoal: z.string().describe('The study goal for the current session.'),
});
export type GenerateReminderInput = z.infer<typeof GenerateReminderInputSchema>;

const GenerateReminderOutputSchema = z.object({
  reminder: z.string().describe('A gentle reminder to stay focused on the study goal.'),
});
export type GenerateReminderOutput = z.infer<typeof GenerateReminderOutputSchema>;

export async function generateReminder(input: GenerateReminderInput): Promise<GenerateReminderOutput> {
  return generateReminderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReminderPrompt',
  input: {schema: GenerateReminderInputSchema},
  output: {schema: GenerateReminderOutputSchema},
  prompt: `You are a friendly and encouraging study assistant. Your goal is to provide gentle reminders to students to help them stay focused on their study goals.

  The student is currently studying the following topic: {{{topic}}}
  They have been studying for {{timeElapsed}} minutes.
  Their study goal for this session is: {{{studyGoal}}}

  Provide a single, short, and encouraging reminder to help the student stay on task. The reminder should be no more than 2 sentences.
  `,
});

const generateReminderFlow = ai.defineFlow(
  {
    name: 'generateReminderFlow',
    inputSchema: GenerateReminderInputSchema,
    outputSchema: GenerateReminderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
