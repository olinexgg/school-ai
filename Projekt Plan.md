# 🏫 SCHOOLAI AGENT - PROJECT PLAN

---

## 🟢 PHASE 1: CONCEPT (DONE)

- **🟢 [DONE] Product Kickoff & Requirements**
  - Interview a teacher/tutor: What are their biggest pain points?
  - Define 3 "Must-Have" features for Tutor Mode (e.g., "No homework answers, only hints")
  - Define the "Sponsors" (Parents/Teachers) and set a monthly demo schedule
  - Create PRD document
  - 🔗 *Documentation*: [Product Requirements Document (PRD)](docs/planning/PRD.md)

---

## 🟢 PHASE 2: PLANNING (DONE)

- **🟢 [DONE] Procurement & Physical Setup**
  - Receive the Captiva PC (i7-14700KF / RTX 5070 Ti)
  - Install the 2TB NVMe SSD into the second slot
  - Boot into BIOS and verify both drives are detected
  - 🔗 *Documentation*: [Infrastructure Topology](docs/architecture/infrastructure-topology.md)

- **🟢 [DONE] Network & Identity Planning**
  - Map hardware MAC address to cloud.fimp.net
  - Draft the static identity configuration for netplan
  - Verify the DNS entry propagation plan
  - 🔗 *Documentation*: [Infrastructure Topology](docs/architecture/infrastructure-topology.md)

- **🟢 [DONE] Local OS Installation**
  - Keep Drive A (1TB) for Windows
  - Flash Ubuntu Server ISO to a USB stick
  - Install Ubuntu Server on Drive B (2TB)
  - Configure GRUB to allow booting either OS
  - 🔗 *Documentation*: [Infrastructure Topology](docs/architecture/infrastructure-topology.md)

- **🟢 [DONE] Install and configure Google Antigravity Agent**
  - Review system requirements and hardware compatibility for AntigravityAgent
  - Design the network topology and firewall rules required for agent communication.
  - Define security protocols and access control lists for the antigravity management console.
  - Create a detailed configuration checklist for the deployment phase.
  - 🔗 *Documentation*: [Infrastructure Topology](docs/architecture/infrastructure-topology.md)

- **🟢 [DONE] GitOps Strategy Expansion**
  - Establish a Pull-based GitOps deployment model via Coolify
  - Set a 60-second reconciliation loop interval for state drift checks
  - Manage secrets securely via Coolify environment variables
  - Configure CI/CD pipeline with GitHub Actions (linting) and Webhook auto-deployments
  - 🔗 *Documentation*: [GitOps Strategy](docs/architecture/gitops-strategy.md)

- **🟢 [DONE] Codebase Strategy Expansion**
  - Implement a Monorepo architecture for the web portal and AI components
  - Establish a Trunk-based development branching model (`dev` -> `main`)
  - Enforce quality control using Prettier, ESLint, and Husky pre-commit hooks
  - Design scalable Frontend (React Server Components) and Backend (Controller/Service) flow
  - 🔗 *Documentation*: [Codebase Strategy](docs/architecture/codebase-strategy.md)

- **🟢 [DONE] Create Architecture Designs**
  - Select Next.js 15 (App Router) and Tailwind CSS for the Frontend portal
  - Select Node.js API Routes and PostgreSQL database for the Backend
  - Select Ollama (GPU Accelerated) and Open WebUI for the AI Inference layer
  - Define RESTful API contracts passing between Next.js, the backend, and Ollama
  - 🔗 *Documentation*: [System Design](docs/architecture/system-design.md)

- **🟢 [DONE] Mockup Teacher Portal in stitch**
  - Define the primary user roles and their key workflows within the teacher portal (e.g., managing classes, grading, communication).
  - Sketch initial layouts and wireframes for essential portal screens (dashboard, class management, student view, settings).
  - Utilize a chosen mockup tool (e.g., Figma, Sketch, or a custom "stitch" platform) to create high-fidelity visual mockups.
  - Incorporate branding guidelines and basic UI components (buttons, forms, navigation) into the mockups.
  - Conduct an internal review with stakeholders to gather initial feedback on usability and design direction.
  - 🔗 *Documentation*: [Teacher Portal Mockups](docs/architecture/teacher-portal-mockups.md)

---

## ⭕ PHASE 3: EXECUTION (TODO)

- **⭕ [TODO] Coolify Docker management**
  - Execute the Coolify installation script on Ubuntu Server.
  - Setup a Pull-based GitOps deployment pipeline connecting Coolify to the `main` GitHub branch.
  - Configure the Local Docker destination and map securely to `localhost` to avoid open public ports.
  - Inject required Environment Variables for the AI engine securely via the Coolify dashboard.

- **⭕ [TODO] Containerization & AI Engine**
  - Install proprietary NVIDIA drivers (v550+) and verify GPU availability via `nvidia-smi`.
  - Deploy **Ollama** via Coolify Docker Compose, explicitly mapping GPU access.
  - Deploy **Open WebUI** (port 8080) and connect it locally to the Ollama container via `http://ollama:11434`.
  - Deploy **PostgreSQL** database container for user data and chat audit logs.

- **⭕ [TODO] Project Portal Development**
  - Initialize the **Monorepo** structure (`apps/web`, `packages/ui`, `packages/database`).
  - Scaffold a **Next.js 15 (App Router)** frontend utilizing React Server Components for SEO and performance.
  - Integrate **Prisma** ORM in the backend Controller/Service layer to connect to the PostgreSQL database.
  - Build the interactive 'Tutor Chat' interface using the functional Atomic Design pattern and Tailwind CSS.

---

## ⭕ PHASE 4: LAUNCH (TODO)

- **⭕ [TODO] Tutor Mode Calibration**
  - Draft and test the 'No homework answers' System Prompt
  - Create a custom Ollama Modelfile for the Tutor persona
  - Perform adversarial testing to try and bypass tutor rules

- **⭕ [TODO] User Strategy & Testing**
  - Recruit 3 students for the initial test group
  - Define the Success Metric (e.g., response time < 5s)
  - Launch the Google Form for bug reporting and feedback
