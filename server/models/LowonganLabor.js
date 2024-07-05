import mongoose from 'mongoose';

const PertanyaanSchema = new mongoose.Schema({
    inputPertanyaan: {
        type: String,
        required: true,
    },
    jenisPertanyaan: {
        type: String,
        required: true,
    },
    jumlahPertanyaanRadio: {
        type: Number,
        required: false,
    },
    jumlahPertanyaanCheckbox: {
        type: Number,
        required: false,
    },
    optionPertanyaanRadio: {
        type: [String],
        required: false,
    },
    optionPertanyaanCheckbox: {
        type: [String],
        required: false,
    },
});

const LowonganLaborSchema = new mongoose.Schema({
    posisi: {
        type: String,
        required: true,
    },
    departemenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Departemen',
        required: true,
    },
    penanggungJawab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dosen',
        required: true,
    },
    deskripsi: {
        type: String,
        required: true,
    },
    tanggungJawab: {
        type: [String],
        required: true,
    },
    persyaratan: {
        type: [String],
        required: true,
    },
    gaji: {
        type: Number,
        required: true,
    },
    tanggalPosting: {
        type: Date,
        required: true,
    },
    tanggalTenggat: {
        type: Date,
        required: true,
    },
    perluTest: {
        type: Boolean,
        required: true,
    },
    tersedia: {
        type: Boolean,
        required: true,
    },
    pertanyaan: {
        type: [PertanyaanSchema],
        default: [],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
    },
}, {
    collection: 'LowonganLabor',
    timestamps: true,
});

const LowonganLabor = mongoose.model('LowonganLabor', LowonganLaborSchema);

export default LowonganLabor;
