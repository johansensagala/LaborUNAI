import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StudentContext } from '../../context/StudentContext';
import Navbar from "../../layouts/Navbar";
import GeneralQuestion from "./GeneralQuestion";
import Question from "./Question";

const ApplicationProcess = () => {
    const { student } = useContext(StudentContext);
    const { id } = useParams();

    const [laborJob, setLaborJob] = useState({});
    const [application, setApplication] = useState({});
    const [activeLayout, setActiveLayout] = useState(null);

    const [note, setNote] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const layouts = ['CATATAN_SINGKAT', 'UPLOAD_CV', 'PERTANYAAN_UMUM', 'PERTANYAAN'];

    useEffect(() => {
        fetchData();
    }, [location.state]);

    useEffect(() => {
        if (application && Object.keys(application).length > 0) {
            moveToLayout(0);
        }
    }, [application]);

    const fetchData = async () => {
        if (location.state) {
            setLaborJob(location.state.laborJob);
            await updateApplication();
        }
    };

    const updateApplication = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/application/${student.id}/${id}`);
            
            setApplication(response.data);
        } catch (error) {
            console.error("Error fetching application data:", error);
            throw error;
        }
    };

    const submitQuestion = () => {
        console.log("Submit pertanyaan");
    }

    const moveToLayout = (layout) => {
        switch (layout) {
            case 0:
                console.log(application.note);
                if (application.note != null) {
                    moveToLayout(1);
                } else {
                    moveForcedToLayout(0);
                }
                break;
            case 1:
                if (application.cv != null || !laborJob.needCvUpload) {
                    moveToLayout(2);
                } else {
                    moveForcedToLayout(1);
                }
                break;
            case 2:

                if ((Array.isArray(application.generalQuestionAnswer) && application.generalQuestionAnswer.length > 0) || 
                    !laborJob.needGeneralQuestion) {
                    moveToLayout(3);
                } else {
                    moveForcedToLayout(2);
                }
                break;
            default:
                moveForcedToLayout(layout);
                break;
        }
        // setActiveLayout(layouts[layout]);
    };
    
    const moveForcedToLayout = (layout) => {
        setActiveLayout(layouts[layout]);
    }

    const setDescription = async () => {
        if (note.length < 30) {
            alert("Deskripsi singkat harus berisi minimal 30 karakter.");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/application/set-note/${student.id}/${id}`, {
                note,
            });

            console.log("Note berhasil disimpan:", response.data);
            await updateApplication();
            moveToLayout(1);
            
        } catch (error) {
            console.error("Error saat menyimpan catatan:", error);
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            console.error("Tidak ada file yang dipilih.");
            return;
        }
        
        const formData = new FormData();
        formData.append('cv', selectedFile);
    
        try {
            const response = await axios.post(`http://localhost:5000/application/upload-cv/${student.id}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log("CV berhasil diunggah:", response.data);
            updateApplication();
            moveToLayout(2);
        } catch (error) {
            console.error("Error saat mengunggah CV:", error);
        }
    };
    
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
                                        <label className="label">Deskripsikan diri anda disini, mengapa anda tertarik untuk melamar labor ini, dan kenapa kami harus memilih anda. (minimal 30 karakter)</label>
                                        <div className="control">
                                            <textarea 
                                                className="textarea" 
                                                placeholder="Masukkan jawaban Anda" 
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <button 
                                        className="button is-primary" 
                                        onClick={setDescription}
                                        disabled={note.length < 30}
                                    >
                                        Kirim
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* UPLOAD CV */}
            {activeLayout === layouts[1] && (
                <div className="columns is-centered">
                    <div className="box column is-half p-5 m-6" style={{ background: '#f5f5f5', color: '#333' }}>
                        <div className="title is-4 has-text-weight-semibold has-text-centered">Upload CV</div>
                        <div className="subtitle is-5 has-text-weight-bold has-text-centered" style={{ color: 'green' }}>
                            Unggah CV Anda
                        </div>

                        <div className="box my-5 p-5">
                            <div className="columns is-flex">
                                <div className="column">
                                    <div className="field">
                                        <label className="label">Silakan unggah CV Anda dalam format PDF atau DOCX</label>
                                        <div className="file has-name is-fullwidth">
                                            <label className="file-label">
                                                <input 
                                                    className="file-input" 
                                                    type="file" 
                                                    name="cv" 
                                                    accept=".pdf, .doc, .docx"
                                                    onChange={handleFileChange}
                                                />
                                                <span className="file-cta">
                                                    <span className="file-icon">
                                                        <i className="fas fa-cloud-upload-alt"></i>
                                                    </span>
                                                    <span className="file-label">Pilih file CV</span>
                                                </span>
                                                <span className="file-name">
                                                    {selectedFile ? selectedFile.name : 'Tidak ada file yang dipilih'}
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <button 
                                        className="button is-primary" 
                                        onClick={handleFileUpload}
                                        disabled={!selectedFile}
                                    >
                                        Unggah CV
                                    </button>
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
                            {laborJob.questions && laborJob.questions.length === 0 && <p className="mb-4">Belum ada pertanyaan</p>}
                            {laborJob.questions && laborJob.questions.map((item, index) => (
                                <GeneralQuestion
                                    key={index}
                                    item={item}
                                    index={index}
                                />
                            ))}

                            {laborJob.questions && laborJob.questions.length !== 0 &&
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-primary is-pulled-right" type="submit" onClick={submitQuestion}>Submit Pertanyaan</button>
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
                            {laborJob.pertanyaan && laborJob.pertanyaan.length === 0 && <p className="mb-4">Belum ada pertanyaan</p>}
                            {laborJob.pertanyaan && laborJob.pertanyaan.map((item, index) => (
                                <Question
                                    key={index}
                                    item={item}
                                    index={index}
                                />
                            ))}

                            {laborJob.pertanyaan && laborJob.pertanyaan.length !== 0 &&
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-primary is-pulled-right" type="submit" onClick={submitQuestion}>Submit Pertanyaan</button>
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

export default ApplicationProcess;
