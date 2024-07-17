import ExpertiseGroup from "../models/ExpertiseGroup.js";

const getAllExpertiseGroup = async (req, res) => {
    try {
        const bidangKeahlian = await ExpertiseGroup.find();
        res.status(200).json(bidangKeahlian);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// const saveExpertiseGroup = async (req, res) => {
//     const bidangKeahlian = new ExpertiseGroup(req.body);
//     try {
//         const insertExpertiseGroup = await bidangKeahlian.save();
//         res.status(201).json(insertExpertiseGroup);
//     } catch (e) {
//         res.status(400).json({ message: e.message });
//     }
// }

const saveExpertiseGroup = async (req, res) => {
    try {
        const insertedExpertiseGroup = await ExpertiseGroup.insertMany(req.body);
        res.status(201).json(insertedExpertiseGroup);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllExpertiseGroup, saveExpertiseGroup };
