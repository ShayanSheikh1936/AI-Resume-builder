function ScoreRing({ value, label }) {
  const radius = 64
  const circumference = 2 * Math.PI * radius
  const progress = circumference - (Math.min(value, 100) / 100) * circumference

  return (
    <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-white shadow-[0_30px_80px_-35px_rgba(15,23,42,0.35)]">
      <svg className="-rotate-90" width="172" height="172" viewBox="0 0 172 172">
        <circle cx="86" cy="86" r={radius} stroke="#e2e8f0" strokeWidth="12" fill="none" />
        <circle
          cx="86"
          cy="86"
          r={radius}
          stroke="#0ea5e9"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-4xl font-semibold tracking-tight text-slate-950">{value}</p>
        <p className="mt-1 text-xs font-medium uppercase tracking-[0.28em] text-slate-500">{label}</p>
      </div>
    </div>
  )
}

export default ScoreRing
