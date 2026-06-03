# SchoolAI
**Olivier Nerko, 03.06.2026**

---

## Einleitung

### Ideenfindung
Angefangen hat alles mit der Idee, einen persönlichen Chatbot zu programmieren, der über mich erzählt (meine Hobbys, meine Schule und mich). Meine Projekt-Aufsicht (Frau Schwab) hat mir dann aber gesagt, dass das wegen dem Datenschutz nicht geht. Also musste ich mir eine andere Idee einfallen lassen. 
So bin ich auf die Idee gekommen, einen eigenen Chatbot namens **SchoolAI** zu bauen. Weil wir in der Schule ChatGPT wegen dem Datenschutz nicht benutzen dürfen, wollte ich einen Chatbot machen, der komplett offline auf einem Server bei uns läuft. Dazu wollte ich einen Admin-Bereich (Lehrerportal) bauen, mit dem Lehrer die KI kontrollieren können.

### Begründung zur Themenwahl
Ich habe dieses Thema gewählt, weil Datenschutz an Schulen ein riesiges Thema ist. Fast jeder benutzt heimlich ChatGPT, aber das ist eigentlich nicht erlaubt. Ich wollte zeigen, dass man eine künstliche Intelligenz auch so betreiben kann, dass keine Daten nach Amerika geschickt werden. Außerdem interessiere ich mich sehr für Computer, Server und das Programmieren und wollte lernen, wie man so etwas selbst baut.

### Motivation
Meine Motivation war ursprünglich, etwas Richtiges auf die Beine zu stellen, das man in der Schule auch wirklich benutzen kann. Ich wollte auch beweisen, dass ich einen eigenen Server aufsetzen und eine KI steuern kann. Die Arbeit am Projekt hat mir immer sehr viel Spaß gemacht, weil ich alles selbst gestalten durfte und gerne am PC tüftle. Ich hatte auch Glück, dass ich bei Fragen Unterstützung von Herrn Kamm und Frau Schwab bekommen habe.

### Ziele und Erwartungen
Mein Ziel war es, am Ende eine funktionierende Webseite zu haben, auf der Schüler mit einem KI-Tutor chatten können und Lehrer ein Dashboard haben. Ich habe erwartet, dass das System schnell antwortet und der Bot keine fertigen Hausaufgaben vorsagt (Sokratische Methode). Die Erwartung an mich selbst war einfach: mein Bestes geben, geduldig sein und nicht aufgeben, wenn der Code mal Fehler anzeigt.

### Vorgehen und Bedenken
Beim Vorgehen musste ich zuerst planen, welche Programme und Hardware ich brauche. Ich musste meinen PC umbauen und Linux installieren. Danach habe ich die Datenbank und die Webseite Schritt für Schritt programmiert. 
Am Anfang hatte ich große Bedenken, dass die Programmierung zu schwer für mich ist, weil Next.js und Docker ziemlich kompliziert klingen. Ich hatte auch Sorgen, dass die KI auf meiner Grafikkarte viel zu langsam läuft und Schüler ewig auf Antworten warten müssen.

### Dank an …
Bedanken möchte ich mich besonders bei meiner Projekt-Aufsicht Frau Schwab für die wichtigen Tipps zum Datenschutz und die Geduld. Zudem möchte ich mich bei Herrn Kamm bedanken, der mir bei den technischen Fragen und mit dem Programm-Stick sehr geholfen hat.

---

## Arbeitsprotokoll

Hier ist die lückenlose Tabelle von allen meinen Arbeitsschritten:

