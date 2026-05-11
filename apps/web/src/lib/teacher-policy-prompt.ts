export type TeacherPolicyFlags = {
  blockFullEssays: boolean
  blockDirectHomeworkAnswers: boolean
  blockExamSolutions: boolean
  requireSocraticStyle: boolean
}

const defaults: TeacherPolicyFlags = {
  blockFullEssays: true,
  blockDirectHomeworkAnswers: true,
  blockExamSolutions: true,
  requireSocraticStyle: true
}

export function mergePolicyWithDefaults(row: TeacherPolicyFlags | null): TeacherPolicyFlags {
  if (!row) return { ...defaults }
  return {
    blockFullEssays: row.blockFullEssays,
    blockDirectHomeworkAnswers: row.blockDirectHomeworkAnswers,
    blockExamSolutions: row.blockExamSolutions,
    requireSocraticStyle: row.requireSocraticStyle
  }
}

export function policyAppendixDe(policy: TeacherPolicyFlags): string {
  const parts: string[] = []
  if (policy.blockFullEssays) {
    parts.push(
      'Lehrkraft-Vorgabe: Du schreibst keine vollständigen Aufsätze, Essays oder abgabefertige Texte für den Schüler. Hilf nur mit Gliederung, Leitfragen und Formulierungshinweisen; der Schüler formuliert selbst.'
    )
  }
  if (policy.blockDirectHomeworkAnswers) {
    parts.push(
      'Lehrkraft-Vorgabe: Gib keine fertigen Hausaufgabenlösungen aus. Führe sokratisch weiter mit Rückfragen und kleinen Schritten.'
    )
  }
  if (policy.blockExamSolutions) {
    parts.push(
      'Lehrkraft-Vorgabe: Keine Musterlösungen oder komplett ausgearbeitete Klausuraufgaben; stattdessen Übungsstrategien und Prüfungsfragen.'
    )
  }
  if (policy.requireSocraticStyle) {
    parts.push(
      'Lehrkraft-Vorgabe: Bleib durchgehend sokratisch: Gegenfragen statt direkter Antworten, wo es passt.'
    )
  }
  if (parts.length === 0) return ''
  return '\n\nZusätzliche Schutzregeln (verbindlich):\n' + parts.map((p) => `- ${p}`).join('\n')
}

export function policyAppendixEn(policy: TeacherPolicyFlags): string {
  const parts: string[] = []
  if (policy.blockFullEssays) {
    parts.push(
      'Teacher policy: Do not write full essays or submission-ready prose for the student. Offer structure, prompts, and phrasing ideas only; the student writes their own draft.'
    )
  }
  if (policy.blockDirectHomeworkAnswers) {
    parts.push(
      'Teacher policy: Do not output finished homework answers. Stay Socratic with hints and guiding questions.'
    )
  }
  if (policy.blockExamSolutions) {
    parts.push(
      'Teacher policy: Do not provide model exam solutions or fully worked exam papers; focus on study strategies and self-check questions.'
    )
  }
  if (policy.requireSocraticStyle) {
    parts.push('Teacher policy: Prefer counter-questions over direct answers whenever appropriate.')
  }
  if (parts.length === 0) return ''
  return '\n\nAdditional guardrails (mandatory):\n' + parts.map((p) => `- ${p}`).join('\n')
}
