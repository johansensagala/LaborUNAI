import bcrypt from "bcrypt";
import Lecturer from "../models/Lecturer.js";

const getAllLecturer = async (req, res) => {
    try {
        const dosen = await Lecturer.find();
        res.status(200).json(dosen);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveLecturer = async (req, res) => {
    const { nama, nip, password, email, noTelp, bidangKeahlianId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const dosen = new Lecturer({
        nama,
        nip,
        password: hashedPassword,
        email,
        noTelp,
        bidangKeahlianId
    });

    try {
        const insertLecturer = await dosen.save();
        res.status(201).json(insertLecturer);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllLecturer, saveLecturer };

