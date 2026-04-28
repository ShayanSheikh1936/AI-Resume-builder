import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import { ResumeProvider } from './context/ResumeContext'
import AgentPage from './pages/AgentPage'
import LandingPage from './pages/LandingPage'
import MakePage from './pages/MakePage'
import ScanPage from './pages/ScanPage'

function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/make" element={<MakePage />} />
            <Route path="/agent" element={<AgentPage />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </ResumeProvider>
  )
}

export default App
