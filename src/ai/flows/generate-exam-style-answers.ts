'use server';

/**
 * @fileOverview A flow to generate exam-style answers based on user input.
 *
 * - generateExamStyleAnswer - A function that generates exam-style answers.
 * - GenerateExamStyleAnswerInput - The input type for the generateExamStyleAnswer function.
 * - GenerateExamStyleAnswerOutput - The return type for the generateExamStyleAnswer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExamStyleAnswerInputSchema = z.object({
  question: z.string().describe('The question to answer.'),
  subject: z.string().describe('The subject of the question.'),
  educationLevel: z.string().describe('The education level of the question (e.g., high school, undergraduate).'),
  marks: z.number().describe('The number of marks the answer should be worth (e.g., 2, 5, 10).'),
});

export type GenerateExamStyleAnswerInput = z.infer<typeof GenerateExamStyleAnswerInputSchema>;

const GenerateExamStyleAnswerOutputSchema = z.object({
  answer: z.string().describe('The generated exam-style answer.'),
});

export type GenerateExamStyleAnswerOutput = z.infer<typeof GenerateExamStyleAnswerOutputSchema>;

export async function generateExamStyleAnswer(input: GenerateExamStyleAnswerInput): Promise<GenerateExamStyleAnswerOutput> {
  return generateExamStyleAnswerFlow(input);
}

const generateExamStyleAnswerPrompt = ai.definePrompt({
  name: 'generateExamStyleAnswerPrompt',
  input: {schema: GenerateExamStyleAnswerInputSchema},
  output: {schema: GenerateExamStyleAnswerOutputSchema},
  prompt: `You are an expert in {{subject}} and will generate an exam-style answer to the following question.

Question: {{question}}
Subject: {{subject}}
Education Level: {{educationLevel}}
Marks: {{marks}}

Your answer should be properly structured, use headings and bullet points where appropriate, and highlight keywords.
Focus on providing a clear, concise, and exam-focused answer that is appropriate for the education level and mark allocation.`,
});

const generateExamStyleAnswerFlow = ai.defineFlow(
  {
    name: 'generateExamStyleAnswerFlow',
    inputSchema: GenerateExamStyleAnswerInputSchema,
    outputSchema: GenerateExamStyleAnswerOutputSchema,
  },
  async input => {
    const {output} = await generateExamStyleAnswerPrompt(input);
    return output!;
  }
);
