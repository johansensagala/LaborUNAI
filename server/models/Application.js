import mongoose from 'mongoose';
import CvSchema from './Cv.js';

const STATUS_NOT_SUBMITTED = "NOT_SUBMITTED"; // not used so far
const STATUS_ONPROGRESS = "ONPROGRESS";
const STATUS_INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED";
const STATUS_INTERVIEWING = "INTERVIEWING";
const STATUS_PENDING_DECISION = "PENDING_DECISION";
const STATUS_OFFER_EXTENDED = "OFFER_EXTENDED";
const STATUS_OFFER_ACCEPTED = "OFFER_ACCEPTED";
const STATUS_OFFER_DECLINED = "OFFER_DECLINED";
const STATUS_WITHDRAWN = "WITHDRAWN";
const STATUS_NOT_SELECTED = "NOT_SELECTED";

const DEFAULT_NOTES_OPTION_1 = "Hi, i am interested with this job";
const DEFAULT_NOTES_OPTION_2 = "Hai, saya tertarik dengan pekerjaan ini.";
const DEFAULT_NOTES_OPTION_3 = "Dear Sir/Mam, saya sangat tertarik dengan pekerjaan ini dan saya rasa saya memiliki skill dan passion yang cukup berhubungan dengan lowongan labor ini";
const DEFAULT_NOTES_OPTION_4 = "Interested";

const AnswerSchema = new mongoose.Schema({
    number: {
        type: Number,
    },
    textAnswer: {
        type: String,
    },
    radioAnswer: {
        type: String,
    },
    checkboxAnswer: {
        type: [String],
    },
});

const ApplicationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    laborJob: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LaborJob',
        required: true,
    },
    skills: {
        type: [String],
        required: true,
        default: [],
    },
    note: {
        type: String,
    },
    status: {
        type: String,
        default: STATUS_ONPROGRESS,
        required: true,
    },
    cv: {
        type: CvSchema,
    },
    generalQuestionAnswer: {
        type: [AnswerSchema],
        default: [],
    },
    testAnswer: {
        type: [AnswerSchema],
        default: [],
    },
    sentDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    feedback: {
        type: String,
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
    collection: 'Application',
    timestamps: true,
});

const Application = mongoose.model('Application', ApplicationSchema);

export default Application;
