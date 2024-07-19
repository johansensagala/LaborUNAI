import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert';
import Navbar from "../../layouts/Navbar";

const CreateQuestion = () => {
    const [position, setPosition] = useState("");
    const [department, setDepartment] = useState("");
    const [departmentList, setDepartmentList] = useState([]);
    const [salary, setSalary] = useState("");
    const [description, setDescription] = useState("");
    const [responsibilities, setResponsibilities] = useState([""]);
    const [requirements, setRequirements] = useState([""]);
    const [deadline, setDeadline] = useState("");

    const [questions, setQuestions] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [currentEdit, setCurrentEdit] = useState(0);
    const [question, setQuestion] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [numberOfQuestionRadio, setNumberOfQuestionRadio] = useState(2);
    const [numberOfQuestionCheckbox, setNumberOfQuestionCheckbox] = useState(2);
    const [optionsOfQuestionRadio, setOptionOfQuestionRadio] = useState(Array.from({ length: 2 }, () => ''));
    const [optionsOfQuestionCheckbox, setOptionOfQuestionCheckbox] = useState(Array.from({ length: 2 }, () => ''));

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setPosition(location.state.position);
            setDepartment(location.state.department);
            setDepartmentList(location.state.departmentList);
            setSalary(location.state.salary);
            setDescription(location.state.description);
            setResponsibilities(location.state.responsibilities);
            setRequirements(location.state.requirements);
            setDeadline(location.state.deadline);
            setQuestions(location.state.questions);
        }
    }, [location.state]);

    const submitQuestion = () => {
        navigate('/lecturer/labor-job/create', { 
            state: { 
                position: position,
                department: department,
                departmentList: departmentList,
                salary: salary,
                description: description,
                responsibilities: responsibilities,
                requirements: requirements,
                deadline: deadline,
                questions: questions,
            } 
        });
    };
    
    const handleNumberOfQuestionRadio = (e) => {
        const number = parseInt(e.target.value, 10);
        
        if (number >= numberOfQuestionRadio) {
            const currentOptions = [...optionsOfQuestionRadio];
            const additionalOptions = Array.from({ length: number - currentOptions.length }, () => '');
            const updatedOptions = [...currentOptions, ...additionalOptions];
            setNumberOfQuestionRadio(number);
            setOptionOfQuestionRadio(updatedOptions);
        } else {
            const currentOptions = optionsOfQuestionRadio.slice(0, number);
            setNumberOfQuestionRadio(number);
            setOptionOfQuestionRadio(currentOptions);
        }
    };

    const handleNumberOfQuestionCheckbox = (e) => {
        const number = parseInt(e.target.value, 10);
        
        if (number >= numberOfQuestionCheckbox) {
            const currentOptions = [...optionsOfQuestionCheckbox];
            const additionalOptions = Array.from({ length: number - currentOptions.length }, () => '');
            const updatedOptions = [...currentOptions, ...additionalOptions];
            setNumberOfQuestionCheckbox(number);
            setOptionOfQuestionCheckbox(updatedOptions);
        } else {
            const currentOptions = optionsOfQuestionCheckbox.slice(0, number);
            setNumberOfQuestionCheckbox(number);
            setOptionOfQuestionCheckbox(currentOptions);
        }
    };

    const handleOptionOfQuestionRadio = (index, e) => {
        const newOptions = [...optionsOfQuestionRadio];
        newOptions[index] = e.target.value;
        setOptionOfQuestionRadio(newOptions);
    };

    const handleOptionOfQuestionCheckbox = (index, e) => {
        const newOptions = [...optionsOfQuestionCheckbox];
        newOptions[index] = e.target.value;
        setOptionOfQuestionCheckbox(newOptions);
    };

    const handleEdit = (index) => {
        const editedQuestion = questions[index];
        setCurrentEdit(index);
    
        setShowModalEdit(true);
        setQuestion(editedQuestion.question);
        setQuestionType(editedQuestion.questionType);
    
        if (editedQuestion.questionType === "radio") {
            setNumberOfQuestionRadio(editedQuestion.optionsOfQuestionRadio.length);
            setOptionOfQuestionRadio([...editedQuestion.optionsOfQuestionRadio]);
        }
    
        if (editedQuestion.questionType === "checkbox") {
            setNumberOfQuestionCheckbox(editedQuestion.optionsOfQuestionCheckbox.length);
            setOptionOfQuestionCheckbox([...editedQuestion.optionsOfQuestionCheckbox]);
        }
    
    };
    
    const handleDelete = (index) => {
        Swal({
            title: "Hapus Pertanyaan?",
            text: "Yakin ingin menghapus questions?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                setQuestions(prevState => {
                    return prevState.filter((_, i) => i !== index);
                });
                Swal(
                    'Terhapus!',
                    'Pertanyaan telah dihapus.',
                    'success'
                );
            }
        });
    };
                    
    const tambahQuestion = () => {
        if (question.trim() === "") {
            Swal({
                title: 'Error!',
                text: 'Pertanyaan tidak boleh kosong',
                icon: 'error',
                button: 'OK'
            });
            return;
        }

        if (questionType === "radio") {
            if (optionsOfQuestionRadio.some(option => option.trim() === "")) {
                Swal({
                    title: 'Error!',
                    text: 'Pilihan pada questions radio tidak boleh kosong',
                    icon: 'error',
                    button: 'OK'
                });
                return;
            }

            setQuestions([...questions, {
                questionType,
                question,
                optionsOfQuestionRadio
            }]);
        } else if (questionType === "checkbox") {
            if (optionsOfQuestionCheckbox.some(option => option.trim() === "")) {
                Swal({
                    title: 'Error!',
                    text: 'Pilihan pada pertanyaan checkbox tidak boleh kosong',
                    icon: 'error',
                    button: 'OK'
                });
                return;
            }

            setQuestions([...questions, {
                questionType,
                question,
                optionsOfQuestionCheckbox
            }]);
        } else {
            setQuestions([...questions, {
                questionType,
                question
            }]);
        }

        resetQuestions();
        setShowModalAdd(false);
    }

    const editQuestion = () => {
        if (question.trim() === "") {
            Swal({
                title: 'Error!',
                text: 'Pertanyaan tidak boleh kosong',
                icon: 'error',
                button: 'OK'
            });
            return;
        }
    
        if (questionType === "radio") {
            if (optionsOfQuestionRadio.some(option => option.trim() === "")) {
                Swal({
                    title: 'Error!',
                    text: 'Pilihan pada questions radio tidak boleh kosong',
                    icon: 'error',
                    button: 'OK'
                });
                return;
            }
    
            const editedIndex = currentEdit;
    
            const updatedQuestion = [...questions];
    
            updatedQuestion[editedIndex] = {
                questionType,
                question,
                optionsOfQuestionRadio
            };
    
            setQuestions(updatedQuestion);
        } else if (questionType === "checkbox") {
            if (optionsOfQuestionCheckbox.some(option => option.trim() === "")) {
                Swal({
                    title: 'Error!',
                    text: 'Pilihan pada questions checkbox tidak boleh kosong',
                    icon: 'error',
                    button: 'OK'
                });
                return;
            }
    
            const editedIndex = currentEdit;
    
            const updatedQuestion = [...questions];
    
            updatedQuestion[editedIndex] = {
                questionType,
                question,
                optionsOfQuestionCheckbox
            };
    
            setQuestions(updatedQuestion);
        } else {
            const editedIndex = currentEdit;
    
            const updatedQuestion = [...questions];
    
            updatedQuestion[editedIndex] = {
                questionType,
                question
            };
    
            setQuestions(updatedQuestion);
        }
    
        resetQuestions();
        setShowModalEdit(false);
    };
    
    const cancelAddQuestion = () => {
        if (
            question !== "" ||
            questionType !== "" ||
            numberOfQuestionRadio !== 2 ||
            numberOfQuestionCheckbox !== 2 ||
            optionsOfQuestionRadio.some(option => option !== '') ||
            optionsOfQuestionCheckbox.some(option => option !== '')
        ) {
            Swal({
                title: "Batalkan Perubahan?",
                text: "Anda yakin ingin membatalkan perubahan?",
                icon: "warning",
                buttons: ["Tidak", "Ya"],
                dangerMode: true,
            }).then((ok) => {
                if (ok) {
                    resetQuestions();
                    setShowModalAdd(false);
                }
            });
        } else {
            setShowModalAdd(false);
        }
    };
        
    const cancelEditQuestion = () => {
        if (
            question !== questions[currentEdit].question ||
            questionType !== questions[currentEdit].questionType ||
            (questionType === "radio" && numberOfQuestionRadio !== questions[currentEdit].optionsOfQuestionRadio.length) ||
            (questionType === "checkbox" && numberOfQuestionCheckbox !== questions[currentEdit].optionsOfQuestionCheckbox.length) ||
            (questionType === "radio" && !optionsOfQuestionRadio.every((option, index) => option === questions[currentEdit].optionsOfQuestionRadio[index])) ||
            (questionType === "checkbox" && !optionsOfQuestionCheckbox.every((option, index) => option === questions[currentEdit].optionsOfQuestionCheckbox[index]))
        ) {
            Swal({
                title: "Batalkan Perubahan?",
                text: "Anda yakin ingin membatalkan perubahan?",
                icon: "warning",
                buttons: ["Tidak", "Ya"],
                dangerMode: true,
            }).then((ok) => {
                if (ok) {
                    resetQuestions();
                    setShowModalEdit(false);
                }
            });
        } else {
            setShowModalEdit(false);
        }
    };
    
    const resetQuestions = () => {
        setQuestion("");
        setQuestionType("");
        setNumberOfQuestionRadio(2);
        setNumberOfQuestionCheckbox(2);
        setOptionOfQuestionRadio(Array.from({ length: 2 }, () => ''));
        setOptionOfQuestionCheckbox(Array.from({ length: 2 }, () => ''));
    }

    return (
        <>
            <Navbar />
            <div className="column is-half is-offset-one-quarter">
                <div className="box p-5 m-5" style={{ background: '#f5f5f5', color: '#333' }}>
                        <div className="column is-full mb-6">
                            <div className="is-size-5 has-text-centered has-text-weight-bold" style={{ color: '#333' }}>
                                Tambah Pertanyaan
                            </div>
                        </div>
                        <button className="button is-primary" onClick={() => setShowModalAdd(true)}>Tambah Pertanyaan</button>
                        
                        <div className="box my-5 p-5">
                            {questions.length === 0 && <p className="mb-4">Belum ada questions</p>}
                            {questions.map((item, index) => {
                                if (item.questionType === "text") {
                                    return (
                                        <div className="columns is-flex">
                                            <div className="column is-three-quarters" key={index}>
                                                <div className="field">
                                                    <label className="label">{index + 1}. {item.question}</label>
                                                    <div className="control">
                                                        <input className="input" type="text" placeholder="Masukkan jawaban Anda" readOnly/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="column is-one-quarter" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <div style={{ marginLeft: 'auto' }}>
                                                    <FaEdit 
                                                        onClick={() => handleEdit(index)}
                                                        style={{ cursor: 'pointer', marginRight: '10px' }}
                                                    />
                                                    <FaTrash 
                                                        onClick={() => handleDelete(index)}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                            } else if (item.questionType === "textarea") {
                                return (
                                    <div className="columns is-flex">
                                        <div className="column is-three-quarters" key={index}>
                                            <label className="label">{index + 1}. {item.question}</label>
                                            <div className="control">
                                                <textarea className="textarea" placeholder="Masukkan jawaban Anda" readOnly></textarea>
                                            </div>
                                        </div>
                                        <div className="column is-one-quarter" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <div style={{ marginLeft: 'auto' }}>
                                                <FaEdit 
                                                    onClick={() => handleEdit(index)}
                                                    style={{ cursor: 'pointer', marginRight: '10px' }}
                                                />
                                                <FaTrash 
                                                    onClick={() => handleDelete(index)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else if (item.questionType === "radio") {
                                return (
                                    <div className="columns is-flex">
                                        <div className="column is-three-quarters" key={index}>
                                            <label className="label">{index + 1}. {item.question}</label>
                                            <div className="control">
                                                {item.optionsOfQuestionRadio.map((option, optionIndex) => (
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
                                            <div style={{ marginLeft: 'auto' }}>
                                                <FaEdit 
                                                    onClick={() => handleEdit(index)}
                                                    style={{ cursor: 'pointer', marginRight: '10px' }}
                                                />
                                                <FaTrash 
                                                    onClick={() => handleDelete(index)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else if (item.questionType === "checkbox") {
                                return (
                                    <div className="columns is-flex">
                                        <div className="column is-three-quarters" key={index}>
                                            <label className="label">{index + 1}. {item.question}</label>
                                            <div className="control">
                                                {item.optionsOfQuestionCheckbox.map((option, optionIndex) => (
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
                                            <div style={{ marginLeft: 'auto' }}>
                                                <FaEdit 
                                                    onClick={() => handleEdit(index)}
                                                    style={{ cursor: 'pointer', marginRight: '10px' }}
                                                />
                                                <FaTrash 
                                                    onClick={() => handleDelete(index)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                        {questions.length !== 0 &&
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-primary is-pulled-right" type="submit" onClick={() => submitQuestion()}>Submit Pertanyaan</button>
                            </div>
                        </div>
                        }

                    </div>
                </div>
            </div>

            {showModalAdd && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => cancelAddQuestion()}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title has-text-centered">Tambah Pertanyaan Baru</p>
                        </header>
                        <section className="modal-card-body">
                            <div className="field">
                                <label className="label">Jenis Pertanyaan</label>
                                <div className="control">
                                    <div className="select">
                                        <select
                                            value={questionType}
                                            onChange={(e) => setQuestionType(e.target.value)}
                                        >
                                            <option value="">Pilih jenis questions</option>
                                            <option value="text">Pertanyaan Singkat</option>
                                            <option value="textarea">Pertanyaan Panjang</option>
                                            <option value="radio">Pertanyaan Pilihan Ganda (Satu Jawaban)</option>
                                            <option value="checkbox">Pertanyaan Pilihan Ganda (Beberapa Jawaban)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {questionType === "text" && (
                                <div className="field" id="text">
                                    <label className="label">Pertanyaan dengan Jawaban Singkat</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan questions"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                            {questionType === "textarea" && (
                                <div className="field" id="textarea">
                                    <label className="label">Pertanyaan dengan Jawaban Panjang</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan questions"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                            {questionType === "radio" && (
                                <div className="field" id="textarea">
                                <label className="label">Pertanyaan dengan Satu Pilihan Jawaban</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Masukkan questions"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Jumlah Pilihan Jawaban</label>
                                    <div className="control">
                                        <div className="select mb-4">
                                            <select
                                                value={numberOfQuestionRadio}
                                                onChange={(e) => handleNumberOfQuestionRadio(e)}
                                            >
                                                {[...Array(9).keys()].map(num => (
                                                    <option key={num + 2} value={num + 2}>{num + 2}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {optionsOfQuestionRadio.map((input, index) => (
                                            <div key={index} className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder={`Pilihan ${index + 1}`}
                                                    value={input}
                                                    onChange={(e) => handleOptionOfQuestionRadio(index, e)}
                                                />
                                            </div>
                                        ))}
                                </div>
                                </div>
                            </div>
                            )}
                            {questionType === "checkbox" && (
                                <div className="field" id="textarea">
                                <label className="label">Pertanyaan dengan Beberapa Pilihan Jawaban</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Masukkan pertanyaan"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Jumlah Pilihan Jawaban</label>
                                    <div className="control">
                                        <div className="select mb-4">
                                            <select
                                                value={numberOfQuestionCheckbox}
                                                onChange={(e) => handleNumberOfQuestionCheckbox(e)}
                                            >
                                                {[...Array(9).keys()].map(num => (
                                                    <option key={num + 2} value={num + 2}>{num + 2}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {optionsOfQuestionCheckbox.map((input, index) => (
                                            <div key={index} className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder={`Pilihan ${index + 1}`}
                                                    value={input}
                                                    onChange={(e) => handleOptionOfQuestionCheckbox(index, e)}
                                                />
                                            </div>
                                        ))}
                                </div>
                                </div>
                            </div>
                            )}

                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={() => tambahQuestion()}>Simpan</button>
                            <button className="button" onClick={() => cancelAddQuestion()}>Batal</button>
                        </footer>
                    </div>
                </div>
            )}

            {showModalEdit && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => cancelEditQuestion()}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title has-text-centered">Edit Pertanyaan</p>
                        </header>
                        <section className="modal-card-body">
                            <div className="field">
                                <label className="label">Jenis Pertanyaan</label>
                                <div className="control">
                                    <div className="select">
                                        <select
                                            value={questionType}
                                            onChange={(e) => setQuestionType(e.target.value)}
                                        >
                                            <option value="">Pilih jenis questions</option>
                                            <option value="text">Pertanyaan Singkat</option>
                                            <option value="textarea">Pertanyaan Panjang</option>
                                            <option value="radio">Pertanyaan Pilihan Ganda (Satu Jawaban)</option>
                                            <option value="checkbox">Pertanyaan Pilihan Ganda (Beberapa Jawaban)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {questionType === "text" && (
                                <div className="field" id="text">
                                    <label className="label">Pertanyaan dengan Jawaban Singkat</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan pertanyaan"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                            {questionType === "textarea" && (
                                <div className="field" id="textarea">
                                    <label className="label">Pertanyaan dengan Jawaban Panjang</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan pertanyaan"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                            {questionType === "radio" && (
                                <div className="field" id="textarea">
                                <label className="label">Pertanyaan dengan Satu Pilihan Jawaban</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Masukkan pertanyaan"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Jumlah Pilihan Jawaban</label>
                                    <div className="control">
                                        <div className="select mb-4">
                                            <select
                                                value={numberOfQuestionRadio}
                                                onChange={(e) => handleNumberOfQuestionRadio(e)}
                                            >
                                                {[...Array(9).keys()].map(num => (
                                                    <option key={num + 2} value={num + 2}>{num + 2}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {optionsOfQuestionRadio.map((input, index) => (
                                            <div key={index} className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder={`Pilihan ${index + 1}`}
                                                    value={input}
                                                    onChange={(e) => handleOptionOfQuestionRadio(index, e)}
                                                />
                                            </div>
                                        ))}
                                </div>
                                </div>
                            </div>
                            )}
                            {questionType === "checkbox" && (
                                <div className="field" id="textarea">
                                <label className="label">Pertanyaan dengan Beberapa Pilihan Jawaban</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Masukkan pertanyaan"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Jumlah Pilihan Jawaban</label>
                                    <div className="control">
                                        <div className="select mb-4">
                                            <select
                                                value={numberOfQuestionCheckbox}
                                                onChange={(e) => handleNumberOfQuestionCheckbox(e)}
                                            >
                                                {[...Array(9).keys()].map(num => (
                                                    <option key={num + 2} value={num + 2}>{num + 2}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {optionsOfQuestionCheckbox.map((input, index) => (
                                            <div key={index} className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder={`Pilihan ${index + 1}`}
                                                    value={input}
                                                    onChange={(e) => handleOptionOfQuestionCheckbox(index, e)}
                                                />
                                            </div>
                                        ))}
                                </div>
                                </div>
                            </div>
                            )}

                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={() => editQuestion()}>Simpan</button>
                            <button className="button" onClick={() => cancelEditQuestion()}>Batal</button>
                        </footer>
                    </div>
                </div>
            )}

        </>
    );
};

export default CreateQuestion;
