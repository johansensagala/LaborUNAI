import LowonganLabor from "../models/LowonganLabor.js";

const getAllLowonganLabor = async (req, res) => {
    try {
        const lowonganLabors = await LowonganLabor.find();
        res.status(200).json(lowonganLabors);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getLowonganLabor = async (req, res) => {
    try {
        const lowonganLabor = await LowonganLabor.findById(req.params.id);
        if (!lowonganLabor) {
            return res.status(404).json({ message: 'Lowongan Labor tidak ditemukan' });
        }
        res.status(200).json(lowonganLabor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLowonganLaborByDosen = async (req, res) => {
    try {
        const lowonganLabor = await LowonganLabor.find({ penanggungJawab: req.params.id });
        if (!lowonganLabor || lowonganLabor.length === 0) {
            return res.status(404).json({ message: 'Lowongan Labor tidak ditemukan' });
        }
        res.status(200).json(lowonganLabor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const saveLowonganLabor = async (req, res) => {
    const { posisi, departemenId, penanggungJawab, deskripsi, tanggungJawab, persyaratan, gaji, tanggalPosting, tanggalTenggat, perluTest, tersedia, pertanyaan } = req.body;

    const lowonganLabor = new LowonganLabor({
        posisi,
        departemenId,
        penanggungJawab,
        deskripsi,
        tanggungJawab,
        persyaratan,
        gaji,
        tanggalPosting,
        tanggalTenggat,
        perluTest,
        tersedia,
        pertanyaan
    });

    try {
        const insertLowonganLabor = await lowonganLabor.save();
        res.status(201).json(insertLowonganLabor);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllLowonganLabor, getLowonganLabor, getLowonganLaborByDosen, saveLowonganLabor };
