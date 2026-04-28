import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, BrainCircuit, LayoutDashboard, ScanSearch, WandSparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'

const featureCards = [
  {
    title: 'ATS Scanner',
    text: 'Upload a resume and get a recruiter-style snapshot of ATS score, fit, weak spots, and formatting issues.',
    icon: ScanSearch,
  },
  {
    title: 'Bullet Architect',
    text: 'Polish each achievement with AI-powered rewrites that push toward cleaner, sharper measurable impact.',
    icon: WandSparkles,
  },
  {
    title: 'Career Agent',
    text: 'Match resumes to target roles and identify missing skill clusters with premium dashboard-style insights.',
    icon: BrainCircuit,
  },
]

const stats = [
  { value: '4', label: 'Premium pages' },
  { value: '2026', label: 'Role-ready trends' },
  { value: '0', label: 'Backend required' },
]

function LandingPage() {
  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm text-sky-700"
          >
            <BadgeCheck className="h-4 w-4" />
            Premium Tech Recruiter aesthetic
          </motion.div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Build a resume that feels precise, modern, and instantly hireable.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            ElevateAI is a zero-backend resume platform that scans, strengthens, and role-matches your resume with a polished SaaS-grade experience.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/scan"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3.5 text-base font-medium text-white shadow-[0_24px_60px_-20px_rgba(14,165,233,0.8)] transition hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/make"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-base font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-600"
            >
              Explore the editor
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-3xl border border-white bg-white/90 p-5 shadow-sm">
                <p className="text-3xl font-semibold tracking-tight text-slate-950">{item.value}</p>
                <p className="mt-2 text-sm text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_40px_100px_-35px_rgba(14,165,233,0.45)]"
        >
          <div className="rounded-[28px] bg-slate-950 p-6 text-white">
            <div className="flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">Recruiter View</p>
              <LayoutDashboard className="h-5 w-5 text-sky-300" />
            </div>
            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">ATS lift</p>
                <p className="mt-2 text-4xl font-semibold">+26%</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Missing skills</p>
                  <p className="mt-2 text-xl font-medium">TypeScript, A11y</p>
                </div>
                <div className="rounded-3xl bg-sky-500 p-4 text-white">
                  <p className="text-sm text-sky-100">Role match</p>
                  <p className="mt-2 text-xl font-medium">Frontend Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Platform"
          title="A complete premium workflow for resume improvement"
          description="Each page is designed like a focused product surface, with white space, clean cards, subtle motion, and recruiter-grade information density."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featureCards.map(({ title, text, icon: Icon }) => (
            <motion.div
              key={title}
              whileHover={{ y: -8 }}
              className="rounded-[28px] border border-white bg-white/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.4)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-8 rounded-[32px] border border-sky-100 bg-sky-50/70 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <SectionHeading
              eyebrow="Why ElevateAI"
              title="Built for candidates who want recruiter-level clarity"
              description="From ATS scoring to role-specific summary generation, the product keeps every decision grounded in signal, presentation quality, and premium interface polish."
            />
          </div>
          <div className="grid gap-4">
            {[
              'Responsive layouts across mobile, tablet, and desktop',
              'High-contrast controls, tooltips, toggles, and dashboard cards',
              'Gemini-ready prompts for scanning, editing, and career matchmaking',
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-white p-5 text-sm text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
