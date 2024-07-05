import BidangKeahlian from "../models/BidangKeahlian.js";

const getAllBidangKeahlian = async (req, res) => {
    try {
        const bidangKeahlian = await BidangKeahlian.find();
        res.status(200).json(bidangKeahlian);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

// const saveBidangKeahlian = async (req, res) => {
//     const bidangKeahlian = new BidangKeahlian(req.body);
//     try {
//         const insertBidangKeahlian = await bidangKeahlian.save();
//         res.status(201).json(insertBidangKeahlian);
//     } catch (e) {
//         res.status(400).json({ message: e.message });
//     }
// }

const saveBidangKeahlian = async (req, res) => {
    try {
        const insertedBidangKeahlian = await BidangKeahlian.insertMany(req.body);
        res.status(201).json(insertedBidangKeahlian);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllBidangKeahlian, saveBidangKeahlian };
