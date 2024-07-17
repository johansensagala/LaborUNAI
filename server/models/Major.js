import mongoose from 'mongoose';

const MajorSchema = new mongoose.Schema({
    namaMajor: {
        type: String,
        required: true,
    },
    fakultasId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
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
    collection: 'Major',
    timestamps: true,
});

const Major = mongoose.model('Major', MajorSchema);

export default Major;
