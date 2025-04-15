import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewerPage from './pages/InterviewerPage';
import IntervieweePage from './pages/IntervieweePage';
import StartPage from './pages/StartPage';
import Room from './pages/Room';
import { RoleProvider } from '../context/contextState';


function App() {
  return (
    <RoleProvider>
    <Router>
      <Routes>
        <Route path="/interviewer" element={<InterviewerPage />} />
        <Route path="/interviewee" element={<IntervieweePage />} />
        <Route path='/' element={<StartPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
    </RoleProvider>
  );
}

export default App;
