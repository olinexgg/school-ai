# SchoolAI – Mein lokaler KI-Tutor fürs Klassenzimmer

**Abschlussprojekt im Fach Informatik / Sozialprojekt**

- **Name:** Olivier Nerko
- **Projekt:** SchoolAI (Ein Chatbot, der beim Lernen hilft)
- **Klasse / Schule:** Sekundarstufe (15 Jahre alt)

---

## 1. Meine Idee und Motivation (Einleitung)

Meine erste Idee für das Abschlussprojekt war eigentlich ein Chatbot, der Fragen über mich beantworten kann (also über meine Hobbys, meine Schule und meine Person). Meine Projekt-Aufsicht (Frau Schwab) hat mir dann aber gesagt, dass das wegen dem Datenschutz ein großes Problem ist, weil meine privaten Daten geschützt sein müssen.

Das hat mich aber erst recht motiviert! Weil wir in der Schule ChatGPT und andere Online-KIs wegen dem Datenschutz nicht benutzen dürfen, habe ich mir eine neue Idee überlegt: Einen eigenen Chatbot namens **SchoolAI**, der komplett **offline** auf einem Computer bei uns in der Schule läuft. So werden keine Schülerdaten nach Amerika oder ins Internet geschickt.

Außerdem wollte ich unbedingt einen Admin-Bereich (ein Lehrerportal) einbauen. Damit können die Lehrer sehen, was die Schüler schreiben, und den Chatbot kontrollieren. Ich habe mich während des Projekts immer voll an meinen Plan gehalten und alles geschafft.

---

## 2. Wie der Chatbot hilft (Pädagogisches Konzept)

Normale Chatbots wie ChatGPT sind in der Schule oft ein Problem, weil Schüler sich einfach die fertigen Hausaufgaben generieren lassen. Dadurch lernt man natürlich nichts.

**SchoolAI löst das durch den sokratischen Tutor-Modus („Apertus“):**

- **Keine fertigen Lösungen:** Der Bot gibt niemals die direkte Antwort auf eine Matheaufgabe oder eine fertige Lösung.
- **Gegenfragen stellen:** Er verhält sich wie ein Nachhilfelehrer und stellt Fragen, die dem Schüler helfen, den Weg zur Lösung selbst zu finden.
- **Keine fertigen Aufsätze:** Wenn man ihn bittet, einen Aufsatz zu schreiben, gibt er nur eine Gliederung oder Ideen vor. Den Text muss der Schüler selbst schreiben.

### Der Ablauf im Chatbot sieht so aus:

```mermaid
flowchart TD
    Start([Schüler schreibt Nachricht]) --> Frage{Ist es eine direkte\nHausaufgabenfrage?}

    Frage -- Ja --> Verweigern[Antwort verweigern]
    Frage -- Nein --> Aufsatz{Soll ein ganzer Aufsatz\ngeschrieben werden?}

    Verweigern --> Tipp[Tipp oder Gegenfrage geben]
    Tipp --> Ende([Auf Antwort des Schülers warten])

    Aufsatz -- Ja --> Struktur[Nur Struktur/Ideen zeigen]
    Struktur --> Ende

    Aufsatz -- Nein --> Erklaeren[Konzept erklären und Fragen stellen]
    Erklaeren --> Ende
```

---

## 3. Die Technik dahinter

Damit alles offline läuft und sicher ist, habe ich den Server selbst aufgesetzt und abgesichert.

### 3.1 Das System

Die Software ist in drei einfache Stufen aufgeteilt:

1. **Coolify Dashboard:** Das ist die grafische Oberfläche auf dem Server. Hier lade ich den Code direkt von GitHub hoch und steuere die Programme.
2. **Docker:** Docker packt die Programme in sichere, getrennte „Container“, damit sie sich nicht gegenseitig stören.
3. **SchoolAI Programme:** Das sind Next.js (die Webseite), PostgreSQL (die Datenbank) und Ollama (die künstliche Intelligenz).

### 3.2 Sicherheit (Lockdown)

Damit niemand die Datenbank oder die KI von außen hacken kann, habe ich alle Zugänge gesperrt. Sie laufen nur intern auf der Adresse `127.0.0.1` (Localhost) und sind nicht im normalen Internet sichtbar. Schüler kommen nur über die offizielle Web-Oberfläche rein.

---

## 4. Software und Datenbank

- **Webseite (Frontend):** Programmiert mit **Next.js 15** und **React**. Für das Design habe ich **Tailwind CSS** benutzt und ein cooles „Glassmorphism“-Design gebaut (dunkler Hintergrund mit lila und blauen Leuchteffekten).
- **Datenbank:** Eine **PostgreSQL** Datenbank. Über **Prisma** (ein Tool für Datenbanken) speichere ich die Benutzerkonten der Schüler, die Chatverläufe und die Einstellungen der Lehrer.
- **KI-Modell:** **Ollama** läuft lokal auf meiner Grafikkarte. Das Modell heißt **Apertus-Tutor** (basiert auf Llama 3) und ist so eingestellt, dass es sehr schlau und ruhig antwortet (Temperatur `0.3`).

---

## 5. Das Lehrerportal

Für die Lehrer gibt es oben auf der Webseite eine gelbe Leiste. Dort gibt man eine PIN ein (standardmäßig `4545`), damit Schüler im Klassenzimmer nicht einfach die Einstellungen ändern können.

**Im Lehrerportal kann die Lehrkraft:**

