import bcrypt from "bcrypt";
import Lecturer from "../models/Lecturer.js";

const getAllLecturer = async (req, res) => {
    try {
        const lecturer = await Lecturer.find();
        res.status(200).json(lecturer);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveLecturer = async (req, res) => {
    const { name, nip, password, email, phoneNumber, expertise } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const lecturer = new Lecturer({
        name,
        nip,
        password: hashedPassword,
        email,
        phoneNumber,
        expertise
    });

    try {
        const insertLecturer = await lecturer.save();
        res.status(201).json(insertLecturer);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllLecturer, saveLecturer };

