// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewerPage from './pages/InterviewerPage';
import IntervieweePage from './pages/IntervieweePage';
import StartPage from './pages/StartPage';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/interviewer" element={<InterviewerPage />} />
        <Route path="/interviewee" element={<IntervieweePage />} />
        <Route path='/' element={<StartPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
