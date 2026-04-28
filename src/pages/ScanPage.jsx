import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FileSearch,
  FileUser,
  LoaderCircle,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  WandSparkles,
} from 'lucide-react'
import ScoreRing from '../components/ScoreRing'
import SectionHeading from '../components/SectionHeading'
import VisualCluster from '../components/VisualCluster'
import { useResume } from '../context/ResumeContext'
import { scanResumeWithGemini } from '../lib/gemini'

const DetailCard = ({ icon: Icon, title, items, tone = 'light' }) => (
  <div
    className={
      tone === 'dark'
        ? 'rounded-[28px] bg-slate-950 p-6 text-white'
        : 'rounded-[28px] border border-slate-200 bg-white p-6'
    }
  >
    <p
      className={`flex items-center gap-2 text-sm font-medium ${
        tone === 'dark' ? 'text-sky-300' : 'text-slate-500'
      }`}
    >
      <Icon className={`h-4 w-4 ${tone === 'dark' ? 'text-sky-300' : 'text-sky-500'}`} />
      {title}
    </p>
    <ul className={`mt-4 space-y-3 text-sm leading-7 ${tone === 'dark' ? 'text-slate-100' : 'text-slate-700'}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
)

function ScanPage() {
  const { fileName, resumeText, scanResult, setResumeData } = useResume()
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(scanResult)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [scanFocus, setScanFocus] = useState('Frontend Engineer')

  const fileLabel = useMemo(() => {
    if (file) return `${file.name} • ${(file.size / 1024 / 1024).toFixed(2)} MB`
    if (fileName) return fileName
    return 'PDF or image resume'
  }, [file, fileName])

  const handleScan = async (event) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setLoading(true)
    setError('')

    try {
      const data = await scanResumeWithGemini(selectedFile, scanFocus)
      setResult(data)
      setResumeData({
        fileName: selectedFile.name,
        resumeText: data.extractedText,
        scanResult: data,
      })
    } catch (scanError) {
      setResult(null)
      setError(scanError.message || 'Unable to scan the file right now. Check your Gemini API key and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="The Optimizer"
        title="Scan resumes like an expert ATS recruiter"
        description="Upload a PDF or image resume, then review ATS score, missing keywords, formatting issues, and predicted role match in a premium dashboard."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-5">
          <VisualCluster
            title="Resume intelligence preview"
            subtitle="Interactive upload visual"
            chips={['Upload', 'Preview', 'Scanner']}
            theme="sky"
            compact
          />
          <div className="rounded-[28px] border border-white bg-white/90 p-5 shadow-sm">
            <label className="text-sm font-medium text-slate-500">Optimization profile</label>
            <select
              value={scanFocus}
              onChange={(event) => setScanFocus(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
              title="Choose the recruiter lens for this scan"
            >
              <option>Frontend Engineer</option>
              <option>UI Engineer</option>
              <option>Product Manager</option>
              <option>Backend Engineer</option>
            </select>
          </div>
          <motion.label
            whileHover={{ y: -4 }}
            className="group flex min-h-[340px] cursor-pointer flex-col items-center justify-center rounded-[32px] border border-dashed border-sky-200 bg-white/90 p-8 text-center shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]"
            title={`Scan with ${scanFocus} recruiting criteria`}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-sky-100 text-sky-500">
              <FileUser className="h-9 w-9" />
            </div>
            <p className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">Drop your resume here</p>
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
              Supports PDF, PNG, JPG, or WEBP. Gemini will analyze the file as multimodal input and return structured recruiter insights.
            </p>
            <div className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white">
              {loading ? 'Scanning with Gemini...' : 'Choose resume file'}
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-400">{fileLabel}</p>
            <input
              type="file"
              accept=".pdf,image/*"
              className="hidden"
              onChange={handleScan}
            />
          </motion.label>
        </div>

        <div className="rounded-[32px] border border-white bg-white/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-sky-500">Live recruiter output</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Scan Dashboard</h3>
            </div>
            <div className="rounded-full bg-sky-50 p-3 text-sky-600">
              {loading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <ScanSearch className="h-5 w-5" />}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={loading ? 'loading' : result ? 'result' : 'empty'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8"
            >
              {!loading && !result && (
                <div className="rounded-[28px] bg-slate-950 p-6 text-slate-200">
                  <p className="text-sm leading-7">
                    Upload a file to generate a real time scan report with ATS score, job match, missing keywords, extracted resume text, and layout recommendations.
                  </p>
                </div>
              )}

              {loading && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-[28px] bg-slate-50 p-6">
                    <div className="skeleton h-44 w-full rounded-3xl" />
                  </div>
                  <div className="rounded-[28px] bg-slate-50 p-6">
                    <div className="skeleton h-44 w-full rounded-3xl" />
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="rounded-[28px] border border-sky-100 bg-sky-50 p-5"
                    >
                      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-sky-600">
                        <Target className="h-4 w-4" />
                        Role Focus
                      </p>
                      <p className="mt-4 text-xl font-semibold text-slate-950">{scanFocus}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="rounded-[28px] border border-emerald-100 bg-emerald-50 p-5"
                    >
                      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-emerald-600">
                        <Star className="h-4 w-4" />
                        Strength Count
                      </p>
                      <p className="mt-4 text-xl font-semibold text-slate-950">{result.strengths.length}</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="rounded-[28px] border border-violet-100 bg-violet-50 p-5"
                    >
                      <p className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-violet-600">
                        <WandSparkles className="h-4 w-4" />
                        Improvement Areas
                      </p>
                      <p className="mt-4 text-xl font-semibold text-slate-950">
                        {result.improvements.length + result.formattingTips.length}
                      </p>
                    </motion.div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="flex flex-col items-center gap-5 rounded-[28px] bg-slate-50 p-6">
                      <ScoreRing value={result.atsScore} label="ATS Score" />
                      <ScoreRing value={result.jobMatch} label="Job Match" />
                    </div>
                    <div className="grid gap-4">
                      <div className="rounded-[28px] bg-slate-950 p-6 text-white">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="h-5 w-5 text-sky-300" />
                          <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Missing technical keywords</p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                          {result.missingKeywords.map((keyword) => (
                            <span key={keyword} className="rounded-full bg-white/10 px-4 py-2 text-sm">
                              {keyword}
                            </span>
                          ))}
                          {result.missingKeywords.length === 0 && (
                            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">No urgent keyword gaps detected</span>
                          )}
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <DetailCard
                          icon={Sparkles}
                          title="Resume strengths"
                          items={result.strengths.length ? result.strengths : ['Gemini did not return strengths for this scan.']}
                        />
                        <DetailCard
                          icon={ShieldCheck}
                          title="Improve style and structure"
                          items={
                            [...result.improvements, ...result.formattingTips].length
                              ? [...result.improvements, ...result.formattingTips]
                              : ['Gemini did not return improvement guidance for this scan.']
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white">
                    <div className="bg-[linear-gradient(135deg,#0f172a,#0ea5e9)] p-6 text-white">
                      <p className="text-sm uppercase tracking-[0.28em] text-sky-100">Gemini final profile report</p>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-100">
                        {result.rewrittenSummary || 'No summary returned for this scan.'}
                      </p>
                    </div>
                    <div className="grid gap-4 p-6 md:grid-cols-2">
                      <div className="rounded-[24px] bg-slate-50 p-5">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Recruiter view</p>
                        <p className="mt-3 text-sm leading-7 text-slate-700">
                          This profile appears best aligned to <span className="font-semibold text-slate-950">{scanFocus}</span>, with a current match score of{' '}
                          <span className="font-semibold text-slate-950">{result.jobMatch}%</span>.
                        </p>
                      </div>
                      <div className="rounded-[24px] bg-slate-50 p-5">
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">ATS readout</p>
                        <p className="mt-3 text-sm leading-7 text-slate-700">
                          The resume currently scores <span className="font-semibold text-slate-950">{result.atsScore}/100</span> and should focus on sharper keywords, cleaner formatting, and stronger quantified impact.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-[28px] border border-slate-200 bg-white p-6">
                      <p className="flex items-center gap-2 text-sm uppercase tracking-[0.28em] text-slate-500">
                        <FileSearch className="h-4 w-4" />
                        Extracted resume text
                      </p>
                      <div className="mt-4 max-h-80 overflow-auto rounded-3xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                        {result.extractedText || resumeText || 'No extracted text returned for this upload.'}
                      </div>
                    </div>

                    <DetailCard
                      icon={Sparkles}
                      title="Recruiter action list"
                      items={[
                        `Prioritize ${scanFocus} keywords in summary and skills sections.`,
                        `Preserve the strongest ${result.strengths.length} achievement signals across experience bullets.`,
                        `Address ${result.missingKeywords.length} keyword gaps before the next application.`,
                      ]}
                      tone="dark"
                    />
                  </div>

                  <div className="rounded-[28px] border border-slate-200 bg-sky-50/70 p-6">
                    <p className="text-sm uppercase tracking-[0.28em] text-sky-700">Structured scan result</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="rounded-[24px] bg-white p-5">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Keyword coverage</p>
                        <p className="mt-3 text-sm leading-7 text-slate-700">
                          {result.missingKeywords.length === 0
                            ? 'Gemini found strong keyword coverage for the selected role.'
                            : `${result.missingKeywords.join(', ')} should be reflected naturally in the resume where accurate.`}
                        </p>
                      </div>
                      <div className="rounded-[24px] bg-white p-5">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Presentation quality</p>
                        <p className="mt-3 text-sm leading-7 text-slate-700">
                          {[...result.improvements, ...result.formattingTips].slice(0, 2).join(' ') ||
                            'Gemini did not return presentation notes for this scan.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {error && <p className="mt-4 text-sm text-rose-500">{error}</p>}
        </div>
      </div>
    </section>
  )
}

export default ScanPage
