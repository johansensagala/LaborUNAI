import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AppConfigContext } from "../../context/AppConfigContext";
import { StudentContext } from '../../context/StudentContext';
import Navbar from "../../layouts/Navbar";

const LaborJobDetailStudent = () => {
    const { student } = useContext(StudentContext);
    const { id } = useParams();
    const { backendUrl } = useContext(AppConfigContext);

    const [laborJob, setLaborJob] = useState({});
    const [application, setApplication] = useState({});
    const [hasApplied, setHasApplied] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [departmentName, setDepartmentName] = useState('');
    const [applicationStatus, setApplicationStatus] = useState('');

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
                
                if (applicationResult.status !== "ONPROGRESS") {
                    setHasSubmitted(true);

                    translateApplicationStatus(applicationResult.status);
                }
            } else {
                console.error("Student data is not available");
            }
        } catch (error) {
            console.error("Error checking student application:", error);
        }
    };

    const translateApplicationStatus = (status) => {
        const statusTranslations = {
            "NOT_SUBMITTED": "Belum Dikirim",
            "ONPROGRESS": "Sedang Berlangsung",
            "SUBMITTED": "Dikirim",
            "INTERVIEW_SCHEDULED": "Jadwal Wawancara",
            "INTERVIEWING": "Sedang Wawancara",
            "PENDING_DECISION": "Menunggu Keputusan",
            "OFFER_EXTENDED": "Tawaran Diberikan",
            "OFFER_ACCEPTED": "Tawaran Diterima",
            "OFFER_DECLINED": "Tawaran Ditolak",
            "WITHDRAWN": "Ditarik",
            "NOT_SELECTED": "Tidak Terpilih"
        };
        setApplicationStatus(statusTranslations[status] || "Status Tidak Dikenal");
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
                    {hasSubmitted && (
                        <>
                            <div className="notification is-info is-light mt-5">
                                <p>Lamaran anda sudah dikirim untuk lowongan ini</p>
                                <p>Status Lamaran: <strong>{applicationStatus}</strong></p>
                            </div>
                        </>
                    )}

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
                        <>
                            <div className="buttons is-centered mt-3">
                                <button className="button is-primary" disabled>Lamaran Terkirim</button>
                            </div>
                        </>
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
