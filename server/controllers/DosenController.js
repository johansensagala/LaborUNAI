import bcrypt from "bcrypt";
import Dosen from "../models/Dosen.js";

const getAllDosen = async (req, res) => {
    try {
        const dosen = await Dosen.find();
        res.status(200).json(dosen);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveDosen = async (req, res) => {
    const { nama, nip, password, email, noTelp, bidangKeahlianId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const dosen = new Dosen({
        nama,
        nip,
        password: hashedPassword,
        email,
        noTelp,
        bidangKeahlianId
    });

    try {
        const insertDosen = await dosen.save();
        res.status(201).json(insertDosen);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllDosen, saveDosen };
