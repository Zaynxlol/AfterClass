"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateNotesFromFileAction, generateNotesFromTextAction } from '@/lib/actions';
import { FileUp, Loader2, Sparkles, Notebook } from 'lucide-react';

const savedNotes = [
    { id: 1, title: 'Introduction to Photosynthesis', subject: 'Biology', date: '2024-05-20', content: 'Photosynthesis is the process used by plants...' },
    { id: 2, title: 'The Causes of World War I', subject: 'History', date: '2024-05-18', content: 'The main causes of WWI were Militarism, Alliances...' }
];

export function NotesSection() {
    const [topic, setTopic] = useState('');
    const [generatedTextNote, setGeneratedTextNote] = useState('');
    const [isTextLoading, setIsTextLoading] = useState(false);
    
    const [file, setFile] = useState<File | null>(null);
    const [generatedFileNote, setGeneratedFileNote] = useState('');
    const [isFileLoading, setIsFileLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleTextGenerate = async () => {
        if (!topic) return;
        setIsTextLoading(true);
        setGeneratedTextNote('');
        try {
            const notes = await generateNotesFromTextAction(topic);
            setGeneratedTextNote(notes);
        } catch (error) {
            setGeneratedTextNote('Failed to generate notes. Please try again.');
        } finally {
            setIsTextLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const handleFileGenerate = async () => {
        if (!file) return;
        setIsFileLoading(true);
        setGeneratedFileNote('');

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const fileDataUri = reader.result as string;
            try {
                const notes = await generateNotesFromFileAction(fileDataUri);
                setGeneratedFileNote(notes);
            } catch (error) {
                setGeneratedFileNote('Failed to generate notes from file. Please try again.');
            } finally {
                setIsFileLoading(false);
            }
        };
        reader.onerror = () => {
             setGeneratedFileNote('Failed to read the file.');
             setIsFileLoading(false);
        }
    };

    return (
        <Tabs defaultValue="my-notes">
            <TabsList>
                <TabsTrigger value="my-notes">My Notes</TabsTrigger>
                <TabsTrigger value="generate-text">Generate from Topic</TabsTrigger>
                <TabsTrigger value="generate-file">Generate from File</TabsTrigger>
            </TabsList>
            <TabsContent value="my-notes">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Your Saved Notes</CardTitle>
                        <CardDescription>Browse and manage your study materials.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {savedNotes.map(note => (
                             <div key={note.id} className="border p-4 rounded-lg hover:bg-muted/50">
                                <h3 className="font-semibold">{note.title}</h3>
                                <p className="text-sm text-muted-foreground">{note.subject} - {note.date}</p>
                                <p className="text-sm mt-2 truncate">{note.content}</p>
                             </div>
                        ))}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="generate-text">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Generate Notes from Topic</CardTitle>
                            <CardDescription>Enter a topic and let AI create summary notes for you.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Textarea placeholder="e.g., The Krebs Cycle" value={topic} onChange={e => setTopic(e.target.value)} />
                            <Button onClick={handleTextGenerate} disabled={isTextLoading} className="w-full">
                                {isTextLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                Generate
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Generated Notes</CardTitle>
                        </CardHeader>
                        <CardContent className="min-h-[200px]">
                            {isTextLoading ? <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : 
                            <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">{generatedTextNote || 'Your generated notes will appear here.'}</div>}
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
            <TabsContent value="generate-file">
                 <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Generate Notes from File</CardTitle>
                            <CardDescription>Upload a PDF or image to extract key points.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FileUp className="w-10 h-10 mb-3 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground">{fileName || 'Click to upload or drag and drop'}</p>
                                    <p className="text-xs text-muted-foreground">PDF or Image file</p>
                                </div>
                                <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="application/pdf,image/*" />
                            </label>
                            <Button onClick={handleFileGenerate} disabled={isFileLoading || !file} className="w-full">
                                {isFileLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                                Generate from File
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                            <CardTitle className="font-headline">Extracted Notes</CardTitle>
                        </CardHeader>
                        <CardContent className="min-h-[200px]">
                            {isFileLoading ? <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div> : 
                            <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">{generatedFileNote || 'Notes from your file will appear here.'}</div>}
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    );
}
