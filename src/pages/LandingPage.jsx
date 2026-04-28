import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, BrainCircuit, ScanSearch, WandSparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import VisualCluster from '../components/VisualCluster'

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
  { value: '100%', label: 'Hireable Solutions' },
]

const workflowSteps = [
  {
    step: '01',
    title: 'Upload and analyze',
    text: 'Start with a CV upload and let Optima CV read layout, keywords, role fit, and ATS quality.',
  },
  {
    step: '02',
    title: 'Rewrite with impact',
    text: 'Strengthen bullet points with more measurable outcomes, cleaner phrasing, and stronger recruiter language.',
  },
  {
    step: '03',
    title: 'Match to target roles',
    text: 'Generate role-specific summaries, skill gaps, and next-step recommendations before applying.',
  },
]

const recruiterSignals = [
  'Premium white-space driven layouts that feel like modern SaaS dashboards',
  'Clear keyword coverage, missing skill clusters, and profile summaries',
  'Structured recruiter outputs for candidates, hiring teams, and portfolio reviews',
]

function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-[-120px] top-16 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-120px] top-40 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

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
          Optima CV is a powerfull Ai resume platform that scans, strengthens, and role-matches your resume to target roles with premium dashboard-style insights.
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

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <VisualCluster
            title="Premium recruiter cockpit"
            subtitle="Interactive product visual"
            chips={['Blob UI', 'Live Signals', 'Role Match']}
            theme="sky"
          />
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

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          <VisualCluster
            title="Scan, score, and refine"
            subtitle="Working image"
            chips={['Scanner', 'ATS', 'Keywords']}
            theme="violet"
            compact
          />
          <VisualCluster
            title="Write bullets with impact"
            subtitle="Editor preview"
            chips={['Editor', 'Impact', 'XYZ']}
            theme="emerald"
            compact
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <SectionHeading
          eyebrow="Workflow"
          title="A simple flow that turns a resume into a stronger application system"
          description="The product guides users from scan to rewrite to role targeting, with each step designed to feel visual, premium, and easy to understand."
          align="center"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {workflowSteps.map((item) => (
            <motion.div
              key={item.step}
              whileHover={{ y: -6 }}
              className="rounded-[28px] border border-white bg-white/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-500">{item.step}</p>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)]">
            <SectionHeading
              eyebrow="Signals"
              title="What makes the product feel recruiter-ready"
              description="Every section is designed to make resume improvement feel less generic and more like a guided premium intelligence tool."
            />
            <div className="mt-8 grid gap-4">
              {recruiterSignals.map((item) => (
                <div key={item} className="rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <VisualCluster
            title="Visual hiring intelligence"
            subtitle="Dashboard story"
            chips={['Signals', 'Insights', 'Storytelling']}
            theme="sky"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid gap-8 rounded-[32px] border border-sky-100 bg-sky-50/70 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <SectionHeading
              eyebrow="Why Optima CV"
              title="Built for candidates who want recruiter-level clarity"
              description="From ATS scoring to role-specific summary generation, the product keeps every decision grounded in signal, presentation quality, and premium interface polish."
            />
          </div>
          <div className="grid gap-4">
            {[
              'Resume scanning, editing, and career matchmaking for candidates',
              'ATS scoring and role-specific summary generation for recruiters',
              'Detailed role insights for candidates and recruiters to share with AI powered hiring teams',
            ].map((item) => (
              <div key={item} className="rounded-3xl bg-white p-5 text-sm text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(135deg,#0f172a,#0ea5e9)] p-8 text-white lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-100">Ready to your job</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Give every resume a sharper story, stronger layout, and better role fit.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100">
                Use the scan dashboard, editor, and career agent together to create a polished recruiter-facing application experience.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                to="/scan"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-medium text-slate-950 transition hover:-translate-y-0.5"
              >
                Start scanning
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/agent"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-base font-medium text-white transition hover:bg-white/20"
              >
                Explore career agent
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
