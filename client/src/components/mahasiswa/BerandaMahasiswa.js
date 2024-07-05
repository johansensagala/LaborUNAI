import React from 'react';
import { useContext } from 'react';
import Navbar from '../../layouts/Navbar';
import LowonganPekerjaan from './LowonganPekerjaan';
import { MahasiswaContext } from '../../context/MahasiswaContext';

const BerandaMahasiswa = () => {
  return (

    <>
      <Navbar />
      <LowonganPekerjaan />
    </>
      
  );
};
  
export default BerandaMahasiswa;