import LaborJob from "../models/LaborJob.js";

const getAllLaborJob = async (req, res) => {
    try {
        const lowonganLabors = await LaborJob.find();
        res.status(200).json(lowonganLabors);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getLaborJob = async (req, res) => {
    try {
        const lowonganLabor = await LaborJob.findById(req.params.id);
        if (!lowonganLabor) {
            return res.status(404).json({ message: 'Lowongan Labor tidak ditemukan' });
        }
        res.status(200).json(lowonganLabor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLaborJobByLecturer = async (req, res) => {
    try {
        const lowonganLabor = await LaborJob.find({ penanggungJawab: req.params.id });
        if (!lowonganLabor || lowonganLabor.length === 0) {
            return res.status(404).json({ message: 'Lowongan Labor tidak ditemukan' });
        }
        res.status(200).json(lowonganLabor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const saveLaborJob = async (req, res) => {
    const { posisi, departemenId, penanggungJawab, deskripsi, tanggungJawab, persyaratan, gaji, tanggalPosting, tanggalTenggat, UploadCv, pertanyaanUmum, pertanyaan } = req.body;

    let perluGeneralQuestion = false;
    let perluTest = false;

    if (pertanyaanUmum && pertanyaanUmum.length > 0) {
        perluGeneralQuestion = true;
    }

    if (pertanyaan && pertanyaan.length > 0) {
        perluTest = true;
    }

    const lowonganLabor = new LaborJob({
        posisi,
        departemenId,
        penanggungJawab,
        deskripsi,
        tanggungJawab,
        persyaratan,
        gaji,
        tanggalPosting,
        tanggalTenggat,
        perluUploadCv,
        perluGeneralQuestion,
        perluTest,
        UploadCv,
        pertanyaanUmum,
        pertanyaan
    });

    try {
        const insertLaborJob = await lowonganLabor.save();
        res.status(201).json(insertLaborJob);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const updateLaborJob = async (req, res) => {
    try {
        const updatedLaborJob = await LaborJob.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLaborJob) {
            return res.status(404).json({ message: 'Lowongan Labor tidak ditemukan' });
        }
        res.status(200).json(updatedLaborJob);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllLaborJob, getLaborJob, getLaborJobByLecturer, saveLaborJob, updateLaborJob };

