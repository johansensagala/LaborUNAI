import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema({
    namaFaculty: {
        type: String,
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
    collection: 'Faculty',
    timestamps: true,
});

const Faculty = mongoose.model('Faculty', FacultySchema);

export default Faculty;
