import mongoose from 'mongoose';

const LecturerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    nip: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    expertiseGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExpertiseGroup',
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
    collection: 'Lecturer',
    timestamps: true,
});

const Lecturer = mongoose.model('Lecturer', LecturerSchema);

export default Lecturer;
