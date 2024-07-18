import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema({
    laborJob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LaborJob',
        required: true,
    },
    question: [{
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
    collection: 'Test',
    timestamps: true,
});

const Test = mongoose.model('Test', TestSchema);

export default Test;
