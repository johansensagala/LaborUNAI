import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    number: {
        type: Number,
    },
    question: {
        type: String,
    },
    questionType: {
        type: String,
    },
    numberOfQuestionRadio: {
        type: Number,
    },
    numberOfQuestionCheckbox: {
        type: Number,
    },
    optionsOfQuestionRadio: {
        type: [String],
    },
    optionsOfQuestionCheckbox: {
        type: [String],
    },
});

const LaborJobSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecturer',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    responsibility: {
        type: [String],
        required: true,
    },
    requirements: {
        type: [String],
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    postDate: {
        type: Date,
        required: true,
    },
    deadline: {
        type: Date,
        required: true,
    },
    needCvUpload: {
        type: Boolean,
        required: true,
        default: false,
    },
    needGeneralQuestion: {
        type: Boolean,
        required: true,
        default: false,
    },
    needTest: {
        type: Boolean,
        required: true,
        default: false,
    },
    needNote: {
        type: Boolean,
        required: true,
        default: false,
    },
    available: {
        type: Boolean,
        default: true,
        required: true,
    },
    generalQuestion: {
        type: [String],
        ref: 'GeneralQuestion',
    },
    questions: {
        type: [QuestionSchema],
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    },
    deletedAt: {
        type: Date,
    },
}, {
    collection: 'LaborJob',
    timestamps: true,
});

const LaborJob = mongoose.model('LaborJob', LaborJobSchema);

export default LaborJob;
