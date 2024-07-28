import GeneralQuestion from "../models/GeneralQuestion.js";

const getAllGeneralQuestion = async (req, res) => {
    try {
        const generalQuestion = await GeneralQuestion.find();
        res.status(200).json(generalQuestion);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveGeneralQuestion = async (req, res) => {
    const generalQuestion = new GeneralQuestion(req.body);
    try {
        const insertGeneralQuestion = await generalQuestion.save();
        res.status(201).json(insertGeneralQuestion);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const saveManyGeneralQuestion = async (req, res) => {
    const generalQuestionArray = req.body;
    if (!Array.isArray(generalQuestionArray)) {
        return res.status(400).json({ message: "Input must be an array." });
    }

    try {
        const insertGeneralQuestion = await GeneralQuestion.insertMany(generalQuestionArray);
        res.status(201).json(insertGeneralQuestion);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const getQuestionByCode = async (req, res) => {
    const { code } = req.params;
    try {
        const generalQuestion = await GeneralQuestion.findOne({ code });
        if (!generalQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(generalQuestion);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export { getAllGeneralQuestion, saveGeneralQuestion, saveManyGeneralQuestion, getQuestionByCode };

