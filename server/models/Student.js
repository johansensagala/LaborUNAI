import mongoose from 'mongoose';
import CvSchema from './Cv.js';

const StudentSchema = new mongoose.Schema({
    name: {
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
    phoneNumber: {
        type: String,
        required: true,
    },
    major: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Major',
        required: true,
    },
    cohort: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    cv: {
        type: CvSchema,
    },
    laborHistory: [{
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
