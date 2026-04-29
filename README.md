# OptimaCV - AI Resume Intelligence Web App

OptimaCV is a zero-backend, multi-page React web app designed to help users improve resumes with a premium recruiter-style experience.

It combines:
- ATS-style resume scanning
- AI bullet-point rewriting
- role-based career matching insights
- modern dashboard UI with animations and responsive design

---

## What This Web App Does

OptimaCV helps candidates move from "basic resume" to "recruiter-ready profile" using Gemini-powered workflows.

### Main user flow
1. Upload resume in `/scan`
2. Get structured AI report (ATS score, keyword gaps, strengths, improvements)
3. Edit and improve bullet points in `/make`
4. Match resume to job roles and see gap insights in `/agent`

The app stores scan output and resume text in local state/localStorage so pages can share the same working data.

---

## Pages and How They Work

## 1) Landing Page (`/`)
- Premium marketing-style homepage for OptimaCV
- Includes:
  - navbar
  - hero
  - feature sections
  - workflow section
  - visual product clusters/blobs
  - CTA sections
  - improved multi-column footer
- Purpose: explain the product and direct users to scan/editor/agent flows

## 2) Scan Page (`/scan`) - The Optimizer
- User uploads PDF or image resume
- File is converted to Base64 in-browser and sent to Gemini as multimodal input
- Gemini returns structured JSON report
- UI displays:
  - ATS score radial ring
  - job match score ring
  - missing technical keywords
  - strengths
  - improvement suggestions
  - final profile summary
  - extracted resume text
- Scan profile dropdown lets users evaluate by target role (Frontend, UI Engineer, PM, Backend)

## 3) Make Page (`/make`) - The Architect
- Resume bullets are parsed from scanned/extracted resume text
- User can edit bullets directly
- "Fix with AI" sparkle button rewrites each bullet using stronger impact language (Google X-Y-Z style instruction)
- Updated bullet text is saved back into shared resume state

## 4) Agent Page (`/agent`) - Career Agent
- User selects target roles
- Uses current resume text + selected roles to generate:
  - personalized summary
  - gap-filler recommendations
  - radar chart of skill gaps (Recharts)
- Helps users align resume narrative to specific job paths

---

## Technology Stack

### Frontend
- React 19
- React Router DOM (multi-page routing)
- Vite (build tool + dev server)

### Styling and UI
- Tailwind CSS v4
- custom premium design system (white + electric blue aesthetic)
- Lucide React icons
- Framer Motion for micro-interactions and transitions
- Recharts for radar skill visualization

### AI
- `@google/generative-ai` SDK
- Gemini model currently configured in code:
  - `gemini-2.5-flash`

### State/Data
- React Context for cross-page resume state
- localStorage persistence for user scan/session continuity

---

## Project Structure (Important Parts)

```text
src/
  components/
    AppShell.jsx          # Navbar, layout, footer
    SectionHeading.jsx    # Reusable section headings
    ScoreRing.jsx         # ATS and job match radial score
    VisualCluster.jsx     # Interactive blob/visual cards
  context/
    ResumeContext.jsx     # Shared resume + scan state
  lib/
    gemini.js             # Gemini prompts, parsing, error mapping
  pages/
    LandingPage.jsx
    ScanPage.jsx
    MakePage.jsx
    AgentPage.jsx
  App.jsx                 # Router + page mapping
```

---

## Environment Setup

Create a `.env` file in project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Notes:
- Vite reads `.env` (not `.env.example`) at startup
- After changing `.env`, restart `npm run dev`
- If key is expired/invalid, app shows readable error messages

---

## Installation and Run

```bash
npm install
npm run dev
```

### Build for production
```bash
npm run build
npm run preview
```

---

## AI Prompt Behavior (Current)

### Scan prompt goals
- Act as ATS recruiter
- Return strict JSON shape
- Score ATS + job match
- find missing keywords
- provide strengths and improvements
- extract resume text

### Make prompt goals
- Rewrite selected bullet
- stronger impact language
- quantifiable achievement tone
- professional/electric wording

### Agent prompt goals
- Match resume to selected roles
- return summary, gap fillers, and radar metrics

---

## Error Handling

`src/lib/gemini.js` maps common Gemini issues into user-friendly messages:
- missing API key
- invalid key
- expired key
- unavailable model for API version

This keeps UI errors actionable instead of showing raw API traces.

---

## Design Goals Implemented

- Premium SaaS aesthetic
- Electric blue accents with clean white surfaces
- Responsive across devices
- Subtle animation and interactive visuals
- Clear dashboard hierarchy for recruiter-style readability

---

## Current Status

The app is fully frontend-only and ready for local usage with Gemini key setup.

If needed later, this can be extended with:
- authentication
- cloud file storage
- backend analytics/report history
- export/download pipelines

