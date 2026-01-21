'use server';

/**
 * @fileOverview Provides personalized revision suggestions based on the student's study history.
 *
 * - getRevisionSuggestions - A function that suggests topics for revision based on study history.
 * - RevisionSuggestionsInput - The input type for the getRevisionSuggestions function.
 * - RevisionSuggestionsOutput - The return type for the getRevisionSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RevisionSuggestionsInputSchema = z.object({
  studyStats: z
    .string()
    .describe("A stringified JSON containing the student's study statistics, including topics studied, questions asked, and time spent per subject."),
});
export type RevisionSuggestionsInput = z.infer<typeof RevisionSuggestionsInputSchema>;

const RevisionSuggestionsOutputSchema = z.object({
  suggestedTopics: z
    .array(z.string())
    .describe('A list of topics suggested for revision based on the study history.'),
  reasoning: z
    .string()
    .describe('The AI reasoning behind the suggested topics.'),
});
export type RevisionSuggestionsOutput = z.infer<typeof RevisionSuggestionsOutputSchema>;

export async function getRevisionSuggestions(input: RevisionSuggestionsInput): Promise<RevisionSuggestionsOutput> {
  return revisionSuggestionsFlow(input);
}

const revisionSuggestionsPrompt = ai.definePrompt({
  name: 'revisionSuggestionsPrompt',
  input: {schema: RevisionSuggestionsInputSchema},
  output: {schema: RevisionSuggestionsOutputSchema},
  prompt: `You are an AI study assistant that analyzes student study history to suggest topics for revision.

Analyze the following study statistics to determine which topics the student is weakest in and needs the most revision. Provide a maximum of 3 topics.

Study Statistics: {{{studyStats}}}

Based on this information, suggest topics for revision. Also, explain the reasoning behind your suggestions in the "reasoning" field.

Output a JSON object with the suggestedTopics (array of topic strings) and reasoning fields.  The suggestedTopics should be the topics which the AI thinks are the most important for the user to review, due to the user's weak understanding.  Do not suggest more than 3 topics.`,
});

const revisionSuggestionsFlow = ai.defineFlow(
  {
    name: 'revisionSuggestionsFlow',
    inputSchema: RevisionSuggestionsInputSchema,
    outputSchema: RevisionSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await revisionSuggestionsPrompt(input);
    return output!;
  }
);
