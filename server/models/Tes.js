import mongoose from 'mongoose';

const TesSchema = new mongoose.Schema({
    lowonganLaborId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LowonganLabor',
        required: true,
    },
    pertanyaan: [{
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
    collection: 'Tes',
    timestamps: true,
});

const Tes = mongoose.model('Tes', TesSchema);

export default Tes;
