import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../layouts/Navbar";
import axios from "axios";
import { DosenContext } from "../../context/DosenContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert';

const BuatLowonganPekerjaan = () => {
    const { dosen } = useContext(DosenContext);
    const location = useLocation();
    const navigate = useNavigate();
    
    const [posisi, setPosisi] = useState("");
    const [departemen, setDepartemen] = useState("");
    const [departemenList, setDepartemenList] = useState([]);
    const [gaji, setGaji] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tanggungJawab, setTanggungJawab] = useState([""]);
    const [persyaratan, setPersyaratan] = useState([""]);
    const [tenggat, setTenggat] = useState("");
    const [pertanyaan, setPertanyaan] = useState([]);

    useEffect(() => {
        if (location.state) {
            setPosisi(location.state.posisi);
            setDepartemen(location.state.departemen);
            setDepartemenList(location.state.departemenList);
            setGaji(location.state.gaji);
            setDeskripsi(location.state.deskripsi);
            setTanggungJawab(location.state.tanggungJawab);
            setPersyaratan(location.state.persyaratan);
            setTenggat(location.state.tenggat);
            setPertanyaan(location.state.pertanyaan);
        }
    }, [location.state]);

    useEffect(() => {
        console.log(dosen)
        if (dosen && dosen.id) {
            getDepartemenByDosen(dosen.id);
        }
    }, [dosen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(dosen.id);
        try {
            const response = await axios.post(`http://localhost:5000/lowongan-labor`, {
                posisi,
                departemenId: departemen,
                penanggungJawab: dosen.id,
                deskripsi: deskripsi,
                tanggungJawab: tanggungJawab,
                persyaratan: persyaratan,
                gaji,
                tanggalPosting: new Date(),
                tanggalTenggat: tenggat,
                perluTest: pertanyaan.length > 0,
                tersedia: true,
                pertanyaan
            });
            console.log("Lowongan berhasil disimpan:", response.data);
            Swal({
                title: "Sukses!",
                text: "Lowongan berhasil disimpan.",
                icon: "success",
            }).then(() => {
                navigate('/dosen/home');
            });
        } catch (error) {
            console.error("Error saat menyimpan lowongan:", error);
        }
    };  
        
    const handlePertanyaan = () => {
        navigate('/dosen/lowongan/create/pertanyaan', { 
            state: { 
                posisi: posisi,
                departemen: departemen,
                departemenList: departemenList,
                gaji: gaji,
                deskripsi: deskripsi,
                tanggungJawab: tanggungJawab,
                persyaratan: persyaratan,
                tenggat: tenggat,
                pertanyaan: pertanyaan,
            } 
        });
    }

    const getDepartemenByDosen = async (dosenId) => {
        try {
            const response = await axios.get(`http://localhost:5000/departemen/dosen/${dosenId}`);
            setDepartemenList(response.data);
        } catch (error) {
            console.error("Error fetching departemen data:", error);
        }
    };

    const handleTanggungJawabChange = (index, value) => {
        const newTanggungJawab = [...tanggungJawab];
        newTanggungJawab[index] = value;
        setTanggungJawab(newTanggungJawab);
    };

    const handlePersyaratanChange = (index, value) => {
        const newPersyaratan = [...persyaratan];
        newPersyaratan[index] = value;
        setPersyaratan(newPersyaratan);
    };

    const addField = (setter) => {
        setter((prev) => [...prev, ""]);
    };

    const removeField = (index, setter) => {
        setter((prev) => {
            const copy = [...prev];
            copy.splice(index, 1);
            return copy;
        });
    };

    const handleGajiChange = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/\D/g, '');
        const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setGaji(formattedValue);
    };

    const deletePertanyaan = () => {
        Swal({
            title: "Apakah Anda yakin?",
            text: "Pertanyaan yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            buttons: ["Batal", "Ya, hapus"],
            dangerMode: true,
        })
        .then((ok) => {
            if (ok) {
                setPertanyaan([]);
                Swal("Pertanyaan berhasil dihapus!", {
                    icon: "success",
                });
            }
        });
    };

    return (
        <>
            <Navbar />
            <div className="box column p-5 m-6" style={{ background: '#f5f5f5', color: '#333' }}>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Posisi</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Masukkan posisi"
                                value={posisi}
                                onChange={(e) => setPosisi(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Departemen</label>
                        <div className="control">
                            <div className="select">
                                <select
                                    value={departemen}
                                    onChange={(e) => setDepartemen(e.target.value)}
                                    required
                                >
                                    <option value="">Pilih departemen</option>
                                    {departemenList.map((dept, index) => (
                                        <option key={index} value={dept._id}>{dept.namaDepartemen}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Gaji (Rp per bulan)</label>
                        <div className="control">
                            <div className="columns is-mobile is-grouped">
                                <div className="column">
                                    <div className="field has-addons">
                                        <p className="control">
                                            <span className="button is-static">Rp</span>
                                        </p>
                                        <p className="control is-expanded">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Masukkan gaji"
                                                value={gaji}
                                                onChange={handleGajiChange}
                                                required
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Deskripsi</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                placeholder="Masukkan deskripsi"
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tanggung Jawab</label>
                        <div className="control">
                            {tanggungJawab.map((item, index) => (
                                <div key={index} className="field has-addons">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan tanggung jawab"
                                            value={item}
                                            onChange={(e) => handleTanggungJawabChange(index, e.target.value)}
                                            required
                                        />
                                    </div>
                                    {tanggungJawab.length > 1 &&
                                    <div className="control">
                                        <button type="button" className="button is-danger" onClick={() => removeField(index, setTanggungJawab)}>-</button>
                                    </div>}
                                </div>
                            ))}
                            <button type="button" className="button is-primary" onClick={() => addField(setTanggungJawab)}>+</button>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Persyaratan</label>
                        <div className="control">
                            {persyaratan.map((item, index) => (
                                <div key={index} className="field has-addons">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan persyaratan"
                                            value={item}
                                            onChange={(e) => handlePersyaratanChange(index, e.target.value)}
                                            required
                                        />
                                    </div>
                                    {persyaratan.length > 1 &&
                                    <div className="control">
                                        <button type="button" className="button is-danger" onClick={() => removeField(index, setPersyaratan)}>-</button>
                                    </div>}
                                </div>
                            ))}
                            <button type="button" className="button is-primary" onClick={() => addField(setPersyaratan)}>+</button>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tenggat Waktu</label>
                        <div className="control">
                            <input
                                className="input"
                                type="date"
                                value={tenggat}
                                onChange={(e) => setTenggat(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {pertanyaan.length === 0 && 
                        <button
                            className="button is-info my-4"
                            onClick={() => handlePertanyaan()}
                        >
                            Tambahkan Pertanyaan Seleksi
                        </button>
                    }
                    {pertanyaan.length > 0 && (
                        <div className="buttons my-4">
                            <button
                                onClick={() => handlePertanyaan()}
                                className="button is-warning"
                            >
                                Edit Pertanyaan Seleksi
                            </button>
                            <span
                                className="icon is-small has-text-danger ml-2"
                                onClick={() => deletePertanyaan()}
                                style={{ cursor: 'pointer' }}
                            >
                                <FaTrash />
                            </span>
                        </div>
                    )}

                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-primary is-pulled-right" type="submit" >Buat Lowongan</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default BuatLowonganPekerjaan;
