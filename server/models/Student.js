import mongoose from 'mongoose';
import CvSchema from './Cv.js';

const StudentSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    nim: {
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
    noTelp: {
        type: String,
        required: true,
    },
    jurusanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Major',
        required: true,
    },
    angkatan: {
        type: String,
        required: true,
    },
    keterampilan: {
        type: [String],
        required: true,
    },
    cv: {
        type: CvSchema,
    },
    riwayatLabor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LaborHistory',
    }],
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    },
    deletedAt: {
        type: Date,
    },
}, {
    collection: 'Student',
    timestamps: true,
});

const Student = mongoose.model('Student', StudentSchema);

export default Student;
