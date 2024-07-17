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

const CATATAN_SINGKAT_DEFAULT_OPTION_1 = "Hi, i am interested with this job";
const CATATAN_SINGKAT_DEFAULT_OPTION_2 = "Hai, saya tertarik dengan pekerjaan ini.";
const CATATAN_SINGKAT_DEFAULT_OPTION_3 = "Dear Sir/Mam, saya sangat tertarik dengan pekerjaan ini dan saya rasa saya memiliki skill dan passion yang cukup berhubungan dengan lowongan labor ini";
const CATATAN_SINGKAT_DEFAULT_OPTION_4 = "Interested";

const JawabanSchema = new mongoose.Schema({
    nomor: {
        type: Number,
    },
    inputPertanyaan: {
        type: String,
    },
    jenisPertanyaan: {
        type: String,
    },
    optionPertanyaanRadio: {
        type: String,
    },
    optionPertanyaanCheckbox: {
        type: [String],
    },
});

const ApplicationSchema = new mongoose.Schema({
    mahasiswaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    lowonganLaborId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LaborJob',
        required: true,
    },
    keterampilan: {
        type: [String],
        required: true,
        default: [],
    },
    catatanSingkat: {
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
    jawabanGeneralQuestion: {
        type: [JawabanSchema],
        default: [],
    },
    jawaban: {
        type: [JawabanSchema],
        default: [],
    },
    tanggalKirim: {
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