| Datum | Arbeitsprotokoll (Was habe ich gemacht?) | Dauer | Reflexion (Was habe ich gelernt?) |
| :--- | :--- | :--- | :--- |
| **09.01.2026** | Ich habe mir heute eine Idee für das Sozialprojekt ausgedacht (in der Schule bei Herr Kamm). Zuerst alleine, am Schluss in der Gruppe. Ich hatte zwei Ideen: Erstens ein Interview mit dem Erfinder von ChatGPT oder zweitens (realistischer) einen eigenen ChatGPT-Klon bauen. | 3 Lektionen | Ich habe zwei gute Ideen gehabt. Ich bin voll motiviert, weil ich zwei sehr gute Richtungen gefunden habe. |
| **13.01.2026** | Heute habe ich einen neuen Branch auf GitHub erstellt. Ich habe auch angefangen, alles zu planen (Codebase Strategy etc.). | 2 Stunden | Es gab super viel zum Lesen. So sieht das Projekt aus: Erst plant man alles und lernt darüber, und nachher macht man es. Ich bin zwar nicht der größte Leser, aber irgendwie habe ich es geschafft. |
| **16.01.2026** | Ich habe heute die Planung für die Idee "Chatbot über mich" fertiggestellt, damit ich das Frau Schwab vorstellen kann. | 2 Stunden | Ich hätte die Idee zuerst Frau Schwab zeigen sollen, bevor ich stundenlang plane. Sonst verliere ich unnötige Zeit, falls sie Nein sagt. |
| **23.01.2026** | Gespräch mit Frau Schwab. Wir haben besprochen, dass die Idee mit dem "Chatbot über mich" wegen dem Datenschutz nicht sicher ist. Deshalb musste ich eine neue Idee finden. | 30 Minuten | Es war gut, dass Frau Schwab sich erkundigt hat. Ich habe bemerkt, dass es datenschutzrechtlich echt ein Problem ist, wenn ich es über meine eigenen Daten mache. |
| **26.01.2026** | Frau Schwab hat heute die neue Idee für das Projekt "SchoolAI" akzeptiert. Ich freue mich mega, weil das ein Projekt ist, das ich unbedingt machen will! | 20 Minuten | Große Vorfreude und Motivation auf das genehmigte Projekt! |
| **30.01.2026** | Ich habe meinen PC auseinandergebaut und eine neue SSD-Festplatte installiert. Außerdem habe ich Ubuntu Server auf der zweiten SSD installiert, damit ich Windows und Ubuntu getrennt auf zwei Festplatten habe. | 4 Stunden | Zum Glück habe ich keine Fehler gemacht, sonst wäre das ganze System kaputtgegangen. Ich hatte erst Probleme beim Einbauen der SSD, aber nach einem YouTube-Tutorial hat es gleich geklappt. |
| **06.02.2026** | Ich habe Linux bzw. Ubuntu genutzt. Es gab aber ein Problem: Als ich die Grafikkartentreiber wechselte, ist das Internet abgestürzt. Nach einem System-Neustart ging es zum Glück wieder. | 2 Stunden | Es hat mich extrem aufgeregt, dass es erst nicht ging. Deswegen konnte ich an dem Tag nach dem Fixen nicht mehr viel weiterarbeiten. |
| **21.02.2026** | Ich war in Hamburg bei einem Squash-Turnier und konnte nicht an meinem PC arbeiten. Also habe ich auf meinem Laptop Antigravity installiert, damit ich meinen PC auch von der Ferne aus steuern kann. | 2 Stunden | Ich bin ein bisschen zu schnell an die Sache herangegangen und habe zu viele Sachen auf einmal installiert. Musste danach vieles wieder löschen – da habe ich wohl eine Stunde umsonst gearbeitet. |
| **13.03.2026** | **Phase 2 Abschluss (Architekturplanung):** Ich habe die Dokumente wie PRD, GitOps-Strategy und das System-Design aufgeschrieben, um die Systeme zu strukturieren. | 3 Stunden | Saubere Theorie ist wichtig. Es war anstrengend, die Diagramme aufzusetzen, aber dadurch wussten wir genau, welche Datenbanken (PostgreSQL) und Server (Next.js) wir bauen müssen. |
| **20.03.2026** | **Server & GitOps Deployment:** Ich habe den Code in `main` und `dev` Branches aufgeteilt, Coolify auf meinem Ubuntu Server installiert und GitHub verknüpft. | 3 Stunden | Es war richtig cool, das Server-Dashboard das erste Mal laufen zu sehen. Wir hatten erst ein Firewall-Problem (Ports waren zu), aber das haben wir im Terminal gelöst. |
| **27.03.2026** | **Frontend Codebase initialisiert:** Ich habe das Next.js 15 Monorepo aufgesetzt und Qualitäts-Checks wie Prettier, ESLint und Husky eingerichtet. | 4 Stunden | Richtig viel geschafft an einem Tag! Dass Husky unsere Codes vor jedem Git-Commit automatisch überprüft und formatiert, spart uns später super viel Chaos. |
| **04.04.2026** | **Containerization & AI Engine:** Ich habe die NVIDIA-Treiber installiert, den Server neu gestartet und Ollama (mit GPU-Zugriff) und Open WebUI zum Laufen gebracht. | 2 Stunden | Richtig spannend zu sehen, wie die tiefe Linux-Ebene mit Docker kommuniziert. Ein kleiner Port-Konflikt (8080) wurde schnell behoben. Wir haben jetzt unsere eigene, private KI! |
| **10.04.2026** | **Phase 3 Übergang (Softwareplanung):** Start der Frontend-Entwicklung. Ich habe den genauen Plan entworfen, wie wir Next.js und PostgreSQL (über Prisma) verbinden. | 1 Stunde | Bevor man wild drauf losprogrammiert, ist das Definieren von klaren Datenbank-Modellen (z.B. User, ChatLogs) absolut notwendig, um späteres Chaos zu vermeiden. |
| **12.04.2026** | **Technische Dokumentation:** Ich habe die Dokumentation geschrieben (`Phase-3-Technical-Manual.md`) und das Agenten-Konzept (`AGENTS.md`) eingerichtet, um die KI-Steuerung zu sichern. | 3 Stunden | Die Pläne zentral zu speichern, spart extrem viel Zeit. So wissen die KI und ich immer genau, welches Design und welche Regeln für welche Aufgabe gelten. |
| **03.05.2026** | **Datenbank-Sync & UI-Design:** Ich habe das Prisma-Schema aktualisiert und die Web-Oberfläche mit dem schicken Glassmorphismus-Design programmiert. | 4 Stunden | Komplexe UI-Designs mit Next.js sind echt schwer zu coden, aber das Endergebnis sieht richtig modern und professionell aus. |
| **08.05.2026** | **Session-Management & Übersetzungen:** Ich habe dafür gesorgt, dass man mehrere Chats erstellen kann, und die gesamte App auf Deutsch und Englisch übersetzt. | 3 Stunden | Die Mehrsprachigkeit macht die App perfekt für den Einsatz im echten Unterricht. |
| **10.05.2026** | **Lehrerportal & Logins:** Ich habe das Lehrer-Dashboard gebaut und das Login-System mit sicherer Passwort-Verschlüsselung (`bcrypt`) programmiert. | 5 Stunden | Sicherheit und Kontrolle für die Lehrer waren echt harte Arbeit zu programmieren, sind aber super wichtig. |
| **11.05.2026** | **KI-Kalibrierung & Abschluss:** Ich habe das sokratische Verhalten in Ollama eingestellt (über ein custom Modelfile) und alles auf Herz und Nieren getestet. | 3 Stunden | Das Projekt ist jetzt zu 100% fertig für die Präsentation morgen. |

