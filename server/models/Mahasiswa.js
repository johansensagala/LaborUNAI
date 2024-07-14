import mongoose from 'mongoose';
import CvSchema from './Cv.js';

const MahasiswaSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    nim: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    noTelp: {
        type: String,
        required: true,
    },
    jurusanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jurusan',
        required: true,
    },
    angkatan: {
        type: String,
        required: true,
    },
    keterampilan: {
        type: [String],
        required: true,
    },
    cv: {
        type: CvSchema,
    },
    riwayatLabor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RiwayatLabor',
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
    collection: 'Mahasiswa',
    timestamps: true,
});

const Mahasiswa = mongoose.model('Mahasiswa', MahasiswaSchema);

export default Mahasiswa;
