'use server';

/**
 * @fileOverview A flow for generating exam-focused answers using the AI Study Assistant.
 *
 * - generateExamFocusedAnswer - A function that generates exam-focused answers.
 * - GenerateExamFocusedAnswerInput - The input type for the generateExamFocusedAnswer function.
 * - GenerateExamFocusedAnswerOutput - The return type for the generateExamFocusedAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExamFocusedAnswerInputSchema = z.object({
  question: z.string().describe('The question to answer.'),
  subject: z.string().describe('The subject of the question.'),
  educationLevel: z.string().describe('The education level of the question.'),
  marks: z.number().describe('The number of marks the answer should be worth.'),
});
export type GenerateExamFocusedAnswerInput = z.infer<typeof GenerateExamFocusedAnswerInputSchema>;

const GenerateExamFocusedAnswerOutputSchema = z.object({
  answer: z.string().describe('The exam-focused answer to the question.'),
});
export type GenerateExamFocusedAnswerOutput = z.infer<typeof GenerateExamFocusedAnswerOutputSchema>;

export async function generateExamFocusedAnswer(input: GenerateExamFocusedAnswerInput): Promise<GenerateExamFocusedAnswerOutput> {
  return generateExamFocusedAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExamFocusedAnswerPrompt',
  input: {schema: GenerateExamFocusedAnswerInputSchema},
  output: {schema: GenerateExamFocusedAnswerOutputSchema},
  prompt: `You are an AI study assistant that generates exam-focused answers for students.

  Generate a properly structured exam-style answer with headings, bullet points, and keywords highlighted for the following question:

  Question: {{{question}}}
  Subject: {{{subject}}}
  Education Level: {{{educationLevel}}}
  Marks: {{{marks}}}
  `,
});

const generateExamFocusedAnswerFlow = ai.defineFlow(
  {
    name: 'generateExamFocusedAnswerFlow',
    inputSchema: GenerateExamFocusedAnswerInputSchema,
    outputSchema: GenerateExamFocusedAnswerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
