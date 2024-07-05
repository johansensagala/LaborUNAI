import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { FaCheck } from 'react-icons/fa';
import { MahasiswaContext } from '../../context/MahasiswaContext'; 
import { useHistory } from 'react-router-dom';
import { Link  } from 'react-router-dom';

const LowonganPekerjaan = () => {
  const [lowonganPekerjaan, setLowonganPekerjaan] = useState([]);
  const [departemenNames, setDepartemenNames] = useState([]);
  const { mahasiswa } = useContext(MahasiswaContext);

  useEffect(() => {
    getLowonganPekerjaan();
  }, []);

  const getLowonganPekerjaan = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lowongan-labor");
      setLowonganPekerjaan(response.data);

      const departemenNamesPromises = response.data.map((lowongan) =>
        getDepartemenNama(lowongan.departemenId)
      );
      const departemenNamesResults = await Promise.all(departemenNamesPromises);
      setDepartemenNames(departemenNamesResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDepartemenNama = async (departemenId) => {
    try {
      const response = await axios.get(`http://localhost:5000/departemen/${departemenId}`);
      return response.data.nama_departemen;
    } catch (error) {
      console.error("Error fetching departemen data:", error);
    }
  };

  return (
    <div className="columns is-multiline is-centered m-6" style={{ background: '#f5f5f5', padding: '20px' }}>
      <div className="column is-full">
        <div className="is-size-4 has-text-centered has-text-weight-bold" style={{ color: '#333' }}>
          Halo { !!mahasiswa && mahasiswa.nama }, Temukan Pekerjaan Labor Anda!!!
        </div>
      </div>
  
      {lowonganPekerjaan.map((lowongan, index) => (
        <div key={index} className="box column is-5 p-5 m-5" style={{ background: '#f9f9f9', color: '#333' }}>
          <div className="title is-4 has-text-weight-semibold has-text-centered">{lowongan.posisi}</div>
          <div className="subtitle is-5 has-text-weight-bold has-text-centered" style={{ color: 'green' }}>
            {departemenNames[index]}
          </div>
          <div className="has-text-weight-medium">Gaji: Rp{lowongan.gaji} per bulan</div>
  
          <div className="has-text-weight-medium mt-5">Tanggung Jawab</div>
          <ul className="column">
            {lowongan.tanggungJawab.map((tugas, index) => (
              <li key={index}><FaCheck /> {tugas}</li>
            ))}
          </ul>
  
          <div className="has-text-weight-medium mt-5">Persyaratan</div>
          <ul className="column">
            {lowongan.persyaratan.map((syarat, index) => (
              <li key={index}><FaCheck /> {syarat}</li>
            ))}
          </ul>
  
          <div className="buttons is-centered mt-5">
            <Link to={`/mhs/lowongan/${lowongan._id}`} className="button is-info is-light">Detail</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LowonganPekerjaan;