---

## Technische Dokumentation (Code-Übersicht)

Da Frau Schwab und Herr Kamm meinen Code bewerten wollen, ist hier die Übersicht, wo meine Programmierarbeiten liegen und wie das Programm funktioniert.

### 1. Wie der Chatbot arbeitet (Pädagogisches Konzept)
SchoolAI nutzt das sokratische Lernen. Das bedeutet:
* **Keine fertigen Antworten**: Der Bot verweigert direkte Lösungen bei Hausaufgaben.
* **Gegenfragen**: Er stellt Tipps und Gegenfragen, damit Schüler selbst nachdenken.
* **Aufsatz-Bremse**: Bei Aufsätzen schreibt der Bot keinen Text, sondern zeigt nur Gliederungen und Ideen.

### 2. Ordnerstruktur (Wo liegt der Code?)
* `apps/web/src/app/api/chat/route.ts`: Hier liegt der wichtigste Code für die Webseite und die KI-Gegenfragen.
* `packages/database/prisma/schema.prisma`: Das Datenbank-Schema für Benutzerkonten, Chats und Nachrichten.
* `apps/web/src/app/teacher/page.tsx`: Der Code für das Lehrerportal (PIN-Eingabe und Audit-Sitzungen).
* `Modelfile.apertus`: Die System-Regeln für das lokale KI-Modell (Apertus).

