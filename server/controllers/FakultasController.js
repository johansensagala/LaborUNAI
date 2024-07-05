import Fakultas from "../models/Fakultas.js";

const getAllFakultas = async (req, res) => {
    try {
        const fakultases = await Fakultas.find();
        res.status(200).json(fakultases);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveFakultas = async (req, res) => {
    const fakultas = new Fakultas(req.body);
    try {
        const insertFakultas = await fakultas.save();
        res.status(201).json(insertFakultas);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllFakultas, saveFakultas };
