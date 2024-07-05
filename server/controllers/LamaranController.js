import Lamaran from "../models/Lamaran.js";

const getAllLamaran = async (req, res) => {
    try {
        const lamarans = await Lamaran.find();
        res.status(200).json(lamarans);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getLamaran = async (req, res) => {
    try {
        const lamaran = await Lamaran.findById(req.params.id);
        if (!lamaran) {
            return res.status(404).json({ message: 'Lamaran tidak ditemukan' });
        }
        res.status(200).json(lamaran);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const saveLamaran = async (req, res) => {
    const { mahasiswaId, lowonganLaborId, keterampilan, catatanSingkat, status, tanggalKirim } = req.body;

    const lamaran = new Lamaran({
        mahasiswaId,
        lowonganLaborId,
        keterampilan,
        catatanSingkat,
        status,
        tanggalKirim,
    });

    try {
        const insertLamaran = await lamaran.save();
        res.status(201).json(insertLamaran);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllLamaran, getLamaran, saveLamaran };
