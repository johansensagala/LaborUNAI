import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
    namaDepartment: {
        type: String,
        required: true,
    },
    deskripsi: {
        type: String,
        required: true,
    },
    kepalaDepartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecturer',
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
    collection: 'Department',
    timestamps: true,
});

const Department = mongoose.model('Department', DepartmentSchema);

export default Department;
