import React, { useState, useEffect } from "react";
import Navbar from "../../layouts/Navbar";
import Swal from 'sweetalert';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";

const BuatPertanyaan = () => {
    const [posisi, setPosisi] = useState("");
    const [departemen, setDepartemen] = useState("");
    const [departemenList, setDepartemenList] = useState([]);
    const [gaji, setGaji] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tanggungJawab, setTanggungJawab] = useState([""]);
    const [persyaratan, setPersyaratan] = useState([""]);
    const [tenggat, setTenggat] = useState("");

    const [pertanyaan, setPertanyaan] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [currentEdit, setcurrentEdit] = useState(0);
    const [inputPertanyaan, setInputPertanyaan] = useState("");
    const [jenisPertanyaan, setJenisPertanyaan] = useState("");
    const [jumlahPertanyaanRadio, setJumlahPertanyaanRadio] = useState(2);
    const [jumlahPertanyaanCheckbox, setJumlahPertanyaanCheckbox] = useState(2);
    const [optionPertanyaanRadio, setOptionPertanyaanRadio] = useState(Array.from({ length: 2 }, () => ''));
    const [optionPertanyaanCheckbox, setOptionPertanyaanCheckbox] = useState(Array.from({ length: 2 }, () => ''));

    const navigate = useNavigate();
    const location = useLocation();

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

    const submitPertanyaan = () => {
        navigate('/dosen/lowongan/create', { 
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
    };
    
    const handleJumlahPertanyaanRadio = (e) => {
        const number = parseInt(e.target.value, 10);
        
        if (number >= jumlahPertanyaanRadio) {
            const currentOptions = [...optionPertanyaanRadio];
            const additionalOptions = Array.from({ length: number - currentOptions.length }, () => '');
            const updatedOptions = [...currentOptions, ...additionalOptions];
            setJumlahPertanyaanRadio(number);
            setOptionPertanyaanRadio(updatedOptions);
        } else {
            const currentOptions = optionPertanyaanRadio.slice(0, number);
            setJumlahPertanyaanRadio(number);
            setOptionPertanyaanRadio(currentOptions);
        }
    };

    const handleJumlahPertanyaanCheckbox = (e) => {
        const number = parseInt(e.target.value, 10);
        
        if (number >= jumlahPertanyaanCheckbox) {
            const currentOptions = [...optionPertanyaanCheckbox];
            const additionalOptions = Array.from({ length: number - currentOptions.length }, () => '');
            const updatedOptions = [...currentOptions, ...additionalOptions];
            setJumlahPertanyaanCheckbox(number);
            setOptionPertanyaanCheckbox(updatedOptions);
        } else {
            const currentOptions = optionPertanyaanCheckbox.slice(0, number);
            setJumlahPertanyaanCheckbox(number);
            setOptionPertanyaanCheckbox(currentOptions);
        }
    };

    const handleOptionPertanyaanRadio = (index, e) => {
        const newOptions = [...optionPertanyaanRadio];
        newOptions[index] = e.target.value;
        setOptionPertanyaanRadio(newOptions);
    };

    const handleOptionPertanyaanCheckbox = (index, e) => {
        const newOptions = [...optionPertanyaanCheckbox];
        newOptions[index] = e.target.value;
        setOptionPertanyaanCheckbox(newOptions);
    };

    const handleEdit = (index) => {
        const editedPertanyaan = pertanyaan[index];
        setcurrentEdit(index);
    
        setShowModalEdit(true);
        setInputPertanyaan(editedPertanyaan.inputPertanyaan);
        setJenisPertanyaan(editedPertanyaan.jenisPertanyaan);
    
        if (editedPertanyaan.jenisPertanyaan === "radio") {
            setJumlahPertanyaanRadio(editedPertanyaan.optionPertanyaanRadio.length);
            setOptionPertanyaanRadio([...editedPertanyaan.optionPertanyaanRadio]);
        }
    
        if (editedPertanyaan.jenisPertanyaan === "checkbox") {
            setJumlahPertanyaanCheckbox(editedPertanyaan.optionPertanyaanCheckbox.length);
            setOptionPertanyaanCheckbox([...editedPertanyaan.optionPertanyaanCheckbox]);
        }
    
    };
    
    const handleDelete = (index) => {
        Swal({
            title: "Hapus Pertanyaan?",
            text: "Yakin ingin menghapus pertanyaan?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                setPertanyaan(prevState => {
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
                    
    const tambahPertanyaan = () => {
        if (inputPertanyaan.trim() === "") {
            Swal({
                title: 'Error!',
                text: 'Pertanyaan tidak boleh kosong',
                icon: 'error',
                button: 'OK'
            });
            return;
        }

        if (jenisPertanyaan === "radio") {
            if (optionPertanyaanRadio.some(option => option.trim() === "")) {
                Swal({
                    title: 'Error!',
                    text: 'Pilihan pada pertanyaan radio tidak boleh kosong',
                    icon: 'error',
                    button: 'OK'
                });
                return;
            }

            setPertanyaan([...pertanyaan, {
                jenisPertanyaan,
                inputPertanyaan,
                optionPertanyaanRadio
            }]);
        } else if (jenisPertanyaan === "checkbox") {
            if (optionPertanyaanCheckbox.some(option => option.trim() === "")) {
                Swal({
                    title: 'Error!',
                    text: 'Pilihan pada pertanyaan checkbox tidak boleh kosong',
                    icon: 'error',
                    button: 'OK'
                });
                return;
            }

            setPertanyaan([...pertanyaan, {
                jenisPertanyaan,
                inputPertanyaan,
                optionPertanyaanCheckbox
            }]);
        } else {
            setPertanyaan([...pertanyaan, {
                jenisPertanyaan,
                inputPertanyaan
            }]);
        }

        resetPertanyaan();
        setShowModalAdd(false);
    }

    const editPertanyaan = () => {
        if (inputPertanyaan.trim() === "") {
            Swal({
                title: 'Error!',
                text: 'Pertanyaan tidak boleh kosong',
                icon: 'error',
                button: 'OK'
            });
            return;
        }
    
        if (jenisPertanyaan === "radio") {
            if (optionPertanyaanRadio.some(option => option.trim() === "")) {
                Swal({
                    title: 'Error!',
                    text: 'Pilihan pada pertanyaan radio tidak boleh kosong',
                    icon: 'error',
                    button: 'OK'
                });
                return;
            }
    
            const editedIndex = currentEdit;
    
            const updatedPertanyaan = [...pertanyaan];
    
            updatedPertanyaan[editedIndex] = {
                jenisPertanyaan,
                inputPertanyaan,
                optionPertanyaanRadio
            };
    
            setPertanyaan(updatedPertanyaan);
        } else if (jenisPertanyaan === "checkbox") {
            if (optionPertanyaanCheckbox.some(option => option.trim() === "")) {
                Swal({
                    title: 'Error!',
                    text: 'Pilihan pada pertanyaan checkbox tidak boleh kosong',
                    icon: 'error',
                    button: 'OK'
                });
                return;
            }
    
            const editedIndex = currentEdit;
    
            const updatedPertanyaan = [...pertanyaan];
    
            updatedPertanyaan[editedIndex] = {
                jenisPertanyaan,
                inputPertanyaan,
                optionPertanyaanCheckbox
            };
    
            setPertanyaan(updatedPertanyaan);
        } else {
            const editedIndex = currentEdit;
    
            const updatedPertanyaan = [...pertanyaan];
    
            updatedPertanyaan[editedIndex] = {
                jenisPertanyaan,
                inputPertanyaan
            };
    
            setPertanyaan(updatedPertanyaan);
        }
    
        resetPertanyaan();
        setShowModalEdit(false);
    };
    
    const cancelTambahPertanyaan = () => {
        if (
            inputPertanyaan !== "" ||
            jenisPertanyaan !== "" ||
            jumlahPertanyaanRadio !== 2 ||
            jumlahPertanyaanCheckbox !== 2 ||
            optionPertanyaanRadio.some(option => option !== '') ||
            optionPertanyaanCheckbox.some(option => option !== '')
        ) {
            Swal({
                title: "Batalkan Perubahan?",
                text: "Anda yakin ingin membatalkan perubahan?",
                icon: "warning",
                buttons: ["Tidak", "Ya"],
                dangerMode: true,
            }).then((ok) => {
                if (ok) {
                    resetPertanyaan();
                    setShowModalAdd(false);
                }
            });
        } else {
            setShowModalAdd(false);
        }
    };
        
    const cancelEditPertanyaan = () => {
        if (
            inputPertanyaan !== pertanyaan[currentEdit].inputPertanyaan ||
            jenisPertanyaan !== pertanyaan[currentEdit].jenisPertanyaan ||
            (jenisPertanyaan === "radio" && jumlahPertanyaanRadio !== pertanyaan[currentEdit].optionPertanyaanRadio.length) ||
            (jenisPertanyaan === "checkbox" && jumlahPertanyaanCheckbox !== pertanyaan[currentEdit].optionPertanyaanCheckbox.length) ||
            (jenisPertanyaan === "radio" && !optionPertanyaanRadio.every((option, index) => option === pertanyaan[currentEdit].optionPertanyaanRadio[index])) ||
            (jenisPertanyaan === "checkbox" && !optionPertanyaanCheckbox.every((option, index) => option === pertanyaan[currentEdit].optionPertanyaanCheckbox[index]))
        ) {
            Swal({
                title: "Batalkan Perubahan?",
                text: "Anda yakin ingin membatalkan perubahan?",
                icon: "warning",
                buttons: ["Tidak", "Ya"],
                dangerMode: true,
            }).then((ok) => {
                if (ok) {
                    resetPertanyaan();
                    setShowModalEdit(false);
                }
            });
        } else {
            setShowModalEdit(false);
        }
    };
    
    const resetPertanyaan = () => {
        setInputPertanyaan("");
        setJenisPertanyaan("");
        setJumlahPertanyaanRadio(2);
        setJumlahPertanyaanCheckbox(2);
        setOptionPertanyaanRadio(Array.from({ length: 2 }, () => ''));
        setOptionPertanyaanCheckbox(Array.from({ length: 2 }, () => ''));
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
                            {pertanyaan.length === 0 && <p className="mb-4">Belum ada pertanyaan</p>}
                            {pertanyaan.map((item, index) => {
                                if (item.jenisPertanyaan === "text") {
                                    return (
                                        <div className="columns is-flex">
                                            <div className="column is-three-quarters" key={index}>
                                                <div className="field">
                                                    <label className="label">{index + 1}. {item.inputPertanyaan}</label>
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
                            } else if (item.jenisPertanyaan === "textarea") {
                                return (
                                    <div className="columns is-flex">
                                        <div className="column is-three-quarters" key={index}>
                                            <label className="label">{index + 1}. {item.inputPertanyaan}</label>
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
                            } else if (item.jenisPertanyaan === "radio") {
                                return (
                                    <div className="columns is-flex">
                                        <div className="column is-three-quarters" key={index}>
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
                            } else if (item.jenisPertanyaan === "checkbox") {
                                return (
                                    <div className="columns is-flex">
                                        <div className="column is-three-quarters" key={index}>
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

                        {pertanyaan.length !== 0 &&
                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-primary is-pulled-right" type="submit" onClick={() => submitPertanyaan()}>Submit Pertanyaan</button>
                            </div>
                        </div>
                        }

                    </div>
                </div>
            </div>

            {showModalAdd && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => cancelTambahPertanyaan()}></div>
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
                                            value={jenisPertanyaan}
                                            onChange={(e) => setJenisPertanyaan(e.target.value)}
                                        >
                                            <option value="">Pilih jenis pertanyaan</option>
                                            <option value="text">Pertanyaan Singkat</option>
                                            <option value="textarea">Pertanyaan Panjang</option>
                                            <option value="radio">Pertanyaan Pilihan Ganda (Satu Jawaban)</option>
                                            <option value="checkbox">Pertanyaan Pilihan Ganda (Beberapa Jawaban)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {jenisPertanyaan === "text" && (
                                <div className="field" id="text">
                                    <label className="label">Pertanyaan dengan Jawaban Singkat</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan pertanyaan"
                                            value={inputPertanyaan}
                                            onChange={(e) => setInputPertanyaan(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                            {jenisPertanyaan === "textarea" && (
                                <div className="field" id="textarea">
                                    <label className="label">Pertanyaan dengan Jawaban Panjang</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan pertanyaan"
                                            value={inputPertanyaan}
                                            onChange={(e) => setInputPertanyaan(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                            {jenisPertanyaan === "radio" && (
                                <div className="field" id="textarea">
                                <label className="label">Pertanyaan dengan Satu Pilihan Jawaban</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Masukkan pertanyaan"
                                        value={inputPertanyaan}
                                        onChange={(e) => setInputPertanyaan(e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Jumlah Pilihan Jawaban</label>
                                    <div className="control">
                                        <div className="select mb-4">
                                            <select
                                                value={jumlahPertanyaanRadio}
                                                onChange={(e) => handleJumlahPertanyaanRadio(e)}
                                            >
                                                {[...Array(9).keys()].map(num => (
                                                    <option key={num + 2} value={num + 2}>{num + 2}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {optionPertanyaanRadio.map((input, index) => (
                                            <div key={index} className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder={`Pilihan ${index + 1}`}
                                                    value={input}
                                                    onChange={(e) => handleOptionPertanyaanRadio(index, e)}
                                                />
                                            </div>
                                        ))}
                                </div>
                                </div>
                            </div>
                            )}
                            {jenisPertanyaan === "checkbox" && (
                                <div className="field" id="textarea">
                                <label className="label">Pertanyaan dengan Beberapa Pilihan Jawaban</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Masukkan pertanyaan"
                                        value={inputPertanyaan}
                                        onChange={(e) => setInputPertanyaan(e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Jumlah Pilihan Jawaban</label>
                                    <div className="control">
                                        <div className="select mb-4">
                                            <select
                                                value={jumlahPertanyaanCheckbox}
                                                onChange={(e) => handleJumlahPertanyaanCheckbox(e)}
                                            >
                                                {[...Array(9).keys()].map(num => (
                                                    <option key={num + 2} value={num + 2}>{num + 2}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {optionPertanyaanCheckbox.map((input, index) => (
                                            <div key={index} className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder={`Pilihan ${index + 1}`}
                                                    value={input}
                                                    onChange={(e) => handleOptionPertanyaanCheckbox(index, e)}
                                                />
                                            </div>
                                        ))}
                                </div>
                                </div>
                            </div>
                            )}

                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={() => tambahPertanyaan()}>Simpan</button>
                            <button className="button" onClick={() => cancelTambahPertanyaan()}>Batal</button>
                        </footer>
                    </div>
                </div>
            )}

            {showModalEdit && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={() => cancelEditPertanyaan()}></div>
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
                                            value={jenisPertanyaan}
                                            onChange={(e) => setJenisPertanyaan(e.target.value)}
                                        >
                                            <option value="">Pilih jenis pertanyaan</option>
                                            <option value="text">Pertanyaan Singkat</option>
                                            <option value="textarea">Pertanyaan Panjang</option>
                                            <option value="radio">Pertanyaan Pilihan Ganda (Satu Jawaban)</option>
                                            <option value="checkbox">Pertanyaan Pilihan Ganda (Beberapa Jawaban)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {jenisPertanyaan === "text" && (
                                <div className="field" id="text">
                                    <label className="label">Pertanyaan dengan Jawaban Singkat</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan pertanyaan"
                                            value={inputPertanyaan}
                                            onChange={(e) => setInputPertanyaan(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                            {jenisPertanyaan === "textarea" && (
                                <div className="field" id="textarea">
                                    <label className="label">Pertanyaan dengan Jawaban Panjang</label>
                                    <div className="control">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Masukkan pertanyaan"
                                            value={inputPertanyaan}
                                            onChange={(e) => setInputPertanyaan(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                            {jenisPertanyaan === "radio" && (
                                <div className="field" id="textarea">
                                <label className="label">Pertanyaan dengan Satu Pilihan Jawaban</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Masukkan pertanyaan"
                                        value={inputPertanyaan}
                                        onChange={(e) => setInputPertanyaan(e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Jumlah Pilihan Jawaban</label>
                                    <div className="control">
                                        <div className="select mb-4">
                                            <select
                                                value={jumlahPertanyaanRadio}
                                                onChange={(e) => handleJumlahPertanyaanRadio(e)}
                                            >
                                                {[...Array(9).keys()].map(num => (
                                                    <option key={num + 2} value={num + 2}>{num + 2}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {optionPertanyaanRadio.map((input, index) => (
                                            <div key={index} className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder={`Pilihan ${index + 1}`}
                                                    value={input}
                                                    onChange={(e) => handleOptionPertanyaanRadio(index, e)}
                                                />
                                            </div>
                                        ))}
                                </div>
                                </div>
                            </div>
                            )}
                            {jenisPertanyaan === "checkbox" && (
                                <div className="field" id="textarea">
                                <label className="label">Pertanyaan dengan Beberapa Pilihan Jawaban</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        placeholder="Masukkan pertanyaan"
                                        value={inputPertanyaan}
                                        onChange={(e) => setInputPertanyaan(e.target.value)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Jumlah Pilihan Jawaban</label>
                                    <div className="control">
                                        <div className="select mb-4">
                                            <select
                                                value={jumlahPertanyaanCheckbox}
                                                onChange={(e) => handleJumlahPertanyaanCheckbox(e)}
                                            >
                                                {[...Array(9).keys()].map(num => (
                                                    <option key={num + 2} value={num + 2}>{num + 2}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {optionPertanyaanCheckbox.map((input, index) => (
                                            <div key={index} className="control">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    placeholder={`Pilihan ${index + 1}`}
                                                    value={input}
                                                    onChange={(e) => handleOptionPertanyaanCheckbox(index, e)}
                                                />
                                            </div>
                                        ))}
                                </div>
                                </div>
                            </div>
                            )}

                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={() => editPertanyaan()}>Simpan</button>
                            <button className="button" onClick={() => cancelEditPertanyaan()}>Batal</button>
                        </footer>
                    </div>
                </div>
            )}

        </>
    );
};

export default BuatPertanyaan;
