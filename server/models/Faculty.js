import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema({
    facultyName: {
        type: String,
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
    collection: 'Faculty',
    timestamps: true,
});

const Faculty = mongoose.model('Faculty', FacultySchema);

export default Faculty;
