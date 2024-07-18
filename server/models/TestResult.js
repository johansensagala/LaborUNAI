import mongoose from 'mongoose';

const TestResultSchema = new mongoose.Schema({
    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
        required: true,
    },
    answer: [{
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
    collection: 'TestResult',
    timestamps: true,
});

const TestResult = mongoose.model('TestResult', TestResultSchema);

export default TestResult;
