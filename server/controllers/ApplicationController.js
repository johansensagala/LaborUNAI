import Application from "../models/Application.js";
import Student from "../models/Student.js";

const getAllApplication = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getApplicationByStudentAndLaborJob = async (req, res) => {
    const { studentId, laborJobId } = req.params;

    try {
        const application = await Application.findOne({ studentId, laborJobId });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const saveApplication = async (req, res) => {
    const { studentId, laborJobId, skills, note, status, sentDate } = req.body;

    const application = new Application({
        studentId,
        laborJobId,
        skills,
        note,
        status,
        sentDate,
    });

    try {
        const insertApplication = await application.save();
        res.status(201).json(insertApplication);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const startApply = async (req, res) => {
    const { studentId, laborJobId } = req.params;

    if (!studentId || !laborJobId) {
        return res.status(400).json({ message: "Please fullfill studentId and laborJobId." });
    }

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        const skills = student.skills || "";

        const application = new Application({
            studentId,
            laborJobId,
            skills,
        });

        const insertApplication = await application.save();
        res.status(201).json(insertApplication);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllApplication, getApplication, saveApplication, startApply };

