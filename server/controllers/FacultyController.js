import Faculty from "../models/Faculty.js";

const getAllFaculty = async (req, res) => {
    try {
        const fakultases = await Faculty.find();
        res.status(200).json(fakultases);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveFaculty = async (req, res) => {
    const fakultas = new Faculty(req.body);
    try {
        const insertFaculty = await fakultas.save();
        res.status(201).json(insertFaculty);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllFaculty, saveFaculty };
