import mongoose from 'mongoose';

const DepartemenSchema = new mongoose.Schema({
    namaDepartemen: {
        type: String,
        required: true,
    },
    deskripsi: {
        type: String,
        required: true,
    },
    kepalaDepartemenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dosen',
        required: true,
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
    collection: 'Departemen',
    timestamps: true,
});

const Departemen = mongoose.model('Departemen', DepartemenSchema);

export default Departemen;
