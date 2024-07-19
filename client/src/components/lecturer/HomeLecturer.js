import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../../layouts/Navbar';
import { Link } from 'react-router-dom';
import { LecturerContext } from '../../context/LecturerContext';
import axios from 'axios';

const HomeLecturer = () => {
  const { lecturer } = useContext(LecturerContext);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [laborJob, setLaborJob] = useState([]);

  useEffect(() => {
    if (lecturer && lecturer.id) {
      getLaborJob(lecturer.id)
    }
  }, [lecturer]);
  
  const getLaborJob = async (lecturerId) => {
    try {
      console.log(lecturerId)
      const response = await axios.get(`http://localhost:5000/labor-job/lecturer/${lecturerId}`);
      setLaborJob(response.data);

      const departmentNamesPromises = response.data.map((laborJob) =>
        getDepartmentName(laborJob.departmentId)
      );
      const departmentNamesResults = await Promise.all(departmentNamesPromises);
      setDepartmentNames(departmentNamesResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDepartmentName = async (departmentId) => {
    try {
      const response = await axios.get(`http://localhost:5000/department/${departmentId}`);
      return response.data.departmentName;
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="columns is-multiline is-centered m-6" style={{ background: '#f5f5f5', padding: '20px' }}>
        <div className="column is-full mb-6">
          <div className="is-size-4 has-text-centered has-text-weight-bold" style={{ color: '#333' }}>
            Halo { !!lecturer && lecturer.name }, Selamat Datang!!!
          </div>
          <div className="is-size-5 has-text-centered has-text-weight-bold" style={{ color: '#333' }}>
            Anda dapat mengelola pekerjaan disini!
          </div>
        </div>
        {laborJob.map((laborJob, index) => (
          <div key={index} className="column is-half">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">{laborJob.position}</p>
              </header>
              <div className="card-content">
                <div className="content">
                  <p><strong>Gaji:</strong> {laborJob.gaji}</p>
                  <p><strong>Tanggal Posting:</strong> {laborJob.postDate}</p>
                  <p><strong>Tanggal Tenggat:</strong> {laborJob.deadline}</p>
                  <p>{laborJob.description}</p>
                </div>
              </div>
              <footer className="card-footer">
                <Link to={`/lecturer/laborJob/${laborJob._id}`} className="card-footer-item">Detail</Link>
                <Link to={`/lecturer/laborJob/${laborJob._id}/edit`} className="card-footer-item">Edit</Link>
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
              <Link to="/lecturer/labor-job/create" className="card-footer-item">Buat Lowongan</Link>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLecturer;
