import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../layouts/Navbar";
import { AppConfigContext } from "../../context/AppConfigContext";

const LaborJobDetailLecturer = () => {
    const [laborJob, setLaborJob] = useState({});
    const { id } = useParams();
    const [departmentName, setDepartmentName] = useState('');
    const [skill, setSkill] = useState([]);
    const { backendUrl } = useContext(AppConfigContext);

    useEffect(() => {
        getLaborJob();
    }, []);
    
    const getLaborJob = async () => {
        try {
            const response = await axios.get(`${backendUrl}/labor-job/${id}`);
            setLaborJob(response.data);
    
            getDepartmentName(response.data.department);
        } catch (error) {
            console.error("Error fetching data:", error);
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

    const handleApplyClick = () => {
        Swal.fire({
            title: 'Masukkan keterampilan Anda:',
            input: 'text',
            inputPlaceholder: 'Keterampilan',
            showCancelButton: true,
            confirmButtonText: 'Kirim Lamaran',
            cancelButtonText: 'Batal',
            inputValidator: (value) => {
                if (!value) {
                    return 'Keterampilan tidak boleh kosong!'
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('Keterampilan yang dimasukkan:', result.value);
                console.log('Lamar pekerjaan');
            }
        });
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-half">
                        <div className="box p-5 m-6" style={{ background: '#f5f5f5', color: '#333' }}>
                            <div className="title is-4 has-text-weight-semibold has-text-centered">{laborJob.position}</div>
                            <div className="subtitle is-5 has-text-weight-bold has-text-centered" style={{ color: 'green' }}>
                                {departmentName}
                            </div>
                            <div className="has-text-weight-medium">Gaji: {laborJob.salary} Rp per bulan</div>
    
                            <div className="has-text-weight-medium mt-5">Tanggung Jawab</div>
                            <ul>
                                {laborJob.responsibilities && laborJob.responsibilities.map((responsibility, index) => (
                                    <li key={index}><FaCheck />{responsibility}</li>
                                ))}
                            </ul>
    
                            <div className="has-text-weight-medium mt-5">Persyaratan</div>
                            <ul>
                                {laborJob.requirements && laborJob.requirements.map((requirement, index) => (
                                    <li key={index}><FaCheck />{requirement}</li>
                                ))}
                            </ul>
    
                            <div className="buttons is-centered mt-5">
                                <button className="button is-primary mr-3" onClick={handleApplyClick}>Edit</button>
                                <button className="button is-info" onClick={handleApplyClick}>Lihat Pelamar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LaborJobDetailLecturer;
