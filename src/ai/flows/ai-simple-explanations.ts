'use server';
/**
 * @fileOverview This file defines a Genkit flow for explaining complex concepts in simple terms.
 *
 * The flow takes a topic as input and returns a simplified explanation of the topic.
 * - explainSimply - A function that handles the process of explaining a concept simply.
 * - ExplainSimplyInput - The input type for the explainSimply function.
 * - ExplainSimplyOutput - The return type for the explainSimply function.
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
  prompt: `You are an expert at explaining complex topics in simple terms. A student has asked you to explain the following topic:

{{topic}}

Please provide a well-structured explanation in Markdown format. Use headings, subheadings, bullet points, and bold text to organize the information clearly. Your explanation should be clear, concise, and easy to understand.`,
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
