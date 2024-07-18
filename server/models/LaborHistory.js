import mongoose from 'mongoose';

const LaborHistorySchema = new mongoose.Schema({
    labor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Labor',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    monthlyRecapitulation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MonthlyRecapitulation',
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
    collection: 'LaborHistory',
    timestamps: true,
});

const LaborHistory = mongoose.model('LaborHistory', LaborHistorySchema);

export default LaborHistory;
