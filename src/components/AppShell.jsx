import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Bot, BriefcaseBusiness, FileScan, Sparkles } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Sparkles },
  { to: '/scan', label: 'Scan', icon: FileScan },
  { to: '/make', label: 'Make', icon: BriefcaseBusiness },
  { to: '/agent', label: 'Agent', icon: Bot },
]

function AppShell({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fbff_32%,#ffffff_68%)] text-slate-900">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-[0_20px_60px_-20px_rgba(14,165,233,0.8)]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">Optima CV</p>
              <p className="text-xs text-slate-500">Premium Tech Recruiter Suite</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 p-1.5 shadow-sm md:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                    isActive ? 'bg-sky-500 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="border-t border-slate-100 px-4 py-3 md:hidden">
          <nav className="grid grid-cols-4 gap-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] transition ${
                    isActive ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-50 text-slate-600'
                  }`
                }
              >
                <Icon className="mb-1 h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="relative z-10 border-t border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-[0_20px_60px_-20px_rgba(14,165,233,0.8)]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-tight text-slate-950">Optima CV</p>
                  <p className="text-xs text-slate-500">Premium Tech Recruiter Suite</p>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
              Optima CV helps resumes look premium, readable, quantified, and role-aligned with a modern SaaS-style product experience.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-950">Pages</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
                {navItems.map(({ to, label }) => (
                  <Link key={to} to={to} className="transition hover:text-sky-600">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-950">Highlights</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
                <p>ATS scan dashboard</p>
                <p>AI bullet improvement</p>
                <p>Role-fit gap analysis</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-950">Product</p>
              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
                <p>Responsive premium UI</p>
                <p>Gemini-powered workflows</p>
                <p>Modern recruiter visuals</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>Built with React, Tailwind, framer-motion, and Gemini-ready workflows.</p>
            <p>Designed for candidates, recruiters, and premium resume storytelling.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AppShell
