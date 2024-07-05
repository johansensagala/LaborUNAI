import Departemen from "../models/Departemen.js";

const getDepartemen = async (req, res) => {
    try {
        const departemen = await Departemen.findById(req.params.id);
        if (!departemen) {
            return res.status(404).json({ message: 'Departemen tidak ditemukan' });
        }

        res.status(200).json(departemen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDepartemenByDosen = async (req, res) => {
    try {        
        const departemen = await Departemen.find({ kepalaDepartemenId: req.params.id });
        
        if (!departemen || departemen.length === 0) {
            return res.status(404).json({ message: "Tidak ada departemen." });
        }

        res.status(200).json(departemen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const saveDepartemen = async (req, res) => {
    try {
        const insertedDepartemen = await Departemen.insertMany(req.body);
        res.status(201).json(insertedDepartemen);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getDepartemen, getDepartemenByDosen, saveDepartemen };
