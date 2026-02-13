# SchoolAI Learning Path

This document tracks the key technologies we use and provides a roadmap for your journey as the CTO of SchoolAI.

## 🟢 Phase 1: The Foundation (Today)

### 1. Git & GitHub (Version Control)
**What it is:** A time machine for your code. It saves "snapshots" (commits) of your project history.
- **`git add .`**: Staging files (packing the box).
- **`git commit -m "message"`**: Sealing the box with a label.
- **`git push`**: Sending the box to the cloud (GitHub).
- **`git pull`**: Downloading changes from the cloud.
- **Why we use it:** To backup code, collaborate, and revert mistakes.

### 2. Docker (Containerization)
**What it is:** A way to package an application with everything it needs to run (OS libraries, dependencies) into a single "Container".
- **`docker-compose.yml`**: A recipe card that tells Docker how to run multiple containers (like Ollama + WebUI) together.
- **Volumes**: Persistent storage. If you restart a container, the data in the volume (like downloaded AI models) survives.
- **Why we use it:** To run complex AI software without messing up your main Ubuntu system.

### 3. Generative AI (LLMs)
**What it is:** Large Language Models (like Llama 3) that predict the next word in a sequence.
- **Modelfile**: A configuration file that defines the AI's "personality" (System Prompt).
- **System Prompt**: The hidden instruction given to the AI *before* the user speaks (e.g., "You are a tutor, do not give direct answers").
- **Inference**: The actual act of the AI "thinking" and generating text.

---

## 🟡 Phase 2: The Project Portal (Next Steps)

### 1. Next.js & React (The Web Interface)
**What it is:** A framework for building modern websites.
- **Ours starts at:** `web/` directory.
- **Components**: Building blocks like `<Button />` or `<NavBar />` that you write once and reuse.
- **App Router**: How we handle different pages (e.g., `web/app/vision/page.tsx` becomes `project.com/vision`).

### 2. TypeScript
**What it is:** JavaScript with "rules" (types).
- It catches errors *before* you run the code.
- Instead of just `variable`, you say `variable: string` (it must be text).

### 3. APIs (Connecting the Brain)
**What it is:** How the Web Portal talks to the AI.
- The web app will send a message (Request) to Ollama.
- Ollama sends back the AI's answer (Response).

---

## 📚 Recommended Resources
- [Git for Beginners (Video)](https://www.youtube.com/watch?v=HWMDtwx4n18)
- [Docker in 100 Seconds](https://www.youtube.com/watch?v=Gjnup-PuquQ)
- [Next.js Official Course](https://nextjs.org/learn)
