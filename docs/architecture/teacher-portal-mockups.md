# Teacher Portal Mockups & Workflows

The Teacher Portal is the administrative interface where Sponsors can manage classes and monitor the AI's adherence to the pedagogical rules.

## A. Dashboard View (Landing)
```text
+---------------------------------------------------------+
| [Logo] SchoolAI Admin            [User] [Settings] [Out]|
+---------------------------------------------------------+
|                                                         |
|  [ + Create New Class ]   [ View Active Audit Logs ]    |
|                                                         |
|  Active Classes:                                        |
|  +-----------------------+   +-----------------------+  |
|  | Math 101 (Sr. Smith)  |   | History (Ms. Jones)   |  |
|  | Students: 24          |   | Students: 18          |  |
|  | AI Mode: Socratic     |   | AI Mode: Brainstorm   |  |
|  | [Manage] [View Chat]  |   | [Manage] [View Chat]  |  |
|  +-----------------------+   +-----------------------+  |
+---------------------------------------------------------+
```

## B. Live Session Monitoring (Audit View)
```text
+---------------------------------------------------------+
| < Back to Dashboard | Monitoring: Math 101              |
+---------------------------------------------------------+
| [Student List]        | [Live Chat Stream]              |
| - Alice (Active)      |                                 |
| - Bob (Idle)          | Alice: How do I solve 2x=4?     |
|                       |                                 |
| [AI Config]           | Tutor: I can't give you the     |
| Modelfile: tutor      | answer, but what happens if     |
| Temperature: 0.2      | you divide both sides by 2?     |
|                       |                                 |
| [ ] Override AI Mode  | [ ! FLAG FOR REVIEW ]           |
+---------------------------------------------------------+
```

## C. Key User Workflows defined:
1. **Class Creation**: Teacher creates a "Class", assigns a specific Modelfile (e.g., rigid math tutor vs creative writing brainstormer), and generates an invite link.
2. **Audit Logging**: All chats are logged to the PostgreSQL database. The "Audit View" allows teachers to verify that the AI is not leaking answers.
3. **Override**: If the AI gets stuck in a loop, the teacher can manually intervene in the chat stream.
