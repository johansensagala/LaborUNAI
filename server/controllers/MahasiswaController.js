import bcrypt from "bcrypt";
import Mahasiswa from "../models/Mahasiswa.js";
import path from 'path';

const getAllMahasiswa = async (req, res) => {
    try {
        const mahasiswas = await Mahasiswa.find();
        res.status(200).json(mahasiswas);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveMahasiswa = async (req, res) => {
    const { nama, nim, password, email, noTelp, jurusanId, angkatan, keterampilan } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const mahasiswa = new Mahasiswa({
        nama,
        nim,
        password: hashedPassword,
        email,
        noTelp,
        jurusanId,
        angkatan,
        keterampilan,
    });

    try {
        const insertMahasiswa = await mahasiswa.save();
        res.status(201).json(insertMahasiswa);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const getKeterampilan = async (req, res) => {
    try {
        const { id } = req.params;
        const mahasiswa = await Mahasiswa.findById(id);

        if (!mahasiswa) {
            return res.status(404).json({ message: "Mahasiswa tidak ditemukan." });
        }

        const keterampilan = mahasiswa.keterampilan || [];

        res.status(200).json(keterampilan);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const updateKeterampilan = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = req.body.newSkill;

        const updatedKeterampilan = await Mahasiswa.findByIdAndUpdate(
            id,
            { $set: { keterampilan: skill } },
            { new: true }
        );

        res.status(200).json(updatedKeterampilan);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getCv = async (req, res) => {
    try {
        const { id } = req.params;
        const mahasiswa = await Mahasiswa.findById(id);

        if (!mahasiswa) {
            return res.status(404).json({ message: "Mahasiswa tidak ditemukan." });
        }

        const cv = mahasiswa.cv && mahasiswa.cv.fileName ? "public/cv/" + mahasiswa.cv.fileName : null;

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

        const mahasiswa = await Mahasiswa.findById(id);

        if (!mahasiswa) {
            return res.status(404).json({ message: 'Mahasiswa not found' });
        }

        if (mahasiswa.cv) {
            mahasiswa.cv.originalName = originalname;
            mahasiswa.cv.mimeType = mimetype;
            mahasiswa.cv.size = size;
            mahasiswa.cv.fileName = filename;
        } else {
            mahasiswa.cv = {
                originalName: originalname,
                mimeType: mimetype,
                size: size,
                fileName: filename
            };
        }

        const updatedMahasiswa = await mahasiswa.save();

        res.status(200).json({ message: 'Upload success!', updatedMahasiswa });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const sendCv = async (req, res) => {
    try {
        const cvDir = path.join(__dirname, 'files/cv');

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
        const mahasiswa = await Mahasiswa.findById(id);

        if (!mahasiswa) {
            return res.status(404).json({ message: "Mahasiswa tidak ditemukan." });
        }

        mahasiswa.cv = undefined;
        await mahasiswa.save();

        res.status(200).json({ message: "CV berhasil dihapus." });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export { getAllMahasiswa, saveMahasiswa, getKeterampilan, updateKeterampilan, getCv, uploadCv, sendCv, deleteCv };
