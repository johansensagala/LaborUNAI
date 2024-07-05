import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../layouts/Navbar';
import { Link } from 'react-router-dom';
import { DosenContext } from '../../context/DosenContext';
import axios from 'axios';

const BerandaDosen = () => {
  const { dosen } = useContext(DosenContext);
  const [departemenNames, setDepartemenNames] = useState([]);
  const [lowonganPekerjaan, setLowonganPekerjaan] = useState([]);

  useEffect(() => {
    if (dosen && dosen.id) {
      getLowonganPekerjaan(dosen.id)
    }
  }, [dosen]);
  
  const getLowonganPekerjaan = async (dosenId) => {
    try {
      console.log(dosenId)
      const response = await axios.get(`http://localhost:5000/lowongan-labor/dosen/${dosenId}`);
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

  console.log(lowonganPekerjaan)

  return (
    <>
      <Navbar />
      <div className="columns is-multiline is-centered m-6" style={{ background: '#f5f5f5', padding: '20px' }}>
        <div className="column is-full mb-6">
          <div className="is-size-4 has-text-centered has-text-weight-bold" style={{ color: '#333' }}>
            Halo { !!dosen && dosen.nama }, Selamat Datang!!!
          </div>
          <div className="is-size-5 has-text-centered has-text-weight-bold" style={{ color: '#333' }}>
            Anda dapat mengelola pekerjaan disini!!!
          </div>
        </div>
        {lowonganPekerjaan.map((lowongan, index) => (
          <div key={index} className="column is-half">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">{lowongan.posisi}</p>
              </header>
              <div className="card-content">
                <div className="content">
                  <p><strong>Gaji:</strong> {lowongan.gaji}</p>
                  <p><strong>Tanggal Posting:</strong> {lowongan.tanggalPosting}</p>
                  <p><strong>Tanggal Tenggat:</strong> {lowongan.tanggalTenggat}</p>
                  <p>{lowongan.deskripsi}</p>
                </div>
              </div>
              <footer className="card-footer">
                <Link to={`/dosen/lowongan/${lowongan._id}`} className="card-footer-item">Detail</Link>
                <Link to={`/dosen/lowongan/${lowongan._id}/edit`} className="card-footer-item">Edit</Link>
              </footer>
            </div>
          </div>
        ))}
        <div className="column is-half">
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">Buat Lowongan Pekerjaan Baru</p>
            </header>
            <footer className="card-footer">
              <Link to="/dosen/lowongan/create" className="card-footer-item">Buat Lowongan</Link>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default BerandaDosen;
