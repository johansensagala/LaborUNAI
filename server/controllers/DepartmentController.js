import Department from "../models/Department.js";

const getDepartment = async (req, res) => {
    try {
        const departemen = await Department.findById(req.params.id);
        if (!departemen) {
            return res.status(404).json({ message: 'Department tidak ditemukan' });
        }

        res.status(200).json(departemen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDepartmentByLecturer = async (req, res) => {
    try {        
        const departemen = await Department.find({ kepalaDepartmentId: req.params.id });
        
        if (!departemen || departemen.length === 0) {
            return res.status(404).json({ message: "Tidak ada departemen." });
        }

        res.status(200).json(departemen);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const saveDepartment = async (req, res) => {
    try {
        const insertedDepartment = await Department.insertMany(req.body);
        res.status(201).json(insertedDepartment);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getDepartment, getDepartmentByLecturer, saveDepartment };

