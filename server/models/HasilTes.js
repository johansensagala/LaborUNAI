import mongoose from 'mongoose';

const HasilTesSchema = new mongoose.Schema({
    lamaranId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lamaran',
        required: true,
    },
    jawaban: [{
        type: String,
        required: true,
    }],
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
}, {
    collection: 'HasilTes',
    timestamps: true,
});

const HasilTes = mongoose.model('HasilTes', HasilTesSchema);

export default HasilTes;
