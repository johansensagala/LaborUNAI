import Department from "../models/Department.js";

const getDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found.' });
        }

        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDepartmentByLecturer = async (req, res) => {
    try {        
        const department = await Department.find({ headOfDepartment: req.params.id });
        
        if (!department || department.length === 0) {
            return res.status(404).json({ message: "Department not found." });
        }

        res.status(200).json(department);
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

