import Application from "../models/Application.js";
import Student from "../models/Student.js";

const getAllApplication = async (req, res) => {
    try {
        const lamarans = await Application.find();
        res.status(200).json(lamarans);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getApplication = async (req, res) => {
    try {
        const lamaran = await Application.findById(req.params.id);
        if (!lamaran) {
            return res.status(404).json({ message: 'Application tidak ditemukan' });
        }
        res.status(200).json(lamaran);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getApplicationByStudentAndLaborJob = async (req, res) => {
    const { mahasiswaId, lowonganLaborId } = req.params;

    try {
        const lamaran = await Application.findOne({ mahasiswaId, lowonganLaborId });
        if (!lamaran) {
            return res.status(404).json({ message: 'Application tidak ditemukan' });
        }
        res.status(200).json(lamaran);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const saveApplication = async (req, res) => {
    const { mahasiswaId, lowonganLaborId, keterampilan, catatanSingkat, status, tanggalKirim } = req.body;

    const lamaran = new Application({
        mahasiswaId,
        lowonganLaborId,
        keterampilan,
        catatanSingkat,
        status,
        tanggalKirim,
    });

    try {
        const insertApplication = await lamaran.save();
        res.status(201).json(insertApplication);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const startLamar = async (req, res) => {
    const { mahasiswaId, lowonganLaborId } = req.params;

    if (!mahasiswaId || !lowonganLaborId) {
        return res.status(400).json({ message: "Mohon lengkapi mahasiswaId dan lowonganLaborId." });
    }

    try {
        const mahasiswa = await Student.findById(mahasiswaId);
        if (!mahasiswa) {
            return res.status(404).json({ message: "Student tidak ditemukan." });
        }

        const keterampilan = mahasiswa.keterampilan || "";

        const lamaran = new Application({
            mahasiswaId,
            lowonganLaborId,
            keterampilan,
        });

        const insertApplication = await lamaran.save();
        res.status(201).json(insertApplication);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllApplication, getApplication, saveApplication, startLamar };

