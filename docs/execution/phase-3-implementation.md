# Phase 3: Project Portal & Database Implementation Details

This document outlines the strict execution steps and architectural decisions for building the "Tutor Chat" interface and Database layer.

## 1. Internal Database Connection Setup

The Next.js Application utilizes Prisma ORM to map TypeScript objects into PostgreSQL tables.

- The `DATABASE_URL` is configured in `packages/database/.env` and securely referenced by Next.js via standard environment injections.
- The PostgreSQL instance runs exclusively on the internal network at port 5432.

## 2. Prisma Relational Schema

We maintain a highly specialized, minimalist schema structure:

1. **`User` Table**: Stores distinct student and teacher accounts, assigning roles (`STUDENT` or `TEACHER`) to enforce strict routing permissions.
2. **`ChatSession` Table**: Links to `User` (1-to-Many). Serves as a container for individual subject-based chats (e.g., "Math Session").
3. **`Message` Table**: Links to `ChatSession` (1-to-Many). Stores all raw prompts and AI responses, creating an immutable audit trail for teachers.

## 3. Atomic Design Frontend (Tailwind CSS)

The frontend utilizes a customized Tailwind syntax optimized for 'Glassmorphism' and dark-mode aesthetics:

- **Atoms**: `Button.tsx`, `InputField.tsx`, `ChatMessage.tsx`
- **Molecules**: `MessageInputGroup.tsx`, `SidebarTopicList.tsx`
- **Organisms**: `StudentChatWindow.tsx`, `TeacherAuditPanel.tsx`
- **Templates**: Standard Layouts with deep `bg-zinc-950` backgrounds.

All API communication with the AI is streamed utilizing React Server Components from the Next.js `app/` router.
