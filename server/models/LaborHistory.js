import mongoose from 'mongoose';

const LaborHistorySchema = new mongoose.Schema({
    laborId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Labor',
        required: true,
    },
    tanggalMulai: {
        type: Date,
        required: true,
    },
    tanggalSelesai: {
        type: Date,
        required: true,
    },
    rekapitulasiBulanan: [{
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
