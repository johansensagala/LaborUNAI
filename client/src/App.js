import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BerandaMahasiswa from './components/mahasiswa/BerandaMahasiswa';
import BerandaDosen from './components/dosen/BerandaDosen';
import DetailLowonganPekerjaan from './components/mahasiswa/DetailLowonganPekerjaan';
import DetailLowonganPekerjaanDosen from './components/dosen/DetailLowonganPekerjaanDosen';
import LoginMhs from './components/login/LoginMhs';
import LoginDosen from './components/login/LoginDosen';
import { MahasiswaContextProvider } from './context/MahasiswaContext';
import { DosenContextProvider } from './context/DosenContext';
import Profil from './components/mahasiswa/Profil';
import BuatLowonganPekerjaan from './components/dosen/BuatLowonganPekerjaan';
import BuatPertanyaan from './components/dosen/BuatPertanyaan';
import "./App.css";
import ProsesLamarMahasiswa from './components/mahasiswa/ProsesLamarMahasiswa';

const App = () => {
  return (
    <BrowserRouter>
      <MahasiswaContextProvider>
        <Routes>
          <Route path='/mhs/*'>
            <Route path='login' element={<LoginMhs />} />
            <Route path='home' element={<BerandaMahasiswa />} />
            <Route path='profil' element={<Profil />} />
            <Route path='lowongan/:id' element={<DetailLowonganPekerjaan />} />
            <Route path='lowongan/:id/lamar' element={<ProsesLamarMahasiswa />} />
          </Route>
        </Routes>
      </MahasiswaContextProvider>
      
      <DosenContextProvider>
        <Routes>
          <Route path='/dosen/*'>
            <Route path='login' element={<LoginDosen />} />
            <Route path='home' element={<BerandaDosen />} />
            <Route path='lowongan/:id' element={<DetailLowonganPekerjaanDosen />} />
            <Route path='lowongan/create' element={<BuatLowonganPekerjaan />} />
            <Route path='lowongan/create/pertanyaan' element={<BuatPertanyaan />} />
          </Route>
        </Routes>
      </DosenContextProvider>

      <Routes>
        <Route path="/" element={<Navigate to="/mhs/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
