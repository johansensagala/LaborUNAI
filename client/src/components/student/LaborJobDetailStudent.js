import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { StudentContext } from '../../context/StudentContext';
import Navbar from "../../layouts/Navbar";
import { AppConfigContext } from "../../context/AppConfigContext";

const LaborJobDetailStudent = () => {
    const { student } = useContext(StudentContext);
    const { id } = useParams();
    const { backendUrl } = useContext(AppConfigContext);

    const [laborJob, setLaborJob] = useState({});
    const [application, setApplication] = useState({});
    const [hasApplied, setHasApplied] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [departmentName, setDepartmentName] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (student && student.id) {
            getLaborJob();
            checkStudentApplication();
        }
    }, [student]);    

    const checkStudentApplication = async () => {
        try {
            if (student && student.id) {
                const applicationResult = await findApplication();
                setApplication(applicationResult);
                setHasApplied(!!applicationResult._id);
                
                if (applicationResult.status === "SUBMITTED") {
                    setHasSubmitted(true);
                }
            } else {
                console.error("Student data is not available");
            }
        } catch (error) {
            console.error("Error checking student application:", error);
        }
    };

    const getLaborJob = async () => {
        try {
            const response = await axios.get(`${backendUrl}/labor-job/${id}`);
            setLaborJob(response.data);
            getDepartmentName(response.data.department);
        } catch (error) {
            console.error("Error fetching labor job data:", error);
        }
    };

    const getDepartmentName = async (departemenId) => {
        try {
            const response = await axios.get(`${backendUrl}/department/${departemenId}`);
            setDepartmentName(response.data.departmentName);
        } catch (error) {
            console.error("Error fetching department data:", error);
        }
    };

    const startApply = async () => {
        try {
            await axios.post(`${backendUrl}/application/${student.id}/${id}`);
        } catch (error) {
            console.error("Error starting application:", error);
        }
    };

    const findApplication = async () => {
        try {
            const response = await axios.get(`${backendUrl}/application/${student.id}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching application data:", error);
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
            if (!hasApplied) {
                await startApply();

                const applicationResult = await findApplication();
                setApplication(applicationResult);
            }

            navigate(`/student/labor-job/${id}/apply`, { 
                state: { 
                    laborJob: laborJob,
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

                    {hasSubmitted ? (
                        <div className="buttons is-centered mt-5">
                            <button className="button is-primary" disabled>Lamaran Terkirim</button>
                        </div>
                    ) : hasApplied ? (
                        <div className="buttons is-centered mt-5">
                            <button className="button is-primary" onClick={handleApplyProcess}>Lanjutkan lamaran</button>
                        </div>
                    ) : (
                        <div className="buttons is-centered mt-5">
                            <button className="button is-primary" onClick={handleApplyClick}>Lamar Sekarang</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LaborJobDetailStudent;