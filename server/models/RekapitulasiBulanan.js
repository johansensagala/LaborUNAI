import mongoose from 'mongoose';

const RekapitulasiBulananSchema = new mongoose.Schema({
    tanggalAwal: {
        type: Date,
        required: true,
    },
    tanggalAkhir: {
        type: Date,
        required: true,
    },
    gaji: {
        type: Number,
        required: true,
    },
    grade: {
        type: String,
        required: true,
    },
    catatan: {
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
    collection: 'RekapitulasiBulanan',
    timestamps: true,
});

const RekapitulasiBulanan = mongoose.model('RekapitulasiBulanan', RekapitulasiBulananSchema);

export default RekapitulasiBulanan;
