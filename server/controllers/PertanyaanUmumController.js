import PertanyaanUmum from "../models/PertanyaanUmum.js";

const getAllPertanyaanUmum = async (req, res) => {
    try {
        const pertanyaanUmum = await PertanyaanUmum.find();
        res.status(200).json(pertanyaanUmum);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const savePertanyaanUmum = async (req, res) => {
    const pertanyaanUmum = new PertanyaanUmum(req.body);
    try {
        const insertPertanyaanUmum = await pertanyaanUmum.save();
        res.status(201).json(insertPertanyaanUmum);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const saveManyPertanyaanUmum = async (req, res) => {
    const pertanyaanUmumArray = req.body;
    if (!Array.isArray(pertanyaanUmumArray)) {
        return res.status(400).json({ message: "Input harus berupa array." });
    }

    try {
        const insertPertanyaanUmum = await PertanyaanUmum.insertMany(pertanyaanUmumArray);
        res.status(201).json(insertPertanyaanUmum);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllPertanyaanUmum, savePertanyaanUmum, saveManyPertanyaanUmum };
