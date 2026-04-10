# Phase 3: Project Portal & Database Implementation Details

This document outlines the strict execution steps and architectural decisions for building the "Tutor Chat" interface and Database layer, including the already completed infrastructure foundations.

## 1. Infrastructure Foundation [DONE]

The system is optimized for high-performance local AI inference on an **RTX 5070 Ti**.

- **GPU Acceleration**: Proprietary NVIDIA Drivers (v550+) and `nvidia-container-toolkit` are installed.
- **AI Engine**: **Ollama** is running with full GPU passthrough.
- **Interface**: **Open WebUI** is active on port `3000` for admin testing.

## 2. Database Architecture [DONE]

A private **PostgreSQL** instance is running in the Coolify stack to manage user state and audit logs.

- **Internal Host**: `schoolai-postgres:5432`
- **ORM**: Prisma utilizes a `DATABASE_URL` stored in `packages/database/.env`.
- **Relational Schema**:
  - **`User`**: Distinct accounts for Students and Teachers.
  - **`ChatSession`**: Groups a single conversation together.
  - **`Message`**: Individual messages (Prompts & AI Responses) saved for "Audit Logging".

## 3. Frontend Implementation [IN PROGRESS]

The application is built using **Next.js 15** with a focus on premium aesthetics and performance.

### Design System

- **Framework**: Tailwind CSS.
- **Architecture**: Atomic Design Pattern.
- **Aesthetics**: Dark-mode focused, Glassmorphism, and custom animations.

### Component Structure

- **Atoms**: `Button.tsx`, `InputField.tsx`, `ChatMessage.tsx`
- **Molecules**: `MessageInputGroup.tsx`, `SidebarTopicList.tsx`
- **Organisms**: `StudentChatWindow.tsx`, `TeacherAuditPanel.tsx`
- **Templates**: Standard Layouts with deep `bg-zinc-950` backgrounds.

## 4. Workflows

1. **AI Inference**: Frontend -> Next.js API Routes -> Ollama (Local Network).
2. **Persistence**: Every message is automatically mirrored to the PostgreSQL `Message` table.
3. **Role Enforcement**: Teachers have exclusive access to the `TeacherAuditPanel`.
