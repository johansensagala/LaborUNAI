import mongoose from 'mongoose';

const LamaranSchema = new mongoose.Schema({
    mahasiswaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mahasiswa',
        required: true,
    },
    lowonganLaborId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LowonganLabor',
        required: true,
    },
    keterampilan: {
        type: String,
        required: true,
    },
    catatanSingkat: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending',
        required: true,
    },
    tanggalKirim: {
        type: Date,
        default: Date.now,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
}, {
    collection: 'Lamaran',
    timestamps: true,
});

const Lamaran = mongoose.model('Lamaran', LamaranSchema);

export default Lamaran;
