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
        const application = await Application.findOne({ student: studentId, laborJob: laborJobId });
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
            student: studentId,
            laborJob: laborJobId,
            skills,
        });

        const insertApplication = await application.save();
        res.status(201).json(insertApplication);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const setNote = async (req, res) => {
    const { studentId, laborJobId } = req.params;

    if (!studentId || !laborJobId) {
        return res.status(400).json({ message: "Please fulfill studentId and laborJobId." });
    }

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        const application = await Application.findOne({ student: studentId, laborJob: laborJobId });
        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }

        application.note = req.body.note;
        await application.save();

        res.status(200).json({ message: "Note updated successfully.", application });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const setCv = async (req, res) => {
    const { studentId, laborJobId } = req.params;

    if (!studentId || !laborJobId) {
        return res.status(400).json({ message: "Please fulfill studentId and laborJobId." });
    }

    try {
        const application = await Application.findOne({ student: studentId, laborJob: laborJobId });
        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }

        if (req.file) {
            const { originalname, mimetype, size, filename } = req.file;

            application.cv = {
                originalName: originalname,
                mimeType: mimetype,
                size: size,
                fileName: filename
            };

            await application.save();
            res.status(200).json({ message: "CV uploaded successfully.", application });
        } else {
            res.status(400).json({ message: "No file uploaded." });
        }
    } catch (e) {
        console.error(e.message); // Log error for debugging
        res.status(500).json({ message: "Internal server error." });
    }
};

export { getAllApplication, getApplication, getApplicationByStudentAndLaborJob, saveApplication, setNote, startApply, setCv };

