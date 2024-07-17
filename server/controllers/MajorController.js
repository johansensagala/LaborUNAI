import Major from "../models/Major.js";

const getAllMajor = async (req, res) => {
    try {
        const jurusans = await Major.find();
        res.status(200).json(jurusans);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveMajor = async (req, res) => {
    const jurusan = new Major(req.body);
    try {
        const insertMajor = await jurusan.save();
        res.status(201).json(insertMajor);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllMajor, saveMajor };

