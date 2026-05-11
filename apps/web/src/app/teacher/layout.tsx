import { cookies, headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSessionUser } from '../../lib/server-auth'
import {
  readTeacherGateCookieValue,
  teacherGateConfigured,
  teacherGateDevBypass,
  verifyTeacherGate
} from '../../lib/teacher-gate'
import { lockTeacherPortal } from './actions'

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-schoolai-pathname') || '/teacher'
  const user = await getSessionUser()

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(pathname)}`)
  }
  if (user.role !== 'TEACHER') {
    redirect('/chat')
  }

  const onUnlock = pathname.startsWith('/teacher/unlock')

  if (process.env.NODE_ENV === 'production' && !teacherGateConfigured() && !teacherGateDevBypass()) {
    if (!onUnlock) {
      redirect('/teacher/unlock?reason=config')
    }
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        {children}
      </div>
    )
  }

  if (teacherGateDevBypass()) {
    return <TeacherChrome userEmail={user.email}>{children}</TeacherChrome>
  }

  if (!teacherGateConfigured()) {
    return <TeacherChrome userEmail={user.email}>{children}</TeacherChrome>
  }

  const secret = process.env.TEACHER_GATE_HMAC_SECRET
  const gate = readTeacherGateCookieValue(await cookies())

  if (!onUnlock && !verifyTeacherGate(gate, user.id, secret)) {
    redirect(`/teacher/unlock?next=${encodeURIComponent(pathname)}`)
  }

  return <TeacherChrome userEmail={user.email}>{children}</TeacherChrome>
}

function TeacherChrome({
  children,
  userEmail
}: {
  children: React.ReactNode
  userEmail: string
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-premium-blue/30">
      <nav className="border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6 min-w-0">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-lg">🏫</span>
              <span className="text-sm font-bold tracking-tight">Teacher portal</span>
            </div>
            <Link href="/teacher" className="text-sm font-medium text-zinc-400 hover:text-white">
              Overview
            </Link>
            <Link
              href="/teacher/settings"
              className="text-sm font-medium text-zinc-400 hover:text-white"
            >
              Chat protection
            </Link>
            <span className="text-xs text-zinc-600 truncate hidden md:inline max-w-[200px]" title={userEmail}>
              {userEmail}
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/chat"
              className="text-xs font-bold text-zinc-500 hover:text-white uppercase tracking-widest"
            >
              Student view
            </Link>
            <form action={lockTeacherPortal}>
              <button
                type="submit"
                className="text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-widest"
              >
                Lock portal
              </button>
            </form>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
