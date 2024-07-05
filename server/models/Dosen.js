import mongoose from 'mongoose';

const DosenSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    nip: {
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
    bidangKeahlianId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BidangKeahlian',
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
    collection: 'Dosen',
    timestamps: true,
});

const Dosen = mongoose.model('Dosen', DosenSchema);

export default Dosen;
