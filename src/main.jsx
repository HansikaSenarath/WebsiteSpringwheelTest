import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ResearchCenter from './Pages/ResearchCenter'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResearchCenter />
  </StrictMode>,
)
