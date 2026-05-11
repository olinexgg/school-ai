# 🏫 SchoolAI - The Socratic AI Tutor

SchoolAI is a premium educational platform designed to help students learn more effectively through AI-guided tutoring. Unlike traditional AI chatbots that simply provide answers, SchoolAI features **Apertus**, an AI persona calibrated to follow the Socratic method.

## 🚀 Key Features

- **Socratic Tutoring:** Apertus never gives direct answers, only hints and counter-questions.
- **Teacher Dashboard:** Real-time monitoring of student sessions for pedagogical quality control.
- **Multilingual Support:** Fully bilingual interface and AI response system (German/English).
- **Secure Authentication:** Email/Password login with encrypted credentials.
- **Premium UI:** Modern, high-fidelity design with glassmorphism and smooth animations.

## 🛠 Tech Stack

- **Frontend:** [Next.js 16](https://nextjs.org/) (App Router), Tailwind CSS.
- **Backend:** Node.js API Routes.
- **Database:** [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/).
- **AI Engine:** [Ollama](https://ollama.com/) running a custom-calibrated Llama3 model.
- **Infrastructure:** Docker-based deployment managed via [Coolify](https://coolify.io/).

## 📂 Project Structure (Monorepo)

```text
/
├── apps/
│   └── web/            # Next.js Frontend & API Routes
├── packages/
│   └── database/       # Prisma Schema & Database Client
├── docs/               # Technical manuals and progress reports
├── Modelfile.apertus   # AI persona calibration file
└── Projekt Plan.md     # Master project roadmap
```

## 🔄 Technical Workflow (How it works)

1. **User Interaction:** The student sends a message via the Next.js frontend.
2. **Backend Processing:** The request is handled by a Next.js API Route, which fetches the chat history from PostgreSQL.
3. **Socratic Guardrails:** The system applies the "Apertus Persona" (System Prompt) ensuring no direct answers are given.
4. **AI Inference:** The sanitized request is sent to the local **Ollama** server, which utilizes the RTX GPU for high-speed response generation.
5. **Real-time Streaming:** The AI's response is streamed back to the user word-by-word for a seamless experience.
6. **Persistent Audit:** Every interaction is saved back to the database for teacher review.

## 🛠 Tech Stack

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- Ollama (installed locally or via Docker)

### 1. Database Setup

```bash
cd packages/database
npx prisma db push
```

### 2. AI Model Calibration

```bash
# Create the specialized Apertus tutor model
ollama create apertus-tutor -f Modelfile.apertus
```

### 3. Start the Web Portal

```bash
cd apps/web
npm install
npm run dev
```

## 🛡 Security & Privacy

SchoolAI is designed with student privacy in mind. All chat sessions are logged securely and can only be accessed by authorized teachers via the Teacher Portal. Passwords are encrypted using bcrypt.

---

**Developed by olinexgg | 2026**
