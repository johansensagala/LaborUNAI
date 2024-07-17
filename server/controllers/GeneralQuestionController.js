import GeneralQuestion from "../models/GeneralQuestion.js";

const getAllGeneralQuestion = async (req, res) => {
    try {
        const pertanyaanUmum = await GeneralQuestion.find();
        res.status(200).json(pertanyaanUmum);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveGeneralQuestion = async (req, res) => {
    const pertanyaanUmum = new GeneralQuestion(req.body);
    try {
        const insertGeneralQuestion = await pertanyaanUmum.save();
        res.status(201).json(insertGeneralQuestion);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const saveManyGeneralQuestion = async (req, res) => {
    const pertanyaanUmumArray = req.body;
    if (!Array.isArray(pertanyaanUmumArray)) {
        return res.status(400).json({ message: "Input harus berupa array." });
    }

    try {
        const insertGeneralQuestion = await GeneralQuestion.insertMany(pertanyaanUmumArray);
        res.status(201).json(insertGeneralQuestion);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllGeneralQuestion, saveGeneralQuestion, saveManyGeneralQuestion };

