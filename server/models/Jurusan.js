import mongoose from 'mongoose';

const JurusanSchema = new mongoose.Schema({
    namaJurusan: {
        type: String,
        required: true,
    },
    fakultasId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fakultas',
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
    collection: 'Jurusan',
    timestamps: true,
});

const Jurusan = mongoose.model('Jurusan', JurusanSchema);

export default Jurusan;
