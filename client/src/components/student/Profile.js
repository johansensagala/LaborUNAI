import axios from "axios";
import React, { useContext, useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { StudentContext } from '../../context/StudentContext';
import Navbar from '../../layouts/Navbar';

const Profil = () => {
  const { student } = useContext(StudentContext);
  const [showModal, setShowModal] = useState(false);
  const [skill, setSkill] = useState([]);
  const [newSkill, setNewSkill] = useState([]);
  const [cv, setCv] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showChangeCv, setShowChangeCv] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchSkill();
    fetchCv();
  }, [student]);

  const fetchCv = async () => {
    try {
      if (student) {
        const response = await axios.get(`http://localhost:5000/cv/${student.id}/get`);

        if (response) {
          setCv(response.data);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Gagal memuat CV.', 'error');
    }
  };

  const fetchSkill = async () => {
    try {
      if (student) {
        const response = await axios.get(`http://localhost:5000/student/${student.id}/get-skill`);
        setSkill(response.data);
        setNewSkill(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Gagal memuat keterampilan.', 'error');
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadCV = async () => {
    if (!selectedFile) {
      Swal.fire('Peringatan', 'Silakan pilih file CV terlebih dahulu.', 'warning');
      return;
    }

    // Validasi tipe file
    const allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(selectedFile.name)) {
      Swal.fire('Peringatan', 'File harus berformat PDF.', 'warning');
      return;
    }

    // Validasi ukuran file
    const maxFileSize = 1024 * 1024; // 1 MB
    if (selectedFile.size > maxFileSize) {
      Swal.fire('Peringatan', 'File tidak boleh melebihi 1 MB.', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('cv', selectedFile);

    try {
      await axios.put(`http://localhost:5000/cv/${student.id}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      fetchCv();
      setCv(cv);
      Swal.fire('Sukses', 'CV berhasil diunggah.', 'success');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Gagal mengunggah CV.', 'error');
    }
  };

  const handleDeleteCV = async () => {
    try {
      const result = await Swal.fire({
        title: 'Anda yakin?',
        text: "Anda tidak dapat mengembalikan aksi ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/cv/${student.id}/delete`);

        Swal.fire('Sukses', 'CV berhasil dihapus.', 'success');
        setCv(null);
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Gagal menghapus CV.', 'error');
    }
  };

  const handleCloseModal = () => {
    const isSkillChanged = JSON.stringify(skill) !== JSON.stringify(newSkill);

    if (isSkillChanged) {
      Swal.fire({
        title: 'Batalkan Perubahan?',
        text: 'Apakah anda yakin ingin membatalkan perubahan?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya!'
      }).then((result) => {
        if (result.isConfirmed) {
          setNewSkill(skill);
          setShowModal(false);
        }
      });
    } else {
      setShowModal(false);
    }
  };

  const handleDeleteSkill = (index) => {
    const updatedSkill = [...newSkill];
    updatedSkill.splice(index, 1);
    setNewSkill(updatedSkill);
  };

  const handleAddSkill = () => {
    Swal.fire({
      title: 'Masukkan keterampilan Anda:',
      input: 'text',
      inputPlaceholder: 'Keterampilan',
      showCancelButton: true,
      confirmButtonText: 'Tambah',
      cancelButtonText: 'Batal',
      inputValidator: (value) => {
        if (!value) {
          return 'Keterampilan tidak boleh kosong!'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newSkillValue = result.value.toLowerCase();
        const isSkillExists = newSkill.some(newSkill => newSkill.toLowerCase() === newSkillValue);

        if (isSkillExists) {
          Swal.fire('Keterampilan sudah ada!', '', 'error');
        } else {
          setNewSkill([...newSkill, result.value]);
        }
      }
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/student/${student.id}/update-skill`, { newSkill });
      console.log(response.data);
      setSkill(newSkill);
      setShowModal(false);
      Swal.fire('Sukses', 'Perubahan keterampilan disimpan.', 'success');
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Gagal menyimpan perubahan keterampilan.', 'error');
    }
  };

  return (
    <>
      <Navbar />
      <div className="columns is-centered">
        <div className="box column is-half p-5 m-6" style={{ background: '#f5f5f5', color: '#333' }}>

          <div className="is-size-4 has-text-centered has-text-weight-bold">
            Profil
          </div>

          <div className="box p-5 mt-5">
            <div className="title is-4 has-text-weight-semibold">Informasi Pribadi</div>
            {student ? (
              <div className="columns">
                <div className="column">
                  <div className="my-2">
                    <div className="is-uppercase has-text-gray has-text-weight-bold is-size-6">
                      Nama
                    </div>
                    <div className="is-size-6">
                      {student.name}
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="is-uppercase has-text-gray has-text-weight-bold is-size-6">
                      NIM
                    </div>
                    <div className="is-size-6">
                      {student.nim}
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="is-uppercase has-text-gray has-text-weight-bold is-size-6">
                      Email
                    </div>
                    <div className="is-size-6">
                      {student.email}
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="my-2">
                    <div className="is-uppercase has-text-gray has-text-weight-bold is-size-6">
                      No. Telepon
                    </div>
                    <div className="is-size-6">
                      {student.phoneNumber}
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="is-uppercase has-text-gray has-text-weight-bold is-size-6">
                      Major
                    </div>
                    <div className="is-size-6">
                      {student.major}
                    </div>
                  </div>
                  <div className="my-2">
                    <div className="is-uppercase has-text-gray has-text-weight-bold is-size-6">
                      Angkatan
                    </div>
                    <div className="is-size-6">
                      {student.cohort}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>

          <div className="box p-5">
            <div className="title is-4 has-text-weight-semibold">Keterampilan</div>
            {skill.length > 0 ? (
              <div className="tags">
                {skill.map((skill, index) => (
                  <span key={index} className="tag is-primary is-medium m-1">{skill}</span>
                ))}
              </div>
            ) : (
              <p>Belum ada keterampilan</p>
            )}
            <button className="button is-info mt-3" onClick={() => setShowModal(true)}>Edit Keterampilan</button>
          </div>

          <div className="box p-5">
            <div className="title is-4 has-text-weight-semibold">Curriculum Vitae</div>
            {cv && Object.keys(cv).length > 0 ? (
              <div className="is-6 mt-4">
                <div className="subtitle has-text-weight-bold has-text-success">
                  CV Anda sudah diunggah.
                </div>
                <div className="my-2">
                  <button className="button is-info" onClick={() => setShowPdfModal(true)}>
                    Lihat CV
                  </button>
                </div>
                <div className="my-2">
                  <button className="button is-warning" onClick={() => setShowChangeCv(prevState => !prevState)}>
                    Ganti CV
                  </button>
                </div>
                {showChangeCv && (
                  <>
                    <div className="file has-name is-fullwidth">
                      <label className="file-label">
                        <input className="file-input" type="file" name="cv" onChange={handleFileChange} />
                        <span className="file-cta">
                          <span className="file-icon">
                            <i className="fas fa-cloud-upload-alt"></i>
                          </span>
                          <span className="file-label">CV</span>
                        </span>
                        <span className="file-name">{selectedFile ? selectedFile.name : 'Pilih file CV'}</span>
                      </label>
                    </div>
                    <div className="field mt-4">
                      <div className="control">
                        <button className="button is-info" type="submit" onClick={handleUploadCV}>Unggah CV</button>
                      </div>
                    </div>
                  </>
                )}
                <div className="my-2">
                  <button className="button is-danger" onClick={() => handleDeleteCV()}>
                    Hapus CV
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="subtitle has-text-weight-bold has-text-danger is-6 mt-4">
                  Anda belum memasukkan CV anda. Masukkan sekarang!
                </div>
                <div className="file has-name is-fullwidth">
                  <label className="file-label">
                    <input className="file-input" type="file" name="cv" onChange={handleFileChange} />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-cloud-upload-alt"></i>
                      </span>
                      <span className="file-label">CV</span>
                    </span>
                    <span className="file-name">{selectedFile ? selectedFile.name : 'Pilih file CV'}</span>
                  </label>
                </div>
                <div className="field mt-4">
                  <div className="control">
                    <button className="button is-info" type="submit" onClick={handleUploadCV}>Unggah CV</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={handleCloseModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title has-text-centered">Edit Keterampilan</p>
              <button className="delete" aria-label="close" onClick={handleCloseModal}></button>
            </header>
            <section className="modal-card-body">
              <div className="tags">
                {newSkill.map((newSkill, index) => (
                  <div key={index} className="tag is-info is-medium is-flex is-align-items-center">
                    {newSkill}
                    <button className="delete is-small ml-1" onClick={() => handleDeleteSkill(index)}></button>
                  </div>
                ))}
              </div>
              <button className="button is-info mt-3" onClick={handleAddSkill}>Tambah Keterampilan</button>
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
              <button className="button is-success" onClick={handleSaveChanges}>Simpan Perubahan</button>
            </footer>
          </div>
        </div>
      )}

      {showPdfModal && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setShowPdfModal(false)}></div>
          <div className="modal-card" style={{ width: '60vw', height: '90vh' }}>
            <header className="modal-card-head">
              <p className="modal-card-title has-text-centered">CV Anda</p>
              <button className="delete" aria-label="close" onClick={() => setShowPdfModal(false)}></button>
            </header>
            <section className="modal-card-body" style={{ overflow: 'hidden' }}>
              <embed src={`http://localhost:5000/${cv}`} type="application/pdf" width="100%" height="100%" />
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Profil;
