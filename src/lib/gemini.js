import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim()
const modelName = 'gemini-2.5-flash-lite'

const cleanJson = (value) =>
  value
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()

const createModel = () => {
  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  return genAI.getGenerativeModel({ model: modelName })
}

const formatGeminiError = (error) => {
  const message = error instanceof Error ? error.message : String(error)

  if (message.includes('404') || message.includes('not found for API version')) {
    return `The configured Gemini model (${modelName}) is unavailable for this API key or SDK version.`
  }

  if (message.includes('API key not valid')) {
    return 'The Gemini API key is invalid. Update VITE_GEMINI_API_KEY and restart the app.'
  }

  if (message.includes('API key expired') || message.includes('API_KEY_INVALID')) {
    return 'The Gemini API key has expired. Create a new key, update VITE_GEMINI_API_KEY in .env, and restart the app.'
  }
  if (message.includes('Failed to fetch') || message.includes('API_KEY_INVALID')) {
    return 'Your Internet Connection are not connected please connect your internet and try again'
  }
  console.log(message);
  

  return message
}

const parseJson = async (response) => {
  const text = cleanJson(response.text())
  return JSON.parse(text)
}

const normalizeScanResult = (data) => ({
  atsScore: Number(data.atsScore ?? 0),
  jobMatch: Number(data.jobMatch ?? 0),
  missingKeywords: Array.isArray(data.missingKeywords) ? data.missingKeywords : [],
  strengths: Array.isArray(data.strengths) ? data.strengths : [],
  improvements: Array.isArray(data.improvements) ? data.improvements : [],
  formattingTips: Array.isArray(data.formattingTips) ? data.formattingTips : [],
  extractedText: typeof data.extractedText === 'string' ? data.extractedText.trim() : '',
  rewrittenSummary: typeof data.rewrittenSummary === 'string' ? data.rewrittenSummary.trim() : '',
})

const normalizeRoleInsights = (data) => ({
  summary: typeof data.summary === 'string' ? data.summary.trim() : '',
  gapFiller: Array.isArray(data.gapFiller) ? data.gapFiller : [],
  radar: Array.isArray(data.radar) ? data.radar : [],
})

const fileToGenerativePart = async (file) => {
  const base64Data = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result).split(',')[1]
      resolve(result)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

  return {
    inlineData: {
      data: base64Data,
      mimeType: file.type || 'application/octet-stream',
    },
  }
}

export const scanResumeWithGemini = async (file, focusRole = 'Frontend Engineer') => {
  try {
    const model = createModel()
    const filePart = await fileToGenerativePart(file)
    const response = await model.generateContent([
      `Act as an expert ATS recruiter and resume reviewer.
Return only JSON with this exact shape:
{
  "atsScore": number,
  "jobMatch": number,
  "missingKeywords": string[],
  "strengths": string[],
  "improvements": string[],
  "formattingTips": string[],
  "extractedText": string,
  "rewrittenSummary": string
}
Assess the resume for modern technical recruiting standards, likely role fit, typography quality, alignment clarity, and missing technical keywords.
Prioritize this target role during evaluation: ${focusRole}.`,
      filePart,
    ])

    return normalizeScanResult(await parseJson(response.response))
  } catch (error) {
    throw new Error(formatGeminiError(error))
  }
}

export const improveBulletWithGemini = async (bullet) => {
  try {
    const model = createModel()
    const response = await model.generateContent(
      `Act as a professional resume writer. Rewrite this bullet point to be stronger, focusing on quantifiable impact, using the Google X-Y-Z formula. The tone should be electric and professional.

Bullet: ${bullet}

Return only the rewritten bullet.`,
    )

    return response.response.text().trim()
  } catch (error) {
    throw new Error(formatGeminiError(error))
  }
}

export const generateRoleInsights = async ({ resumeText, roles }) => {
  try {
    const model = createModel()
    const response = await model.generateContent(`
Act as a 2026 technical recruiter and career strategist.
Use the resume text and selected target roles to create a premium resume matchmaking response.
Return only JSON in this shape:
{
  "summary": string,
  "gapFiller": string[],
  "radar": [
    { "subject": string, "current": number, "target": number }
  ]
}

Selected roles: ${roles.join(', ')}
Resume text:
${resumeText}
`)

    return normalizeRoleInsights(await parseJson(response.response))
  } catch (error) {
    throw new Error(formatGeminiError(error))
  }
}
