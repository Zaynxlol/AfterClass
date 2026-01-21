'use server';

/**
 * @fileOverview Generates notes from a PDF or image by extracting important points.
 *
 * - generateNotesFromPdf - A function that handles the note generation process.
 * - GenerateNotesFromPdfInput - The input type for the generateNotesFromPdf function.
 * - GenerateNotesFromPdfOutput - The return type for the generateNotesFromPdf function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateNotesFromPdfInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "A PDF or image file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateNotesFromPdfInput = z.infer<typeof GenerateNotesFromPdfInputSchema>;

const GenerateNotesFromPdfOutputSchema = z.object({
  notes: z.string().describe('Clean, formatted notes generated from the PDF or image.'),
});
export type GenerateNotesFromPdfOutput = z.infer<typeof GenerateNotesFromPdfOutputSchema>;

export async function generateNotesFromPdf(input: GenerateNotesFromPdfInput): Promise<GenerateNotesFromPdfOutput> {
  return generateNotesFromPdfFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNotesFromPdfPrompt',
  input: {schema: GenerateNotesFromPdfInputSchema},
  output: {schema: GenerateNotesFromPdfOutputSchema},
  prompt: `You are an expert note-taker, skilled at extracting the most important information from documents and structuring it professionally.

  Please analyze the provided document and generate clean, formatted notes in Markdown. The notes should summarize the key concepts using clear headings, hierarchical bullet points, and bold text for emphasis, creating a well-organized study document.

  Use the following as the source of information:
  {{media url=fileDataUri}}
  `,
});

const generateNotesFromPdfFlow = ai.defineFlow(
  {
    name: 'generateNotesFromPdfFlow',
    inputSchema: GenerateNotesFromPdfInputSchema,
    outputSchema: GenerateNotesFromPdfOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
