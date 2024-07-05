import mongoose from 'mongoose';

const FakultasSchema = new mongoose.Schema({
    namaFakultas: {
        type: String,
        required: true,
    },
    deskripsi: {
        type: String,
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
    collection: 'Fakultas',
    timestamps: true,
});

const Fakultas = mongoose.model('Fakultas', FakultasSchema);

export default Fakultas;
