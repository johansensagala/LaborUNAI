import mongoose from 'mongoose';

const MonthlyRecapitulationSchema = new mongoose.Schema({
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
    collection: 'MonthlyRecapitulation',
    timestamps: true,
});

const MonthlyRecapitulation = mongoose.model('MonthlyRecapitulation', MonthlyRecapitulationSchema);

export default MonthlyRecapitulation;
