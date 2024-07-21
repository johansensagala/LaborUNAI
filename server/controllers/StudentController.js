import bcrypt from "bcrypt";
import path from 'path';
import Student from "../models/Student.js";

const getAllStudent = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveStudent = async (req, res) => {
    const { name, nim, password, email, phoneNumber, major, cohort, skills } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
        name,
        nim,
        password: hashedPassword,
        email,
        phoneNumber,
        major,
        cohort,
        skills,
    });

    try {
        const insertStudent = await student.save();
        res.status(201).json(insertStudent);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const getSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        const skills = student.skills || [];

        res.status(200).json(skills);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = req.body.newSkill;

        const updatedSkill = await Student.findByIdAndUpdate(
            id,
            { $set: { skills: skill } },
            { new: true }
        );

        res.status(200).json(updatedSkill);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getCv = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        const cv = student.cv && student.cv.fileName ? "public/cvProfile/" + student.cv.fileName : null;

        res.status(200).json(cv);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const uploadCv = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        const { id } = req.params;
        const cv = req.file;
        const { originalname, mimetype, size, filename } = cv;

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (student.cv) {
            student.cv.originalName = originalname;
            student.cv.mimeType = mimetype;
            student.cv.size = size;
            student.cv.fileName = filename;
        } else {
            student.cv = {
                originalName: originalname,
                mimeType: mimetype,
                size: size,
                fileName: filename
            };
        }

        const updatedStudent = await student.save();

        res.status(200).json({ message: 'Upload success.', updatedStudent });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const sendCv = async (req, res) => {
    try {
        const cvDir = path.join(__dirname, 'files/cvProfile');

        const { filename } = req.params;
        const filePath = path.join(cvDir, filename);
      
        res.sendFile(filePath);      
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const deleteCv = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        student.cv = undefined;
        await student.save();

        res.status(200).json({ message: "CV deleted." });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export { deleteCv, getAllStudent, getCv, getSkill, saveStudent, sendCv, updateSkill, uploadCv };

