# SchoolAI Server

Offline AI Chatbot & Tutor Platform running on dedicated hardware.

## Hardware Specifications
- **CPU**: Intel Core i7-14700KF
- **GPU**: NVIDIA GeForce RTX 5070 Ti
- **RAM**: [To Be Verified]
- **Storage**:
  - Drive A: 1TB NVMe (Windows)
  - Drive B: 2TB NVMe (Ubuntu Server - This OS)

## Architecture
The system is designed as a Monorepo containing:
- **web/**: Next.js application for the user interface.
- **scripts/**: Maintenance and setup scripts.
- **models/**: Configuration files (Modelfiles) for Ollama.
- **docs/**: Project documentation.

## services
- **Ollama**: Local LLM inference server (GPU-accelerated).
- **Open WebUI**: Chat interface interacting with Ollama.
- **SchoolAI Web**: Next.js portal for student access.

## Quick Start
*(Coming Soon)*
