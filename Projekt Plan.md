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
  - Choose between Push-based or Pull-based deployment models
  - Define the reconciliation loop interval for system state checks
  - Establish secret management protocol (e.g., Sealed Secrets or Environment variables in Git)
  - Draft the CI/CD pipeline for automated testing and deployment to the local server
  - 🔗 *Documentation*: [GitOps Strategy](docs/architecture/gitops-strategy.md)

- **🟢 [DONE] Codebase Strategy Expansion**
  - Decide between Monorepo or Polyrepo structure for Frontend and AI components
  - Define the branching model (e.g., Trunk-based development vs GitFlow)
  - Establish linting and formatting standards (e.g., Prettier, ESLint)
  - Set up branch protection rules to ensure quality control
  - 🔗 *Documentation*: [Codebase Strategy](docs/architecture/codebase-strategy.md)

- **🟢 [DONE] Create Architecture Designs**
  - Identify the core components and services required for the application.
  - Design data flow diagrams and entity-relationship diagrams for database management.
  - Select the appropriate technology stack, including backend frameworks and frontend libraries.
  - Define API contracts and communication protocols between different system modules.
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
  - Execute the Coolify installation script on a fresh Linux server and perform the initial admin account setup.
  - Configure the Local Docker Engine destination and define the network bridge for container communication.
  - Deploy a sample Nginx or Hello-World application using a Docker image to verify the orchestration pipeline.
  - Set up automated cleanup tasks to remove dangling Docker images and volumes to save disk space.

- **⭕ [TODO] Containerization & AI Engine**
  - Install proprietary NVIDIA drivers and verify with nvidia-smi
  - Install Docker Engine and Docker Compose
  - Deploy Ollama with GPU support mapping
  - Deploy Open WebUI and connect to Ollama API

- **⭕ [TODO] Project Portal Development**
  - Initialize Next.js project with Tailwind CSS
  - Build the 'Vision' landing page
  - Configure routing for the AI Chat interface

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
