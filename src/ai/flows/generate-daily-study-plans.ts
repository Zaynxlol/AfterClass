'use server';

/**
 * @fileOverview Generates daily study plans based on the user's study history.
 *
 * - generateDailyStudyPlans - A function that generates daily study plans.
 * - GenerateDailyStudyPlansInput - The input type for the generateDailyStudyPlans function.
 * - GenerateDailyStudyPlansOutput - The return type for the generateDailyStudyPlans function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyStudyPlansInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  studyHistory: z
    .string()
    .describe(
      'A summary of the user study history, including topics studied, questions asked, and time spent per subject.'
    ),
  preferences: z.string().optional().describe('The user preferences.'),
});
export type GenerateDailyStudyPlansInput = z.infer<typeof GenerateDailyStudyPlansInputSchema>;

const GenerateDailyStudyPlansOutputSchema = z.object({
  studyPlan: z.string().describe('The generated daily study plan.'),
});
export type GenerateDailyStudyPlansOutput = z.infer<typeof GenerateDailyStudyPlansOutputSchema>;

export async function generateDailyStudyPlans(
  input: GenerateDailyStudyPlansInput
): Promise<GenerateDailyStudyPlansOutput> {
  return generateDailyStudyPlansFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailyStudyPlansPrompt',
  input: {schema: GenerateDailyStudyPlansInputSchema},
  output: {schema: GenerateDailyStudyPlansOutputSchema},
  prompt: `You are an AI study assistant that generates daily study plans for students.

  Based on the student's study history and preferences, generate a daily study plan.

  Study History: {{{studyHistory}}}
  Preferences: {{{preferences}}}

  The study plan should be clear, concise, and easy to follow.
  It should include specific topics to study and the amount of time to spend on each topic.
  The study plan should be formatted for an exam-focused learning style.
  Make sure to vary the topics and ensure topics that need most attention are prioritized.
  `,
});

const generateDailyStudyPlansFlow = ai.defineFlow(
  {
    name: 'generateDailyStudyPlansFlow',
    inputSchema: GenerateDailyStudyPlansInputSchema,
    outputSchema: GenerateDailyStudyPlansOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
