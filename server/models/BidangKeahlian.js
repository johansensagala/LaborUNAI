import mongoose from 'mongoose';

const BidangKeahlianSchema = new mongoose.Schema({
    namaBidang: {
        type: String,
        required: true,
    },
    jurusanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jurusan',
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
    collection: 'BidangKeahlian',
    timestamps: true,
});

const BidangKeahlian = mongoose.model('BidangKeahlian', BidangKeahlianSchema);

export default BidangKeahlian;
