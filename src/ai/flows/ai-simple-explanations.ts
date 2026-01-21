'use server';
/**
 * @fileOverview This file defines a Genkit flow for explaining complex concepts in simple terms.
 *
 * The flow takes a topic as input and returns a simplified explanation of the topic.
 * - explainSimply - A function that handles the process of explaining a concept simply.
 * - ExplainSimplyInput - The input type for the explainSimply function.
 * - ExplainSimplyOutput - The return type for the explainSimplyOutput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainSimplyInputSchema = z.object({
  topic: z.string().describe('The topic to explain simply.'),
});
export type ExplainSimplyInput = z.infer<typeof ExplainSimplyInputSchema>;

const ExplainSimplyOutputSchema = z.object({
  explanation: z.string().describe('A simplified explanation of the topic.'),
});
export type ExplainSimplyOutput = z.infer<typeof ExplainSimplyOutputSchema>;

export async function explainSimply(input: ExplainSimplyInput): Promise<ExplainSimplyOutput> {
  return explainSimplyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainSimplyPrompt',
  input: {schema: ExplainSimplyInputSchema},
  output: {schema: ExplainSimplyOutputSchema},
  prompt: `You are an expert academic writer. A student has asked you to explain the following topic. 
  
  Your response must be structured like a formal document. Use Markdown for formatting, including a main title, sections with H2 headings, subsections with H3 headings where appropriate, bullet points for lists, and bold text for key terms. Ensure the tone is professional, educational, and authoritative.

  Topic: {{{topic}}}`,
});

const explainSimplyFlow = ai.defineFlow(
  {
    name: 'explainSimplyFlow',
    inputSchema: ExplainSimplyInputSchema,
    outputSchema: ExplainSimplyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
