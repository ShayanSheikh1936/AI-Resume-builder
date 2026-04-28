import { useEffect, useMemo, useState } from 'react'
import { LoaderCircle, Sparkles } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { useResume } from '../context/ResumeContext'
import { improveBulletWithGemini } from '../lib/gemini'

const extractBullets = (resumeText) =>
  resumeText
    .split(/\n|•|-/)
    .map((item) => item.trim())
    .filter((item) => item.length > 20)
    .slice(0, 6)

function MakePage() {
  const { resumeText, setResumeData } = useResume()
  const parsedBullets = useMemo(() => extractBullets(resumeText), [resumeText])
  const [bullets, setBullets] = useState(parsedBullets)
  const [loadingIndex, setLoadingIndex] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setBullets(parsedBullets)
  }, [parsedBullets])

  const updateBullet = (index, value) => {
    setBullets((current) => current.map((bullet, itemIndex) => (itemIndex === index ? value : bullet)))
  }

  const handleImprove = async (index) => {
    setLoadingIndex(index)
    setError('')

    try {
      const improved = await improveBulletWithGemini(bullets[index])
      const nextBullets = bullets.map((bullet, itemIndex) => (itemIndex === index ? improved : bullet))
      setBullets(nextBullets)
      setResumeData({
        resumeText: nextBullets.join('\n'),
      })
    } catch (improveError) {
      setError(improveError.message || 'Unable to improve this bullet right now.')
    } finally {
      setLoadingIndex(null)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="The Architect"
        title="Craft a cleaner, sharper resume with AI-assisted bullet writing"
        description="Edit your resume on a minimalist paper-like canvas and strengthen each bullet point with a floating sparkle action powered by Gemini."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative overflow-hidden rounded-[36px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)] sm:p-10">
          <div className="pointer-events-none absolute inset-y-0 left-8 hidden w-px bg-sky-100 sm:block" />
          <div className="mx-auto max-w-3xl space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Resume canvas</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Experience Highlights</h3>
            </div>

            {bullets.length === 0 && (
              <div className="rounded-[28px] border border-dashed border-sky-200 bg-sky-50 px-5 py-6 text-sm leading-7 text-slate-600">
                Scan a resume first on `/scan` so Gemini can extract your real resume content and load bullet points here.
              </div>
            )}

            {bullets.map((bullet, index) => (
              <div key={index} className="group relative rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-5 shadow-sm">
                <textarea
                  value={bullet}
                  onChange={(event) => updateBullet(index, event.target.value)}
                  className="min-h-28 w-full resize-none border-0 bg-transparent pr-14 text-base leading-8 text-slate-700 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleImprove(index)}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg transition hover:scale-105"
                  title="Fix with AI"
                >
                  {loadingIndex === index ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </button>
              </div>
            ))}

            {error && <p className="text-sm text-rose-500">{error}</p>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] bg-slate-950 p-6 text-white shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
            <p className="text-sm uppercase tracking-[0.28em] text-sky-300">AI guidance</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">Google X-Y-Z formula</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Frame each bullet around what you achieved, how you did it, and the measurable result. The sparkle button rewrites each line toward stronger quantified impact.
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6">
            <p className="text-sm font-medium text-slate-500">Premium resume checklist</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              <li>Keep bullets outcome-first and under two lines where possible.</li>
              <li>Use numerals for metrics and scope whenever available.</li>
              <li>Balance typography, spacing, and alignment across every section.</li>
              <li>Replace weak verbs with built, shipped, optimized, led, or improved.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MakePage
