# **App Name**: AfterClassAI

## Core Features:

- Authentication: Secure user authentication with Google and Email/Password. Redirect to dashboard after login.
- Landing Page: A modern landing page to explain the application.
- Dashboard: Main hub with modules: My Subjects, AI Study Assistant, Answer Sheet Generator, PDF & Notes Builder, Focus Mode, Progress Tracker.
- AI Study Assistant: Integrate Google Gemini API to answer questions, explain concepts, summarize topics, remember user preferences. It uses a tool that decides which mode is the most appropriate (Explain simply / Exam-focused / Quick revision).
- Answer Sheet Generator: Generate exam-style answers based on user input (question, subject, education level, marks) using AI.
- Smart Notes & PDF Builder: Create notes using AI, upload PDFs/images, extract important points, generate formatted notes, export as PDF/DOC.
- Focus Mode: Distraction-free UI with Pomodoro timer, session tracking, gentle AI reminders.
- Learning Memory System: Analyze topics studied, questions asked, time spent per subject to suggest revisions, generate study plans, improve AI responses.
- Gamification: Implement light and positive gamification using study streaks, XP points and achievement badges.
- Database: Firebase (Firestore) database structure users/ - uid/, ai_requests/, notes/.

## Style Guidelines:

- Primary color: Moderate blue (#6366F1) evokes feelings of trust, security, and intelligence. The prompt's use case and target audience suggest this color is well suited for this app.
- Background color: Very light blue (#F9FAFB), almost white, with just a touch of the primary hue to create a cohesive feel.
- Accent color: Analogous to the primary, moderate green (#22C55E) creates visual interest and aids learnability.
- Headings: 'Poppins' (sans-serif), specified by user. Note: currently only Google Fonts are supported.
- Body: 'Inter' (sans-serif), specified by user. Note: currently only Google Fonts are supported.
- Clean, minimal, student-friendly design with a mobile-first responsive approach.
- Smooth animations to improve usability.
- Student-friendly icon set for clear understanding.