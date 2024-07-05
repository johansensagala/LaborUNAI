import mongoose from 'mongoose';

const RiwayatLaborSchema = new mongoose.Schema({
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
        ref: 'RekapitulasiBulanan',
    }],
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
}, {
    collection: 'RiwayatLabor',
    timestamps: true,
});

const RiwayatLabor = mongoose.model('RiwayatLabor', RiwayatLaborSchema);

export default RiwayatLabor;
