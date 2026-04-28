import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'elevateai_resume_state'

const ResumeContext = createContext(null)

const readStoredState = () => {
  if (typeof window === 'undefined') {
    return {
      fileName: '',
      resumeText: '',
      scanResult: null,
    }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        fileName: '',
        resumeText: '',
        scanResult: null,
      }
    }

    return JSON.parse(raw)
  } catch {
    return {
      fileName: '',
      resumeText: '',
      scanResult: null,
    }
  }
}

export function ResumeProvider({ children }) {
  const [resumeState, setResumeState] = useState(readStoredState)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeState))
  }, [resumeState])

  const value = useMemo(
    () => ({
      ...resumeState,
      setResumeData: (nextState) =>
        setResumeState((current) => ({
          ...current,
          ...nextState,
        })),
      clearResumeData: () =>
        setResumeState({
          fileName: '',
          resumeText: '',
          scanResult: null,
        }),
    }),
    [resumeState],
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export const useResume = () => {
  const context = useContext(ResumeContext)

  if (!context) {
    throw new Error('useResume must be used within ResumeProvider')
  }

  return context
}
