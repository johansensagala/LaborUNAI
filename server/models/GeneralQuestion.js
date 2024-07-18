import mongoose from 'mongoose';

const GeneralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
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
    collection: 'GeneralQuestion',
    timestamps: true,
});

const GeneralQuestion = mongoose.model('GeneralQuestion', GeneralQuestionSchema);

export default GeneralQuestion;
