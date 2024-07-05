import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../layouts/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

const DetailLowonganPekerjaan = () => {
    const [lowonganPekerjaan, setLowonganPekerjaan] = useState({});
    const { id } = useParams();
    const [departemenNames, setDepartemenNames] = useState('');
    const [keterampilan, setKeterampilan] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        getLowonganPekerjaan();
    }, []);
    
    const getLowonganPekerjaan = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/lowongan-labor/${id}`);
            setLowonganPekerjaan(response.data);
    
            getDepartemenNama(response.data.departemenId);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getDepartemenNama = async (departemenId) => {
        try {
            const response = await axios.get(`http://localhost:5000/departemen/${departemenId}`);
            setDepartemenNames(response.data.nama_departemen);
        } catch (error) {
            console.error("Error fetching departemen data:", error);
        }
    };

    const handleLamarClick = () => {
        Swal.fire({
            title: 'Konfirmasi Lamaran',
            text: 'Apakah Anda yakin ingin melamar labor ini? Proses lamaran hanya diperbolehkan sekali. Setelah konfirmasi, anda tidak akan bisa melamar labor ini lagi, kecuali penanggung jawab mengizinkan.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Lanjutkan',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                handleProsesLamar();
            }
        });
    };    

    const handleProsesLamar = () => {
        navigate(`/mhs/lowongan/${id}/lamar`, { 
            state: { 
                lowonganPekerjaan: lowonganPekerjaan
            } 
        });
    };

    return (
        <>
            <Navbar />
            <div className="columns is-centered">
                <div className="box column is-half p-5 m-6" style={{ background: '#f5f5f5', color: '#333' }}>
                    <div className="title is-4 has-text-weight-semibold has-text-centered">{ lowonganPekerjaan.posisi }</div>
                    <div className="subtitle is-5 has-text-weight-bold has-text-centered" style={{ color: 'green' }}>
                        {departemenNames}
                    </div>
                    <div className="has-text-weight-medium">Gaji: { lowonganPekerjaan.gaji } Rp per bulan</div>

                    <div className="has-text-weight-medium mt-5">Tanggung Jawab</div>
                    <ul>
                        {lowonganPekerjaan.tanggungJawab && lowonganPekerjaan.tanggungJawab.map((tugas, index) => (
                            <li key={index}><FaCheck /> {tugas}</li>
                        ))}
                    </ul>

                    <div className="has-text-weight-medium mt-5">Persyaratan</div>
                    <ul>
                        {lowonganPekerjaan.persyaratan && lowonganPekerjaan.persyaratan.map((syarat, index) => (
                            <li key={index}><FaCheck /> {syarat}</li>
                        ))}
                    </ul>

                    <div className="buttons is-centered mt-5">
                        <button className="button is-primary" onClick={handleLamarClick}>Lamar Sekarang</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailLowonganPekerjaan;
