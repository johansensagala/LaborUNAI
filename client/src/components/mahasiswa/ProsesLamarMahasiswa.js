import Navbar from "../../layouts/Navbar";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";

const ProsesLamarMahasiswa = () => {
    const [lowonganPekerjaan, setLowonganPekerjaan] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setLowonganPekerjaan(location.state.lowonganPekerjaan);
        }
    }, [location.state]);

    const handleEdit = () => {
        console.log("test");
    }

    const handleDelete = () => {
        console.log("test");
    }

    const submitPertanyaan = () => {
        console.log("test");
    }

    return (
        <>
            <Navbar />
            <div className="columns is-centered">
                <div className="box column is-half p-5 m-6" style={{ background: '#f5f5f5', color: '#333' }}>
                    <div className="title is-4 has-text-weight-semibold has-text-centered">Pertanyaan Tes</div>
                    <div className="subtitle is-5 has-text-weight-bold has-text-centered" style={{ color: 'green' }}>
                        Pertanyaan Seleksi
                    </div>

                    <div className="box my-5 p-5">
                        {lowonganPekerjaan.pertanyaan && lowonganPekerjaan.pertanyaan.length === 0 && <p className="mb-4">Belum ada pertanyaan</p>}
                        {lowonganPekerjaan.pertanyaan && lowonganPekerjaan.pertanyaan.map((item, index) => {
                            if (item.jenisPertanyaan === "text") {
                                return (
                                    <div className="columns is-flex" key={index}>
                                        <div className="column is-three-quarters">
                                            <div className="field">
                                                <label className="label">{index + 1}. {item.inputPertanyaan}</label>
                                                <div className="control">
                                                    <input className="input" type="text" placeholder="Masukkan jawaban Anda" readOnly/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-one-quarter" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <FaEdit 
                                                onClick={() => handleEdit(index)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <FaTrash 
                                                onClick={() => handleDelete(index)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    </div>
                                );
                            } else if (item.jenisPertanyaan === "textarea") {
                                return (
                                    <div className="columns is-flex" key={index}>
                                        <div className="column is-three-quarters">
                                            <label className="label">{index + 1}. {item.inputPertanyaan}</label>
                                            <div className="control">
                                                <textarea className="textarea" placeholder="Masukkan jawaban Anda" readOnly></textarea>
                                            </div>
                                        </div>
                                        <div className="column is-one-quarter" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <FaEdit 
                                                onClick={() => handleEdit(index)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <FaTrash 
                                                onClick={() => handleDelete(index)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    </div>
                                );
                            } else if (item.jenisPertanyaan === "radio") {
                                return (
                                    <div className="columns is-flex" key={index}>
                                        <div className="column is-three-quarters">
                                            <label className="label">{index + 1}. {item.inputPertanyaan}</label>
                                            <div className="control">
                                                {item.optionPertanyaanRadio.map((option, optionIndex) => (
                                                    <React.Fragment key={optionIndex}>
                                                        <label className="radio is-inline">
                                                            <input 
                                                                type="radio" 
                                                                readOnly 
                                                                disabled
                                                            />
                                                            <span className="m-2">{option}</span>
                                                        </label><br /> 
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="column is-one-quarter" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <FaEdit 
                                                onClick={() => handleEdit(index)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <FaTrash 
                                                onClick={() => handleDelete(index)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    </div>
                                );
                            } else if (item.jenisPertanyaan === "checkbox") {
                                return (
                                    <div className="columns is-flex" key={index}>
                                        <div className="column is-three-quarters">
                                            <label className="label">{index + 1}. {item.inputPertanyaan}</label>
                                            <div className="control">
                                                {item.optionPertanyaanCheckbox.map((option, optionIndex) => (
                                                    <React.Fragment key={optionIndex}>
                                                        <label className="radio is-inline">
                                                            <input 
                                                                type="checkbox" 
                                                                readOnly 
                                                                disabled
                                                            />
                                                            <span className="m-2">{option}</span>
                                                        </label><br /> 
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="column is-one-quarter" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <FaEdit 
                                                onClick={() => handleEdit(index)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <FaTrash 
                                                onClick={() => handleDelete(index)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </div>
                                    </div>
                                );
                            }
                        })}

                        {lowonganPekerjaan.pertanyaan && lowonganPekerjaan.pertanyaan.length !== 0 &&
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-primary is-pulled-right" type="submit" onClick={() => submitPertanyaan()}>Submit Pertanyaan</button>
                            </div>
                        </div>
                        }

                    </div>

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
                        <button className="button is-primary" onClick={submitPertanyaan}>Lamar Sekarang</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProsesLamarMahasiswa;
