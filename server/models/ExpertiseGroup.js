import mongoose from 'mongoose';

const ExpertiseGroupSchema = new mongoose.Schema({
    namaBidang: {
        type: String,
        required: true,
    },
    jurusanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Major',
        required: true,
    },
    deskripsi: {
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
    collection: 'ExpertiseGroup',
    timestamps: true,
});

const ExpertiseGroup = mongoose.model('ExpertiseGroup', ExpertiseGroupSchema);

export default ExpertiseGroup;
