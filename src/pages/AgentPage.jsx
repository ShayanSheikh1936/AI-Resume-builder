import { useState } from 'react'
import { LoaderCircle, WandSparkles } from 'lucide-react'
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import SectionHeading from '../components/SectionHeading'
import VisualCluster from '../components/VisualCluster'
import { useResume } from '../context/ResumeContext'
import { generateRoleInsights } from '../lib/gemini'

const roles = ['Frontend Engineer', 'Backend Engineer', 'Product Manager', 'UI Engineer']

function AgentPage() {
  const [selectedRoles, setSelectedRoles] = useState(['UI Engineer'])
  const { resumeText, setResumeData } = useResume()
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleRole = (role) => {
    setSelectedRoles((current) =>
      current.includes(role) ? current.filter((item) => item !== role) : [...current, role],
    )
  }

  const handleGenerate = async () => {
    if (!resumeText.trim()) {
      setError('Scan a resume first, or paste resume text here before generating a Gemini role report.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await generateRoleInsights({ resumeText, roles: selectedRoles })
      setInsights(result)
    } catch (generateError) {
      setError(generateError.message || 'Unable to generate the Gemini role report right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="The Career Agent"
        title={`Match your resume against target roles and expose ${new Date().getFullYear()} skill gaps`}
        description="Choose your desired path, connect it to resume text, and generate a personalized summary, missing-skill roadmap, and radar chart for high-priority growth areas."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 rounded-[32px] border border-white bg-white/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)]">
          <VisualCluster
            title="Career mapping preview"
            subtitle="Role-fit visual"
            chips={['Radar', 'Target', 'Agent']}
            theme="emerald"
            compact
          />
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-500">Role selector</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {roles.map((role) => {
                const active = selectedRoles.includes(role)
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      active ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {role}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-500">Main resume text</label>
            <textarea
              value={resumeText}
              onChange={(event) => setResumeData({ resumeText: event.target.value })}
              className="mt-3 min-h-56 w-full rounded-[28px] border border-slate-200 bg-slate-50 p-5 text-sm leading-7 text-slate-700 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white"
          >
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <WandSparkles className="h-4 w-4" />}
            Generate Gap-Filler
          </button>

          {error && <p className="text-sm text-rose-500">{error}</p>}
        </div>

        <div className="grid gap-6">
          <div className="rounded-[32px] bg-slate-950 p-6 text-white shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)] ">
            <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Personalized summary</p>
            <p className="mt-4 text-lg leading-8 text-slate-100">
              {insights?.summary || 'Generate a Gemini role report to see your tailored summary here.'}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 ">
            <div className="rounded-[32px] border border-slate-200 bg-white p-6 block-fit">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Gap-Filler</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                {(insights?.gapFiller || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {!insights?.gapFiller?.length && (
                <p className="mt-4 text-sm text-slate-500">No report yet. Generate one from your scanned or pasted resume.</p>
              )}
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 block-fit ">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Skill gap radar</p>
              <div className="mt-4 h-64"> {/* h-64 */}
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={insights?.radar || []}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#475569' }} />
                    <Radar dataKey="current" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.45} />
                    <Radar dataKey="target" stroke="#020617" fill="#020617" fillOpacity={0.12} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AgentPage
