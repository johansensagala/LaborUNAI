import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../layouts/Navbar";

const DetailLowonganPekerjaanDosen = () => {
    const [lowonganPekerjaan, setLowonganPekerjaan] = useState({});
    const { id } = useParams();
    const [departemenNames, setDepartemenNames] = useState('');
    const [keterampilan, setKeterampilan] = useState([]);

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
                            <div className="title is-4 has-text-weight-semibold has-text-centered">{lowonganPekerjaan.posisi}</div>
                            <div className="subtitle is-5 has-text-weight-bold has-text-centered" style={{ color: 'green' }}>
                                {departemenNames}
                            </div>
                            <div className="has-text-weight-medium">Gaji: {lowonganPekerjaan.gaji} Rp per bulan</div>
    
                            <div className="has-text-weight-medium mt-5">Tanggung Jawab</div>
                            <ul>
                                {lowonganPekerjaan.tanggungJawab && lowonganPekerjaan.tanggungJawab.map((tugas, index) => (
                                    <li key={index}><FaCheck />{tugas}</li>
                                ))}
                            </ul>
    
                            <div className="has-text-weight-medium mt-5">Persyaratan</div>
                            <ul>
                                {lowonganPekerjaan.persyaratan && lowonganPekerjaan.persyaratan.map((tugas, index) => (
                                    <li key={index}><FaCheck />{tugas}</li>
                                ))}
                            </ul>
    
                            <div className="buttons is-centered mt-5">
                                <button className="button is-primary mr-3" onClick={handleLamarClick}>Edit</button>
                                <button className="button is-info" onClick={handleLamarClick}>Lihat Pelamar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailLowonganPekerjaanDosen;
