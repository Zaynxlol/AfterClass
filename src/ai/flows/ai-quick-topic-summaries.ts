'use server';
/**
 * @fileOverview A flow that summarizes topics for quick revision.
 *
 * - summarizeTopic - A function that summarizes a topic.
 * - SummarizeTopicInput - The input type for the summarizeTopic function.
 * - SummarizeTopicOutput - The return type for the summarizeTopic function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTopicInputSchema = z.object({
  topic: z.string().describe('The topic to summarize.'),
});
export type SummarizeTopicInput = z.infer<typeof SummarizeTopicInputSchema>;

const SummarizeTopicOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the topic.'),
});
export type SummarizeTopicOutput = z.infer<typeof SummarizeTopicOutputSchema>;

export async function summarizeTopic(input: SummarizeTopicInput): Promise<SummarizeTopicOutput> {
  return summarizeTopicFlow(input);
}

const summarizeTopicPrompt = ai.definePrompt({
  name: 'summarizeTopicPrompt',
  input: {schema: SummarizeTopicInputSchema},
  output: {schema: SummarizeTopicOutputSchema},
  prompt: `You are an expert at creating concise and effective study materials. A student needs a quick revision summary of the following topic.

  Generate a summary that is well-structured, using a main title, headings, bullet points for key information, and bold text to highlight important terms. The output must be in clear, professional Markdown format, like a page from a revision guide.

  Topic: {{{topic}}}`,
});

const summarizeTopicFlow = ai.defineFlow(
  {
    name: 'summarizeTopicFlow',
    inputSchema: SummarizeTopicInputSchema,
    outputSchema: SummarizeTopicOutputSchema,
  },
  async input => {
    const {output} = await summarizeTopicPrompt(input);
    return output!;
  }
);
