import ExpertiseGroup from "../models/ExpertiseGroup.js";

const getAllExpertiseGroup = async (req, res) => {
    try {
        const expertise = await ExpertiseGroup.find();
        res.status(200).json(expertise);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const saveExpertiseGroup = async (req, res) => {
    try {
        const insertedExpertiseGroup = await ExpertiseGroup.insertMany(req.body);
        res.status(201).json(insertedExpertiseGroup);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllExpertiseGroup, saveExpertiseGroup };
