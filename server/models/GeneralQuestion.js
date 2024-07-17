import mongoose from 'mongoose';

const GeneralQuestionSchema = new mongoose.Schema({
    pertanyaan: {
        type: String,
        required: true,
    },
    kode: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    tujuan: {
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
