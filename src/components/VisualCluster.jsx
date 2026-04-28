import { motion } from 'framer-motion'

const themes = {
  sky: {
    blobA: 'from-sky-400/50 to-cyan-300/20',
    blobB: 'from-blue-500/20 to-sky-200/60',
    glow: 'bg-sky-100/80',
    accent: 'bg-sky-500',
  },
  violet: {
    blobA: 'from-violet-400/45 to-fuchsia-300/20',
    blobB: 'from-indigo-500/20 to-violet-200/60',
    glow: 'bg-violet-100/80',
    accent: 'bg-violet-500',
  },
  emerald: {
    blobA: 'from-emerald-400/45 to-teal-300/20',
    blobB: 'from-cyan-500/20 to-emerald-200/60',
    glow: 'bg-emerald-100/80',
    accent: 'bg-emerald-500',
  },
}

function VisualCluster({
  title = 'Optima CV Live',
  subtitle = 'Interactive recruiter dashboard',
  chips = ['ATS', 'AI', 'Resume'],
  theme = 'sky',
  compact = false,
}) {
  const palette = themes[theme] || themes.sky

  return (
    <div className={`relative isolate overflow-hidden rounded-[32px] border border-white/70 bg-white/90 p-5 shadow-[0_40px_100px_-35px_rgba(14,165,233,0.35)] ${compact ? 'min-h-[280px]' : 'min-h-[360px]'}`}>
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -left-10 top-5 h-36 w-36 rounded-full bg-gradient-to-br ${palette.blobA} blur-2xl`}
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -right-8 bottom-4 h-44 w-44 rounded-full bg-gradient-to-br ${palette.blobB} blur-3xl`}
      />
      <div className={`absolute right-6 top-6 h-16 w-16 rounded-full ${palette.glow} blur-xl`} />

      <div className="relative z-10 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{subtitle}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{title}</h3>
          </div>
          <div className="rounded-2xl bg-slate-950/95 px-3 py-2 text-xs font-medium text-white shadow-lg">
            Live
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span key={chip} className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
              {chip}
            </span>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            whileHover={{ y: -4 }}
            className="rounded-[26px] bg-slate-950 p-5 text-white"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Recruiter snapshot</p>
              <span className={`h-2.5 w-2.5 rounded-full ${palette.accent}`} />
            </div>
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-sky-200">Confidence</p>
                <p className="mt-2 text-3xl font-semibold">92%</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-xs text-slate-300">Keywords</p>
                  <p className="mt-1 text-lg font-medium">18/24</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-xs text-slate-300">Impact</p>
                  <p className="mt-1 text-lg font-medium">Strong</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-[24px] border border-slate-200 bg-white/95 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium text-slate-600">Top ATS Matches</p>
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-300" />
                  <span className="h-2 w-2 rounded-full bg-amber-300" />
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                </div>
              </div>
              <div className="rounded-[20px] bg-[linear-gradient(135deg,#eff6ff,#ffffff_55%,#dbeafe)] p-4">
                <div className="space-y-3">
                  <div className="h-3 w-20 rounded-full bg-sky-200" />
                  <div className="h-3 w-full rounded-full bg-slate-200" />
                  <div className="h-3 w-[88%] rounded-full bg-slate-200" />
                  <div className="h-20 rounded-[18px] bg-white shadow-sm" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 4 }}
              className="rounded-[24px] border border-slate-200 bg-white/95 p-4"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Visual flow</p>
              <div className="mt-4 flex items-end gap-2">
                {[38, 60, 52, 84, 72].map((height, index) => (
                  <div
                    key={height}
                    className={`w-full rounded-t-2xl ${index === 3 ? palette.accent : 'bg-slate-200'}`}
                    style={{ height }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisualCluster
