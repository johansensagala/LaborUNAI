import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
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
    const [generalQuestionAnswers, setGeneralQuestionAnswers] = useState([]);
    const [answers, setAnswers] = useState([]);

    // Timer state
    const [testRemainingTime, setTestRemainingTime] = useState(null);
    const [isTestStarted, setIsTestStarted] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

    useEffect(() => {
        let interval;
        if (isTestStarted) {
            interval = setInterval(() => {
                setTestRemainingTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isTestStarted]);

    useEffect(() => {
        if (testRemainingTime === 0 && isTestStarted && !isSubmitted) {
            submitTestAnswer();
            setIsSubmitted(true);
        }
    }, [testRemainingTime, isTestStarted, isSubmitted]);

    const fetchData = async () => {
        if (location.state) {
            setLaborJob(location.state.laborJob);
            await updateApplication();
        }
    };

    const showSuccessAlert = (message) => {
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: message,
            confirmButtonText: 'OK'
        });
    };

    const updateApplication = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/application/${student.id}/${id}`);
            
            setApplication(response.data);

            // Set test timing if test is started
            if (response.data.isTestStarted) {
                setTestRemainingTime(response.data.testRemainingTime);
                setIsTestStarted(true);
            }
        } catch (error) {
            console.error("Error fetching application data:", error);
            throw error;
        }
    };

    const moveToLayout = (layout) => {
        switch (layout) {
            case 0:
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
                if ((Array.isArray(application.generalQuestionAnswers) && application.generalQuestionAnswers.length > 0) || 
                    !laborJob.needGeneralQuestion) {
                    moveToLayout(3);
                } else {
                    moveForcedToLayout(2);
                }
                break;
            case 3:
                if ((Array.isArray(application.testAnswers) && application.testAnswers.length > 0) || 
                    !laborJob.needTest) {
                    // window.location.href = "https://www.google.com";
                } else {
                    Swal.fire({
                        title: 'Mulai Tes?',
                        text: "Anda tidak bisa beralih ke halaman lain selama tes berlangsung.",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Mulai'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if (!isTestStarted) {
                                startTest();
                            }
                            moveForcedToLayout(3);
                        }
                    });
                }
                break;
            default:
                moveForcedToLayout(layout);
                break;
        }
    };
    
    const moveForcedToLayout = (layout) => {
        setActiveLayout(layouts[layout]);
    }

    const handleBack = () => {
        const currentLayoutIndex = layouts.indexOf(activeLayout);
        if (currentLayoutIndex > 0) {
            moveForcedToLayout(currentLayoutIndex - 1);
        }
    };

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

            showSuccessAlert('Deksripsi berhasil disimpan!');

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
            showSuccessAlert('CV berhasil diunggah!');
        } catch (error) {
            console.error("Error saat mengunggah CV:", error);
        }
    };

    const handleUseProfileCV = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/application/upload-cv-in-profile/${student.id}/${id}`);
    
            console.log("CV berhasil diunggah:", response.data);
            updateApplication();
            moveToLayout(2);
            showSuccessAlert('CV berhasil diunggah!');
        } catch (error) {
            console.error("Error saat mengunggah CV:", error);
        }
    };

    const handleGeneralQuestionAnswerChange = (index, answer) => {
        const updatedAnswers = [...generalQuestionAnswers];
        updatedAnswers[index] = answer;
        setGeneralQuestionAnswers(updatedAnswers);
    };

    const submitGeneralQuestionAnswer = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/application/set-general-question-answers/${student.id}/${id}`, {
                generalQuestionAnswers,
            });

            console.log("General answers successfully submitted:", response.data);
            await updateApplication();
            showSuccessAlert('Jawaban berhasil disimpan!');
            moveToLayout(3);
        } catch (error) {
            console.error("Error submitting questions:", error);
        }
    }

    const handleTestAnswerChange = (index, answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = answer;
        setAnswers(updatedAnswers);
    };

    const startTest = async () => {
        try {
            
            const testDurationInSeconds = laborJob.testDuration;

            await axios.post(`http://localhost:5000/application/start-test/${student.id}/${id}`);

            setTestRemainingTime(testDurationInSeconds);
            setIsTestStarted(true);
        } catch (error) {
            console.error("Error starting test:", error);
        }
    }

    const submitTestAnswer = async () => {
        try {
            console.log("Submitting test answers:", answers);

            const response = await axios.post(`http://localhost:5000/application/set-test-answers/${student.id}/${id}`, {
                testAnswers: answers,
            });

            console.log("Answers successfully submitted:", response.data);
            await updateApplication();
            // window.location.href = "https://www.google.com";
        } catch (error) {
            console.error("Error submitting questions:", error);
        }
    }

    const checkLog = () => {
        console.log(answers);
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
                                <div className="control">
                                    <button
                                        className="button is-info"
                                        onClick={handleUseProfileCV}
                                    >
                                        Gunakan CV di profile saya
                                    </button>
                                </div>
                                <div className="control">
                                    <button
                                        className="button is-link"
                                        onClick={handleBack}
                                    >
                                        Kembali
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
                            {laborJob.generalQuestions && laborJob.generalQuestions.length === 0 && <p className="mb-4">Belum ada pertanyaan</p>}
                            {laborJob.generalQuestions && laborJob.generalQuestions.map((item, index) => (
                                <GeneralQuestion
                                    key={index}
                                    item={item}
                                    index={index}
                                    handleGeneralQuestionAnswerChange={handleGeneralQuestionAnswerChange}
                                />
                            ))}

                            {laborJob.generalQuestions && laborJob.generalQuestions.length !== 0 &&
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-primary is-pulled-right" type="submit" onClick={submitGeneralQuestionAnswer}>Submit Pertanyaan</button>
                                    </div>
                                </div>
                            }
                            <div className="control">
                                <button
                                    className="button is-link"
                                    onClick={handleBack}
                                >
                                    Kembali
                                </button>
                            </div>
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
                            {testRemainingTime > 0 && laborJob.testDuration && (
                                <div className="notification is-info">
                                    Waktu tersisa: {Math.floor(testRemainingTime / 60)}:{('0' + (testRemainingTime % 60)).slice(-2)}
                                </div>
                            )}
                            {laborJob.questions && laborJob.questions.length === 0 && <p className="mb-4">Belum ada pertanyaan</p>}
                            {laborJob.questions && laborJob.questions.map((item, index) => (
                                <Question
                                    key={index}
                                    item={item}
                                    index={index}
                                    handleTestAnswerChange={handleTestAnswerChange}
                                />
                            ))}

                            {laborJob.questions && laborJob.questions.length !== 0 &&
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button className="button is-primary is-pulled-right" type="submit" onClick={submitTestAnswer}>Submit Pertanyaan</button>
                                    </div>
                                    <div className="control">
                                        <button className="button is-primary is-pulled-right" type="submit" onClick={checkLog}>Check Log</button>
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
