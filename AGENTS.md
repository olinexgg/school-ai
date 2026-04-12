# 🤖 AGENT INSTRUCTIONS (READ FIRST)

Before starting any task or responding to the user, the AI Assistant **MUST** read and respect the current state of these "Source of Truth" documents:

## 1. Primary Progress Tracker

- **File**: `Projekt Plan.md` (Root)
- **Role**: This is the master list of DONE, IN PROGRESS, and TODO tasks. Never assume status; check this file first.

## 2. Technical Blueprint

- **File**: `docs/execution/Phase-3-Technical-Manual.md`
- **Role**: This contains the approved technical design (Architecture, Database Schemas, Security Lockdown rules). All code must follow the specs in this manual.

## 3. Communication Rules

- The user prefers **English**.
- Keep responses concise and focused on the next technical step.
- Always check the "Milestone" status before suggesting new work.
