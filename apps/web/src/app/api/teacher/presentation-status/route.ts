import { hasTeacherPresentationAccess, isPresentationPinConfigured } from '../../../../lib/teacher-presentation'

export async function GET() {
  const unlocked = await hasTeacherPresentationAccess()
  return Response.json({
    unlocked,
    pinConfigured: isPresentationPinConfigured()
  })
}
