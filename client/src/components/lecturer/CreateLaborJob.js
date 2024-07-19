import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert';
import { LecturerContext } from "../../context/LecturerContext";
import Navbar from "../../layouts/Navbar";

const CreateLaborJob = () => {
    const { lecturer } = useContext(LecturerContext);
    const location = useLocation();
    const navigate = useNavigate();
    
    const [position, setPosition] = useState("");
    const [department, setDepartment] = useState("");
    const [departmentList, setDepartmentList] = useState([]);
    const [salary, setSalary] = useState("");
    const [description, setDescription] = useState("");
    const [responsibilities, setResponsibilities] = useState([""]);
    const [requirements, setRequirements] = useState([""]);
    const [deadline, setDeadline] = useState("");
    const [questions, setQuestions] = useState([]);

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

    useEffect(() => {
        console.log(lecturer)
        if (lecturer && lecturer.id) {
            getDepartmentByLecturer(lecturer.id);
        }
    }, [lecturer]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(lecturer.id);
        try {
            const response = await axios.post(`http://localhost:5000/labor-job`, {
                position,
                departmentId: department,
                recruiter: lecturer.id,
                description: description,
                responsibilities: responsibilities,
                requirements: requirements,
                salary,
                postDate: new Date(),
                deadline: deadline,
                needTest: questions.length > 0,
                available: true,
                questions
            });
            console.log("Lowongan berhasil disimpan:", response.data);
            Swal({
                title: "Sukses!",
                text: "Lowongan berhasil disimpan.",
                icon: "success",
            }).then(() => {
                navigate('/lecturer/home');
            });
        } catch (error) {
            console.error("Error saat menyimpan lowongan:", error);
        }
    };  
        
    const handleQuestion = () => {
        navigate('/lecturer/labor-job/create/questions', { 
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
    }

    const getDepartmentByLecturer = async (lecturerId) => {
        try {
            const response = await axios.get(`http://localhost:5000/department/lecturer/${lecturerId}`);
            setDepartmentList(response.data);
        } catch (error) {
            console.error("Error fetching department data:", error);
        }
    };

    const handleChangeResponsibilities = (index, value) => {
        const newResponsibility = [...responsibilities];
        newResponsibility[index] = value;
        setResponsibilities(newResponsibility);
    };

    const handleChangeRequirements = (index, value) => {
        const newRequirement = [...requirements];
        newRequirement[index] = value;
        setRequirements(newRequirement);
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

    const handleChangeSalary = (e) => {
        const value = e.target.value;
        const numericValue = value.replace(/\D/g, '');
        const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setSalary(formattedValue);
    };

    const deleteQuestion = () => {
        Swal({
            title: "Apakah Anda yakin?",
            text: "Pertanyaan yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            buttons: ["Batal", "Ya, hapus"],
            dangerMode: true,
        })
        .then((ok) => {
            if (ok) {
                setQuestions([]);
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
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Department</label>
                        <div className="control">
                            <div className="select">
                                <select
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    required
                                >
                                    <option value="">Pilih departemen</option>
                                    {departmentList.map((dept, index) => (
                                        <option key={index} value={dept._id}>{dept.departmentName}</option>
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
                                                placeholder="Masukkan salary"
                                                value={salary}
                                                onChange={handleChangeSalary}
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
                                placeholder="Masukkan description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tanggung Jawab</label>
                        <div className="control">
                            {responsibilities.map((item, index) => (
                                <div key={index} className="field has-addons">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan tanggung jawab"
                                            value={item}
                                            onChange={(e) => handleChangeResponsibilities(index, e.target.value)}
                                            required
                                        />
                                    </div>
                                    {responsibilities.length > 1 &&
                                    <div className="control">
                                        <button type="button" className="button is-danger" onClick={() => removeField(index, setResponsibilities)}>-</button>
                                    </div>}
                                </div>
                            ))}
                            <button type="button" className="button is-primary" onClick={() => addField(setResponsibilities)}>+</button>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Persyaratan</label>
                        <div className="control">
                            {requirements.map((item, index) => (
                                <div key={index} className="field has-addons">
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan requirements"
                                            value={item}
                                            onChange={(e) => handleChangeRequirements(index, e.target.value)}
                                            required
                                        />
                                    </div>
                                    {requirements.length > 1 &&
                                    <div className="control">
                                        <button type="button" className="button is-danger" onClick={() => removeField(index, setRequirements)}>-</button>
                                    </div>}
                                </div>
                            ))}
                            <button type="button" className="button is-primary" onClick={() => addField(setRequirements)}>+</button>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Tenggat Waktu</label>
                        <div className="control">
                            <input
                                className="input"
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {questions.length === 0 && 
                        <button
                            className="button is-info my-4"
                            onClick={() => handleQuestion()}
                        >
                            Tambahkan Pertanyaan Seleksi
                        </button>
                    }
                    {questions.length > 0 && (
                        <div className="buttons my-4">
                            <button
                                onClick={() => handleQuestion()}
                                className="button is-warning"
                            >
                                Edit Pertanyaan Seleksi
                            </button>
                            <span
                                className="icon is-small has-text-danger ml-2"
                                onClick={() => deleteQuestion()}
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

export default CreateLaborJob;