1. **Chats mitlesen (Audit):** Alle geschriebenen Unterhaltungen ansehen, um zu kontrollieren, ob Schüler die KI richtig nutzen.
2. **Regeln einstellen:** Per Knopfdruck festlegen, ob der Bot Aufsätze blockieren, fertige Hausaufgaben verbieten oder stur nur mit Gegenfragen (Sokratisch) antworten soll. Die Einstellungen werden sofort aktiv!

---

## 6. Mein Arbeitsprotokoll

Hier ist die Tabelle, was ich in den letzten Monaten für das Projekt gemacht habe:

| Datum          | Was habe ich gemacht?                                                                    | Dauer   | Was habe ich gelernt?                                                  |
| :------------- | :--------------------------------------------------------------------------------------- | :------ | :--------------------------------------------------------------------- |
| **09.01.2026** | Erste Projektideen gesammelt. Entweder ChatGPT-Gründer interviewen oder eigene KI bauen. | 2 Std.  | Eigene Ideen machen viel mehr Spaß.                                    |
| **13.01.2026** | GitHub Branch erstellt und die Code-Struktur geplant.                                    | 2 Std.  | Planung ist anstrengend, hilft aber sehr gegen Chaos.                  |
| **16.01.2026** | Konzept für „Chatbot über mich“ geschrieben für die Schulleitung.                        | 2 Std.  | Ich hätte früher fragen sollen, bevor ich alles plane.                 |
| **23.01.2026** | Gespräch mit Frau Schwab. Idee wurde wegen Datenschutz abgelehnt.                        | 30 Min. | Datenschutz an Schulen ist echt streng und super wichtig.              |
| **26.01.2026** | Neue Idee „SchoolAI“ (lokaler Tutor) wurde von Frau Schwab erlaubt.                      | 20 Min. | Ich war super erleichtert und motiviert!                               |
| **30.01.2026** | PC umgebaut: Neue NVMe SSD eingebaut und Ubuntu Server installiert.                      | 4 Std.  | Der Einbau war knifflig, aber mit YouTube-Tutorials lief alles.        |
| **06.02.2026** | Ubuntu Grafikkartentreiber installiert. Internet war kurz weg, ging nach Reboot wieder.  | 2 Std.  | Linux kann manchmal echt nerven, aber man lernt viel.                  |
| **21.02.2026** | Google Antigravity eingerichtet, um den PC von unterwegs zu steuern.                     | 2 Std.  | Nicht alles auf einmal installieren, sondern Schritt für Schritt.      |
| **13.03.2026** | Konzepte fertiggeschrieben (PRD, System Design und Diagramme).                           | 3 Std.  | Pläne helfen, damit man beim Coden genau weiß, was man tun muss.       |
| **20.03.2026** | Coolify auf Ubuntu installiert und GitHub verknüpft für automatische Builds.             | 3 Std.  | Coolify ist genial. Firewall-Probleme habe ich im Terminal gelöst.     |
| **27.03.2026** | Next.js 15 Projekt aufgesetzt und Code-Checks eingerichtet.                              | 4 Std.  | Qualitäts-Checks sparen später beim Coden viel Ärger.                  |
| **04.04.2026** | NVIDIA-Treiber geladen, Ollama gestartet und KI über GPU laufen lassen.                  | 2 Std.  | Es ist voll cool zu sehen, wie die eigene Grafikkarte die KI antreibt. |
| **10.04.2026** | Datenbank-Schema mit Prisma entworfen für Chats und Logins.                              | 1 Std.  | Das Schema muss fehlerfrei sein, bevor man programmiert.               |
| **12.04.2026** | Technische Dokumentation geschrieben und Agenten-Kontext gesichert.                      | 3 Std.  | Aufschreiben hilft, um den Überblick nicht zu verlieren.               |
| **03.05.2026** | DB-Sync gemacht, Chat-Design mit coolen Leuchteffekten programmiert.                     | 4 Std.  | React-Codes sind schwer, aber das Design sieht mega aus!               |
| **08.05.2026** | Sitzungs-Auswahl und Übersetzung (Deutsch/Englisch) programmiert.                        | 3 Std.  | Übersetzungen machen die App fit für alle Klassenstufen.               |
| **10.05.2026** | Lehrer-Dashboard fertiggestellt und Passwörter mit `bcrypt` verschlüsselt.               | 5 Std.  | Sicherheit ist Pflicht, wenn man echte Nutzer hat.                     |
| **11.05.2026** | KI-Modell eingestellt und Dokumenten-Dossier fertiggestellt.                             | 3 Std.  | Die App ist jetzt zu 100% fertig für die Präsentation.                 |

---

## 7. Mein Fazit und Ausblick

### 7.1 Was ich gelernt habe

Das Projekt war eine riesige Erfahrung für mich. Ich habe gelernt, wie man einen echten Server einrichtet, Hardware einbaut (meine neue SSD) und echte Webseiten programmiert.
Besonders stolz bin ich darauf, wie ich die künstliche Intelligenz (Ollama) so einstellen konnte, dass sie nicht einfach vorsagt, sondern Schülern wirklich hilft.
Ich weiß jetzt viel besser, wie Linux funktioniert und wie man Datenbanken nutzt.

### 7.2 Was als Nächstes kommt (Juni 2026)

Die App läuft stabil und ist komplett fertig. Im Juni wollen wir:

1. **Offline testen:** Wir wollen testen, ob Schüler mit ihren eigenen Laptops im Schulnetzwerk ohne normales Internet mit dem Bot chatten können.
2. **Feedback sammeln:** Ein paar Mitschüler werden die App testen und mir sagen, ob der Tutor schlau antwortet und schnell genug ist.

SchoolAI zeigt, dass man KIs in der Schule sicher und ohne Angst vor Datenschutzproblemen einsetzen kann, um wirklich etwas zu lernen!
