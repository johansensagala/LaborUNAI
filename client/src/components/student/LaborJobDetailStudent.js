import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { StudentContext } from '../../context/StudentContext';
import Navbar from "../../layouts/Navbar";

const LaborJobDetailStudent = () => {
    const { student } = useContext(StudentContext);
    const [laborJob, setLaborJob] = useState({});
    const [application, setApplication] = useState({});
    const { id } = useParams();
    const [departmentName, setDepartmentName] = useState('');
    const [skill, setSkill] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getLaborJob();
    }, []);
    
    const getLaborJob = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/labor-job/${id}`);
            setLaborJob(response.data);
    
            getDepartmentName(response.data.department);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getDepartmentName = async (departemenId) => {
        try {
            const response = await axios.get(`http://localhost:5000/department/${departemenId}`);
            setDepartmentName(response.data.departmentName);
        } catch (error) {
            console.error("Error fetching department data:", error);
        }
    };

    const startApply = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/application/${student.id}/${id}`);
        } catch (error) {
            console.error("Error fetching departemen data:", error);
        }
    };

    const findApplication = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/application/${student.id}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };    

    const handleApplyClick = () => {
        Swal.fire({
            title: 'Konfirmasi Lamaran',
            text: 'Apakah Anda yakin ingin melamar labor ini? Proses application hanya diperbolehkan sekali. Setelah konfirmasi, anda tidak akan bisa melamar labor ini lagi, kecuali penanggung jawab mengizinkan.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Lanjutkan',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                handleApplyProcess();
            }
        });
    };    

    const handleApplyProcess = async () => {
        try {
            const applicationData = await startApply();
            const applicationResult = await findApplication();
            setApplication(applicationResult);

            navigate(`/student/labor-job/${id}/apply`, { 
                state: { 
                    laborJob: laborJob,
                    application: applicationResult
                } 
            });
        } catch (error) {
            console.error("Gagal memproses application:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="columns is-centered">
                <div className="box column is-half p-5 m-6" style={{ background: '#f5f5f5', color: '#333' }}>
                    <div className="title is-4 has-text-weight-semibold has-text-centered">{ laborJob.posisi }</div>
                    <div className="subtitle is-5 has-text-weight-bold has-text-centered" style={{ color: 'green' }}>
                        {departmentName}
                    </div>
                    <div className="has-text-weight-medium">Gaji: { laborJob.salary } Rp per bulan</div>

                    <div className="has-text-weight-medium mt-5">Tanggung Jawab</div>
                    <ul>
                        {laborJob.responsibilities && laborJob.responsibilities.map((responsibility, index) => (
                            <li key={index}><FaCheck /> {responsibility}</li>
                        ))}
                    </ul>

                    <div className="has-text-weight-medium mt-5">Persyaratan</div>
                    <ul>
                        {laborJob.requirements && laborJob.requirements.map((requirement, index) => (
                            <li key={index}><FaCheck /> {requirement}</li>
                        ))}
                    </ul>

                    <div className="buttons is-centered mt-5">
                        <button className="button is-primary" onClick={handleApplyClick}>Lamar Sekarang</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LaborJobDetailStudent;
