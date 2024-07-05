import Jurusan from "../models/Jurusan.js";

const getAllJurusan = async (req, res) => {
    try {
        const jurusans = await Jurusan.find();
        res.status(200).json(jurusans);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveJurusan = async (req, res) => {
    const jurusan = new Jurusan(req.body);
    try {
        const insertJurusan = await jurusan.save();
        res.status(201).json(insertJurusan);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllJurusan, saveJurusan };
