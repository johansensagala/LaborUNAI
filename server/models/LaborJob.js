import mongoose from 'mongoose';

const PertanyaanSchema = new mongoose.Schema({
    nomor: {
        type: Number,
    },
    inputPertanyaan: {
        type: String,
    },
    jenisPertanyaan: {
        type: String,
    },
    jumlahPertanyaanRadio: {
        type: Number,
    },
    jumlahPertanyaanCheckbox: {
        type: Number,
    },
    optionPertanyaanRadio: {
        type: [String],
    },
    optionPertanyaanCheckbox: {
        type: [String],
    },
});

const LaborJobSchema = new mongoose.Schema({
    posisi: {
        type: String,
        required: true,
    },
    departemenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    penanggungJawab: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lecturer',
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
    perluUploadCv: {
        type: Boolean,
        required: true,
        default: false,
    },
    perluGeneralQuestion: {
        type: Boolean,
        required: true,
        default: false,
    },
    perluTest: {
        type: Boolean,
        required: true,
        default: false,
    },
    perluCatatanSingkat: {
        type: Boolean,
        required: true,
        default: false,
    },
    tersedia: {
        type: Boolean,
        default: true,
        required: true,
    },
    pertanyaanUmum: {
        type: [String],
        ref: 'GeneralQuestion',
    },
    pertanyaan: {
        type: [PertanyaanSchema],
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
    collection: 'LaborJob',
    timestamps: true,
});

const LaborJob = mongoose.model('LaborJob', LaborJobSchema);

export default LaborJob;
