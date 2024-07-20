import axios from "axios";
import React, { useContext, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { StudentContext } from '../../context/StudentContext';

const LaborJob = () => {
  const [laborJob, setLaborJob] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const { student } = useContext(StudentContext);

  useEffect(() => {
    getLaborJob();
  }, []);

  const getLaborJob = async () => {
    try {
      const response = await axios.get("http://localhost:5000/labor-job");
      setLaborJob(response.data);

      const departmentNamePromises = response.data.map((laborJob) =>
        getDepartmentName(laborJob.department)
      );
      const departmentNameResults = await Promise.all(departmentNamePromises);
      setDepartmentNames(departmentNameResults);
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
    <div className="columns is-multiline is-centered m-6" style={{ background: '#f5f5f5', padding: '20px' }}>
      <div className="column is-full">
        <div className="is-size-4 has-text-centered has-text-weight-bold" style={{ color: '#333' }}>
          Halo { !!student && student.name }, Temukan Pekerjaan Labor Anda!!!
        </div>
      </div>
  
      {laborJob.map((job, index) => (
        <div key={index} className="box column is-5 p-5 m-5" style={{ background: '#f9f9f9', color: '#333' }}>
          <div className="title is-4 has-text-weight-semibold has-text-centered">{job.position}</div>
          <div className="subtitle is-5 has-text-weight-bold has-text-centered" style={{ color: 'green' }}>
            {departmentNames[index]}
          </div>
          <div className="has-text-weight-medium">Gaji: Rp{job.salary} per bulan</div>
  
          <div className="has-text-weight-medium mt-5">Tanggung Jawab</div>
          <ul className="column">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}><FaCheck /> {responsibility}</li>
            ))}
          </ul>
  
          <div className="has-text-weight-medium mt-5">Persyaratan</div>
          <ul className="column">
            {job.requirements.map((requirement, index) => (
              <li key={index}><FaCheck /> {requirement}</li>
            ))}
          </ul>
  
          <div className="buttons is-centered mt-5">
            <Link to={`/student/labor-job/${job._id}`} className="button is-info is-light">Detail</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LaborJob;
