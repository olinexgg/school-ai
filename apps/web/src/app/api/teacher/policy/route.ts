import { db } from 'database'
import { requireTeacherPresentationMode } from '../../../../lib/teacher-presentation'
import type { TeacherPolicyFlags } from '../../../../lib/teacher-policy-prompt'

const keys: (keyof TeacherPolicyFlags)[] = [
  'blockFullEssays',
  'blockDirectHomeworkAnswers',
  'blockExamSolutions',
  'requireSocraticStyle'
]

export async function GET() {
  const gate = await requireTeacherPresentationMode()
  if (!gate.ok) {
    return Response.json({ error: gate.error, code: gate.code }, { status: gate.status })
  }

  let row = await db.teacherPolicy.findUnique({ where: { id: 'global' } })
  if (!row) {
    row = await db.teacherPolicy.create({
      data: {
        id: 'global',
        blockFullEssays: true,
        blockDirectHomeworkAnswers: true,
        blockExamSolutions: true,
        requireSocraticStyle: true
      }
    })
  }

  return Response.json({
    blockFullEssays: row.blockFullEssays,
    blockDirectHomeworkAnswers: row.blockDirectHomeworkAnswers,
    blockExamSolutions: row.blockExamSolutions,
    requireSocraticStyle: row.requireSocraticStyle
  })
}

export async function PATCH(req: Request) {
  const gate = await requireTeacherPresentationMode()
  if (!gate.ok) {
    return Response.json({ error: gate.error, code: gate.code }, { status: gate.status })
  }

  const body = (await req.json()) as Partial<Record<keyof TeacherPolicyFlags, unknown>>
  const patch: Partial<TeacherPolicyFlags> = {}
  for (const k of keys) {
    if (typeof body[k] === 'boolean') {
      patch[k] = body[k] as boolean
    }
  }

  const row = await db.teacherPolicy.upsert({
    where: { id: 'global' },
    create: {
      id: 'global',
      blockFullEssays: patch.blockFullEssays ?? true,
      blockDirectHomeworkAnswers: patch.blockDirectHomeworkAnswers ?? true,
      blockExamSolutions: patch.blockExamSolutions ?? true,
      requireSocraticStyle: patch.requireSocraticStyle ?? true,
      updatedByUserId: gate.user.id
    },
    update: {
      ...patch,
      updatedByUserId: gate.user.id
    }
  })

  return Response.json({
    blockFullEssays: row.blockFullEssays,
    blockDirectHomeworkAnswers: row.blockDirectHomeworkAnswers,
    blockExamSolutions: row.blockExamSolutions,
    requireSocraticStyle: row.requireSocraticStyle
  })
}
