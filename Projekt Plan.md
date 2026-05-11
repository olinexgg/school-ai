# 🏫 SCHOOLAI AGENT - PROJECT PLAN

---

### 📜 SOURCE OF TRUTH

> **MANDATORY READING FOR AI AGENTS**:
>
> 1. [Technical Manual](docs/execution/Phase-3-Technical-Manual.md) (Design Specs)http://192.168.0.119:3001/cture (`apps/web`, `packages/ui`, `packages/database`) using standard workspaces.

- **🟢 [DONE]** Scaffold a **Next.js 15 (App Router)** frontend utilizing React Server Components for SEO and performance.
- **🟢 [DONE]** Configure ESLint, Prettier, and Husky pre-commit hooks for strict quality control.
- **🟢 [DONE]** Integrate **Prisma** ORM in the backend Controller/Service layer to connect to the PostgreSQL database.
- **🟢 [DONE]** Build the functional 'Tutor Chat' logic and database persistence.
- **🟢 [DONE]** Configure the internal Database Connection (`DATABASE_URL`) from Coolify to Prisma `.env`.
- **🟢 [DONE]** Code the Prisma relational schema specifically for `User`, `ChatSession`, and `Message` tables.
- **🟢 [DONE]** Push the schema into the PostgreSQL server and create the typescript backend types.
- **🟢 [DONE]** Setup the Tailwind CSS design system (Colors, Glassmorphism, Typography). (REF: [Manual Section 3](docs/execution/Phase-3-Technical-Manual.md#3-premium-ui--design-system))
- **🟢 [DONE]** Implement the Next.js standard Landing Page (`/app/page.tsx`).
- **🟢 [DONE]** Finalize the Premium React Chat Interface UI (`/app/chat/page.tsx`).
- **🟢 [DONE]** Build the Teacher Dashboard & Audit View (`/app/teacher`).
- **🟢 [DONE]** Create Teacher Audit APIs for session monitoring.

- **🟢 [DONE] Containerization & AI Engine**
  - **🟢 [DONE]** Install proprietary NVIDIA drivers (v580-open) and verify GPU availability.
  - **🟢 [DONE]** Deploy **Ollama** via Coolify Docker Compose, explicitly mapping GPU access.
  - **🟢 [DONE]** Pull and configure the **Apertus** model as the primary tutor brain.
  - **🟢 [DONE]** Deploy **Open WebUI** (port 3000) and connect it to Ollama via `10.0.2.2`.
  - **🟢 [DONE]** Deploy **PostgreSQL** database container for user data and chat audit logs.

---

### ⚡ CODEBASE SYNC ACTION PLAN (DONE)

> **STATUS**: Logic, Database, and UI/UX are 100% complete and stabilized. Moving to Phase 4 (Calibration).

- [x] **Task 2.1: Database Physical Sync**
  - Run `npx prisma db push` to create tables.
- [x] **Task 3.1: UI Design Tokens**
  - Create `tailwind.config.ts` system with Glassmorphism tokens.
- [x] **Task 4.1: UI Component Scaffold**
  - Create the Atomic components (ChatBubbles, Sidebar).
- [x] **Task 5.1: Landing Page Overwrite**
  - Delete Next.js boilerplate and replace with our "SchoolAI" portal code.

---

---

## ⭕ PHASE 4: LAUNCH (IN PROGRESS)

- **⭕ [TODO] Tutor Mode Calibration**
  - Draft and test the 'No homework answers' System Prompt
  - Create a custom Ollama Modelfile for the Tutor persona
  - Perform adversarial testing to try and bypass tutor rules

- **⭕ [TODO] User Strategy & Testing**
  - Recruit 3 students for the initial test group
  - Define the Success Metric (e.g., response time < 5s)
  - Launch the Google Form for bug reporting and feedback
