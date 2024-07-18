import LaborJob from "../models/LaborJob.js";

const getAllLaborJob = async (req, res) => {
    try {
        const laborJobs = await LaborJob.find();
        res.status(200).json(laborJobs);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getLaborJob = async (req, res) => {
    try {
        const laborJob = await LaborJob.findById(req.params.id);
        if (!laborJob) {
            return res.status(404).json({ message: 'Labor Job not found.' });
        }
        res.status(200).json(laborJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLaborJobByLecturer = async (req, res) => {
    try {
        const laborJob = await LaborJob.find({ recruiter: req.params.id });
        if (!laborJob || laborJob.length === 0) {
            return res.status(404).json({ message: 'Labor Job not found.' });
        }
        res.status(200).json(laborJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const saveLaborJob = async (req, res) => {
    const { position, 
        department, 
        recruiter, 
        description, 
        responsibilities, 
        requirements, 
        salary, 
        postDate, 
        deadline, 
        needCvUpload, 
        generalQuestion, 
        question } = req.body;

    let needGeneralQuestion = false;
    let needTest = false;

    if (generalQuestion && generalQuestion.length > 0) {
        needGeneralQuestion = true;
    }

    if (question && question.length > 0) {
        needTest = true;
    }

    const laborJob = new LaborJob({
        position,
        department,
        recruiter,
        description,
        responsibilities,
        requirements,
        salary,
        postDate,
        deadline,
        needCvUpload,
        needGeneralQuestion,
        needTest,
        generalQuestion,
        question
    });

    try {
        const insertLaborJob = await laborJob.save();
        res.status(201).json(insertLaborJob);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const updateLaborJob = async (req, res) => {
    try {
        const updatedLaborJob = await LaborJob.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLaborJob) {
            return res.status(404).json({ message: 'Labor Job not found.' });
        }
        res.status(200).json(updatedLaborJob);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

export { getAllLaborJob, getLaborJob, getLaborJobByLecturer, saveLaborJob, updateLaborJob };

