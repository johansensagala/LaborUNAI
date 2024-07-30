import fs from 'fs';
import path from 'path';
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
        console.error(e.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

const setCvInProfile = async (req, res) => {
    const { studentId, laborJobId } = req.params;

    if (!studentId || !laborJobId) {
        return res.status(400).json({ message: "Please fulfill studentId and laborJobId." });
    }

    try {
        const application = await Application.findOne({ student: studentId, laborJob: laborJobId });
        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        const cvProfile = student.cv;
        if (!cvProfile) {
            return res.status(404).json({ message: "CV not found in student profile." });
        }

        const sourcePath = path.join('files', 'cvProfile', cvProfile.fileName);
        const destinationPath = path.join('files', 'cvApplication', cvProfile.fileName);

        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destinationPath);

            application.cv = {
                originalName: cvProfile.originalName,
                mimeType: cvProfile.mimeType,
                size: cvProfile.size,
                fileName: cvProfile.fileName
            };

            await application.save();
            res.status(200).json({ message: "CV updated in application successfully.", application });
        } else {
            return res.status(404).json({ message: "CV file not found in cvProfile directory." });
        }
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

const setGeneralQuestionAnswers = async (req, res) => {
    const { studentId, laborJobId } = req.params;
    const { generalQuestionAnswers } = req.body;

    if (!studentId || !laborJobId) {
        return res.status(400).json({ message: "Please provide studentId and laborJobId." });
    }

    if (!Array.isArray(generalQuestionAnswers)) {
        return res.status(400).json({ message: "Invalid format for generalQuestionAnswers." });
    }

    try {
        const application = await Application.findOne({ student: studentId, laborJob: laborJobId });
        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }

        application.generalQuestionAnswers = generalQuestionAnswers;

        await application.save();

        res.status(200).json({ message: "General Question answers updated successfully.", application });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

const setTestAnswers = async (req, res) => {
    const { studentId, laborJobId } = req.params;
    const { testAnswers } = req.body;

    if (!studentId || !laborJobId) {
        return res.status(400).json({ message: "Please provide studentId and laborJobId." });
    }

    if (!Array.isArray(testAnswers)) {
        return res.status(400).json({ message: "Invalid format for testAnswers." });
    }

    try {
        const application = await Application.findOne({ student: studentId, laborJob: laborJobId });
        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }

        application.testAnswers = testAnswers;

        await application.save();

        res.status(200).json({ message: "Test answers updated successfully.", application });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

const startTest = async (req, res) => {
    const { studentId, laborJobId } = req.params;

    if (!studentId || !laborJobId) {
        return res.status(400).json({ message: "Please provide studentId and laborJobId." });
    }

    try {
        const application = await Application.findOne({ student: studentId, laborJob: laborJobId });
        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }

        application.isTestStarted = true;

        await application.save();

        res.status(200).json({ message: "Test answers updated successfully.", application });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

const finishApplication = async (req, res) => {
    const { studentId, laborJobId } = req.params;

    if (!studentId || !laborJobId) {
        return res.status(400).json({ message: "Please provide studentId and laborJobId." });
    }

    try {
        const application = await Application.findOne({ student: studentId, laborJob: laborJobId });
        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }

        application.status = "SUBMITTED";
        application.sentDate = new Date();

        await application.save();

        res.status(200).json({ message: "Test answers updated successfully.", application });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error." });
    }
};

export {
    finishApplication,
    getAllApplication,
    getApplication,
    getApplicationByStudentAndLaborJob,
    saveApplication,
    setCv,
    setCvInProfile,
    setGeneralQuestionAnswers,
    setNote,
    setTestAnswers,
    startApply,
    startTest
};

