import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeStudent from './components/student/HomeStudent';
import HomeLecturer from './components/lecturer/HomeLecturer';
import LaborJobDetailStudent from './components/student/LaborJobDetailStudent';
import LaborJobDetailLecturer from './components/lecturer/LaborJobDetailLecturer';
import LoginStudent from './components/login/LoginStudent';
import LoginLecturer from './components/login/LoginLecturer';
import { StudentContextProvider } from './context/StudentContext';
import { LecturerContextProvider } from './context/LecturerContext';
import Profile from './components/student/Profile';
import CreateLaborJob from './components/lecturer/CreateLaborJob';
import CreateQuestion from './components/lecturer/CreateQuestion';
import "./App.css";
import ApplicationProcess from './components/student/ApplicationProcess';
import { AppConfigProvider } from './context/AppConfigContext';

const App = () => {
  return (
    <AppConfigProvider>
      <BrowserRouter>
        <StudentContextProvider>
          <Routes>
            <Route path='/student/*'>
              <Route path='login' element={<LoginStudent />} />
              <Route path='' element={<HomeStudent />} />
              <Route path='profile' element={<Profile />} />
              <Route path='labor-job/:id' element={<LaborJobDetailStudent />} />
              <Route path='labor-job/:id/apply' element={<ApplicationProcess />} />
            </Route>
          </Routes>
        </StudentContextProvider>
        
        <LecturerContextProvider>
          <Routes>
            <Route path='/lecturer/*'>
              <Route path='login' element={<LoginLecturer />} />
              <Route path='' element={<HomeLecturer />} />
              <Route path='labor-job/:id' element={<LaborJobDetailLecturer />} />
              <Route path='labor-job/create' element={<CreateLaborJob />} />
              <Route path='labor-job/create/questions' element={<CreateQuestion />} />
            </Route>
          </Routes>
        </LecturerContextProvider>

        <Routes>
          <Route path="/" element={<Navigate to="/student/login" />} />
        </Routes>
      </BrowserRouter>
    </AppConfigProvider>
  );
}

export default App;
