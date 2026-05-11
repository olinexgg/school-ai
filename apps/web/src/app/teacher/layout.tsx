import { headers } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PresentationTeacherBar } from '../../components/teacher/PresentationTeacherBar'
import { getSessionUser } from '../../lib/server-auth'
import {
  hasTeacherPresentationAccess,
  isPresentationPinConfigured
} from '../../lib/teacher-presentation'
import { lockTeacherPortal } from './actions'

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers()
  const pathname = headersList.get('x-schoolai-pathname') || '/teacher'
  const user = await getSessionUser()

  if (!user) {
    redirect(`/login?next=${encodeURIComponent(pathname)}`)
  }

  if (!(await hasTeacherPresentationAccess()) && isPresentationPinConfigured()) {
    redirect('/chat?teacherPin=1')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-premium-blue/30">
      <PresentationTeacherBar />
      <nav className="border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
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
            <span
              className="text-xs text-zinc-600 truncate hidden md:inline max-w-[200px]"
              title={user.email}
            >
              {user.email}
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
                Lock teacher mode
              </button>
            </form>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}
