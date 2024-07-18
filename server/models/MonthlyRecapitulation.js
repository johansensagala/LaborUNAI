import mongoose from 'mongoose';

const MonthlyRecapitulationSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: false,
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
    collection: 'MonthlyRecapitulation',
    timestamps: true,
});

const MonthlyRecapitulation = mongoose.model('MonthlyRecapitulation', MonthlyRecapitulationSchema);

export default MonthlyRecapitulation;
