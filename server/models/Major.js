import mongoose from 'mongoose';

const MajorSchema = new mongoose.Schema({
    majorName: {
        type: String,
        required: true,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
    },
    description: {
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
