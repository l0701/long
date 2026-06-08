import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import ResourcesPage from './pages/ResourcesPage'
import QuizPage from './pages/QuizPage'
import AboutPage from './pages/AboutPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen text-dark">
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
