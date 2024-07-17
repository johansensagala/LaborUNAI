import mongoose from 'mongoose';

const TesttResultSchema = new mongoose.Schema({
    lamaranId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true,
    },
    jawaban: [{
        type: String,
        required: true,
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
    collection: 'TesttResult',
    timestamps: true,
});

const TesttResult = mongoose.model('TesttResult', TesttResultSchema);

export default TesttResult;
