import Navbar from "../../layouts/Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pertanyaan from "./Pertanyaan";
import PertanyaanUmum from "./PertanyaanUmum";

const ProsesLamarMahasiswa = () => {
    const [lowonganPekerjaan, setLowonganPekerjaan] = useState({});
    const [lamaran, setLamaran] = useState({});
    const [activeLayout, setActiveLayout] = useState('CATATAN_SINGKAT');
    const navigate = useNavigate();
    const location = useLocation();

    const layouts = ['CATATAN_SINGKAT', 'UPLOAD_CV', 'PERTANYAAN_UMUM', 'PERTANYAAN'];

    useEffect(() => {
        if (location.state) {
            setLowonganPekerjaan(location.state.lowonganPekerjaan);
            setLamaran(location.state.lamaran);
            moveToLayout(0);
        }
    }, [location.state]);

    const submitPertanyaan = () => {
        console.log("Submit pertanyaan");
    }

    const moveToLayout = (layout) => {
        switch (layout) {
            case 0:
                if (lamaran.catatanSingkat != null) {
                    moveToLayout(1);
                } else {
                    moveForcedToLayout(0);
                }
                break;
            case 1:
                if (lamaran.cv != null || lowonganPekerjaan.perluUploadCv) {
                    moveToLayout(2);
                } else {
                    moveForcedToLayout(1);
                }
                break;
            case 2:
                if (lamaran.jawabanPertanyaanUmum != null || lowonganPekerjaan.perluPertanyaanUmum) {
                    moveToLayout(3);
                } else {
                    moveForcedToLayout(2);
                }
                break;
            default:
                moveForcedToLayout(layout);
                break;
        }
        setActiveLayout(layouts[layout]);
    };
    
    const moveForcedToLayout = (layout) => {
        setActiveLayout(layouts[layout]);
    }

    return (
        <>
            <Navbar />

            {/* CATATAN SINGKAT */}
            {activeLayout === layouts[0] && (
                <div className="columns is-centered">
                    <div className="box column is-half p-5 m-6" style={{ background: '#f5f5f5', color: '#333' }}>
                        <div className="title is-4 has-text-weight-semibold has-text-centered">Deskripsi Singkat</div>
                        <div className="subtitle is-5 has-text-weight-bold has-text-centered" style={{ color: 'green' }}>
                            Deskripsikan Diri Anda
                        </div>

                        <div className="box my-5 p-5">
                            <div className="columns is-flex">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Deskripsikan diri anda disini, mengapa anda tertarik untu melamar labor ini, dan kenapa kami harus memilih anda.</label>
                                        <div className="control">
                                            <textarea className="textarea" placeholder="Masukkan jawaban Anda"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* PERTANYAAN UMUM */}
            {activeLayout === layouts[2] && (
                <div className="columns is-centered">
                    <div className="box column is-half p-5 m-6" style={{ background: '#f5f5f5', color: '#333' }}>
                        <div className="title is-4 has-text-weight-semibold has-text-centered">Pertanyaan Tes</div>
                        <div className="subtitle is-5 has-text-weight-bold has-text-centered" style={{ color: 'green' }}>
                            Pertanyaan Umum
                        </div>

                        <div className="box my-5 p-5">
                            {lowonganPekerjaan.pertanyaan && lowonganPekerjaan.pertanyaan.length === 0 && <p className="mb-4">Belum ada pertanyaan</p>}
                            {lowonganPekerjaan.pertanyaan && lowonganPekerjaan.pertanyaan.map((item, index) => (
                                <PertanyaanUmum
                                    key={index}
                                    item={item}
                                    index={index}
                                />
                            ))}

                            {lowonganPekerjaan.pertanyaan && lowonganPekerjaan.pertanyaan.length !== 0 &&
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-primary is-pulled-right" type="submit" onClick={submitPertanyaan}>Submit Pertanyaan</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}

            {/* PERTANYAAN SELEKSI */}
            {activeLayout === layouts[3] && (
                <div className="columns is-centered">
                    <div className="box column is-half p-5 m-6" style={{ background: '#f5f5f5', color: '#333' }}>
                        <div className="title is-4 has-text-weight-semibold has-text-centered">Pertanyaan Tes</div>
                        <div className="subtitle is-5 has-text-weight-bold has-text-centered" style={{ color: 'green' }}>
                            Pertanyaan Seleksi
                        </div>

                        <div className="box my-5 p-5">
                            {lowonganPekerjaan.pertanyaan && lowonganPekerjaan.pertanyaan.length === 0 && <p className="mb-4">Belum ada pertanyaan</p>}
                            {lowonganPekerjaan.pertanyaan && lowonganPekerjaan.pertanyaan.map((item, index) => (
                                <Pertanyaan
                                    key={index}
                                    item={item}
                                    index={index}
                                />
                            ))}

                            {lowonganPekerjaan.pertanyaan && lowonganPekerjaan.pertanyaan.length !== 0 &&
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-primary is-pulled-right" type="submit" onClick={submitPertanyaan}>Submit Pertanyaan</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProsesLamarMahasiswa;
