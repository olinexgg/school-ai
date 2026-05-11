# SchoolAI — Teacher portal guide

This document is for **teachers and school staff** who supervise the AI tutor, review student activity, and adjust **chat protection** rules for your class or school.

---

## What the teacher portal is for

SchoolAI gives students a **tutor chat** that is meant to help them learn (hints, explanations, practice) rather than replace their own work. The teacher portal helps you:

1. **See an overview** of recent chat sessions (who was active and when).
2. **Open a session** to read the conversation when you need to support a student or follow up after class.
3. **Set school-wide chat protection** (for example: no full essays, no finished homework answers, Socratic style). These rules apply to **new** tutor replies once saved.

The student app and the teacher portal are part of the **same school project**; use them together with your normal classroom and safeguarding practices.

---

## How to access the teacher portal

### 1. Sign in

Use the **school account** (email and password) your administrator created for you. Open your SchoolAI address in the browser (the URL your school shared — it may look like `https://…your-school…`).

- Go to **Login**.
- After login, you will normally land on the **student chat** view first. That is expected.

### 2. Unlock **Teacher mode** with the presentation PIN

For safety in shared rooms and demos, **teacher tools are locked** until someone enters a short **presentation PIN** on that browser.

1. On the **Chat** page, look at the **amber “Teacher mode” bar** at the top.
2. Enter the **presentation PIN** your school gave you and click **Unlock**.

**Default for pilots:** if your school has not set a custom PIN on the server, the shared demo PIN is **`4545`**. Your IT lead can change this later via server configuration; if they do, they must tell staff the new PIN.

3. When unlocked, the bar shows **Unlocked** and a button **Open dashboard** — that opens the **Teacher portal** (`/teacher`).

**Tip:** If you opened a link that ends with `?teacherPin=1`, the page will focus the PIN field so you can unlock quickly.

### 3. Lock again when you are done

On the teacher portal, use **Lock teacher mode** (or **Lock** on the bar) when you leave a shared computer or finish a demo. That clears the unlock for that browser until the PIN is entered again.

Students stay signed in with their **own** accounts; the PIN only controls **teacher-level** access on **your** session.

---

## Using the teacher dashboard

### Overview (`/teacher`)

- **Active sessions** — snapshot of sessions the system can list for audit.
- **Unique students** — rough count of different student accounts in that snapshot.
- From here you can open a **session** to read messages, or go to **Chat protection** for settings.

### Chat protection (`/teacher/settings` — “Chat protection”)

Here you turn rules on or off for how the tutor should behave. Plain-language meaning:

| Setting                          | What it does                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **No full essays**               | Reduces the chance the tutor writes a complete, submission-ready long essay for the student.                  |
| **No finished homework answers** | Encourages hints and guiding questions instead of a full worked solution the student could paste as homework. |
| **No model exam solutions**      | Avoids fully worked exam papers; still allows strategies and self-check ideas.                                |
| **Strict Socratic tone**         | Pushes the tutor toward questions and guidance rather than dumping direct answers when that fits the topic.   |

Click **Save** when you change toggles. New replies in chat should follow the updated rules.

### Student view

Use **Student view** (or go to `/chat`) to see the app **as a student** would — useful when explaining the tool in class.

---

## Internet today — offline demonstration in June

**Today:** SchoolAI is reachable **over the internet** on the address your school provides. Teachers and students can try it from home or school as long as the network allows that site.

**June (planned milestone):** Students are expected to **bring their own PCs to school** and **show that the solution works offline** (or in a school-local setup your project defines). Until that milestone is fully delivered, assume that **some features may still depend on network or school servers**; your project lead will confirm exactly what is guaranteed offline for the demo.

If you are preparing materials for June, coordinate with **IT / project lead** on the checklist (build version, local server or packaged app, and which URLs must work without the public internet).

---

## Who to ask when something fails

| Problem                                    | Who to ask                                   |
| ------------------------------------------ | -------------------------------------------- |
| Forgot login / password                    | School admin or IT                           |
| PIN not accepted / “teacher mode” blocked  | IT (PIN may have been changed on the server) |
| Page not loading, 404, or “offline” errors | IT / hosting (deployment, DNS, firewall)     |
| Pedagogy / classroom rules                 | Your lead teacher or coordinator             |

---

_Document version: aligned with SchoolAI teacher portal (presentation PIN, overview, audit, chat protection). Update the June paragraph when the offline scope is finalized._