### 3. Wie man das Programm startet
1. `docker compose up -d` (startet die Hintergrund-Container)
2. `npx prisma db push` (richtet die Datenbank-Tabellen ein)
3. `npm run dev` (startet die Webseite unter `http://localhost:3000`)

---

## Schluss

### Arbeitsprozess
Während der Arbeit an meinem Projekt ist es mir meistens gut ergangen. Ich wusste durch meine Planung fast immer, was zu tun war. Natürlich gab es auch Fehler und Rückschläge, wie zum Beispiel die Internetprobleme nach dem Grafikkartentreiber-Wechsel oder die falschen Schraubenlieferungen für die Stangenhalterung. Solche Momente waren zwar nervig, aber ich habe gelernt, dass sie zu jedem großen Projekt dazugehören.

### Verbesserungen
Wenn ich das Projekt noch einmal machen würde, würde ich die erste Idee früher mit Frau Schwab besprechen. Dadurch hätte ich mir viel Zeit bei der ersten detaillierten Planung gespart, die dann wegen dem Datenschutz nicht genutzt werden konnte.

### Ergebnis
Ich bin sehr zufrieden mit meinem Ergebnis. Ich habe eine voll funktionsfähige, offline-fähige Web-App mit KI-Tutor und Lehrerportal gebaut, die komplett auf meinem Server läuft. Darauf bin ich stolz.

### Erfahrungen
Ich habe gelernt, dass man mit genug Geduld und systematischer Planung auch scheinbar komplizierte Programmierarbeiten und Server-Setups lösen kann. Man sollte nie sofort aufgeben, wenn ein Fehlercode im Terminal steht, sondern ihn in Ruhe durchlesen und nachforschen.

### Schwierigkeiten
Die größten Schwierigkeiten waren die Installation der NVIDIA-Grafikkartentreiber unter Ubuntu Linux und das Einrichten der automatischen GitHub-Deployments über Coolify. Auch das genaue Abstimmen des sokratischen Modells (Prompt Engineering) brauchte mehrere Versuche, bis es zuverlässig funktionierte.

### Zeitplan
Mit meinem Zeitplan kam ich sehr gut voran. Ich konnte alle Meilensteine pünktlich einhalten und hatte am Ende sogar noch genug Zeit für die Kalibrierung des Modells und das Erstellen des Lehrer-Dossiers.

### Motivation
Meine Motivation war während des gesamten Projekts sehr hoch. Das Ziel, eine nützliche, sichere Lernplattform für meine Schule zu bauen und zu zeigen, dass man KIs datenschutzkonform betreiben kann, hat mich immer angetrieben.

### Erkenntnisse
Durch das Projekt habe ich gelernt, wie man einen Server administriert (Linux/Docker), Webseiten mit Next.js programmiert, Datenbanken verwaltet und wie Prompt-Engineering für lokale KIs funktioniert. Es war eine tolle und spannende Erfahrung.

---

## Eidesstattliche Erklärung

Ich erkläre, dass ich diese Arbeit selbstständig und ehrlich erstellt habe.
Ich habe Künstliche Intelligenz (KI) nur im erlaubten Rahmen genutzt.
Die Arbeit wurde nicht von der KI erstellt.
Alle Inhalte stammen von mir; verwendete Quellen sind gekennzeichnet.
Mir ist bewusst, dass falsche Angaben Konsequenzen haben können.

Ort, Datum: Uster, 03.06.2026
Unterschrift: ___________________________

---

## Abrechnung: Einnahmen und Ausgaben

Diese Abrechnung ist vollständig ausgefüllt bis am Freitag, dem 29.5.2026, Herrn Kamm abzugeben.

* **Name:** Olivier Nerko
* **Klasse:** Sekundarstufe

| Datum | Posten | Einnahmen | Ausgaben | Saldo |
| :--- | :--- | :--- | :--- | :--- |
| **26.05.2026** | Erhalt Budget von der Schule | CHF 50.00 | | CHF 50.00 |
| **30.01.2026** | Kauf neue NVMe SSD (für Server) | | CHF 45.00 | CHF 5.00 |

Ort und Datum: Uster, 03.06.2026
Unterschrift: ___________________________
