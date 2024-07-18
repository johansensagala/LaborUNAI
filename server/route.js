// routes.js
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import path from 'path';

import { getAllApplication, getApplication, getApplicationByStudentAndLaborJob, saveApplication, startLamar } from './controllers/ApplicationController.js';
import { getDepartment, getDepartmentByLecturer, saveDepartment } from './controllers/DepartmentController.js';
import { getAllExpertiseGroup, saveExpertiseGroup } from './controllers/ExpertiseGroupController.js';
import { getAllFaculty, saveFaculty } from './controllers/FacultyController.js';
import { getAllGeneralQuestion, saveGeneralQuestion, saveManyGeneralQuestion } from './controllers/GeneralQuestionController.js';
import { getAllLaborJob, getLaborJob, getLaborJobByLecturer, saveLaborJob, updateLaborJob } from './controllers/LaborJobController.js';
import { getAllLecturer, saveLecturer } from './controllers/LecturerController.js';
import { getLecturer, loginLecturer, logoutLecturer } from './controllers/LecturerLoginController.js';
import { getStudent, loginStudent, logoutStudent } from './controllers/StudentLoginController.js';
import { getAllMajor, saveMajor } from './controllers/MajorController.js';
import { deleteCv, getAllStudent, getCv, getSkill, saveStudent, sendCv, updateSkill, uploadCv } from './controllers/StudentController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: './files/cv/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadCvProfile = multer({ storage: storage });
const uploadCvApplication = multer({ storage: storage });
const uploadAvatar = multer({ storage: storage });
const uploadJawabanImage = multer({ storage: storage });
const uploadPertanyaanImage = multer({ storage: storage });

router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

router.get('/', (req, res) => {
  res.send('Hello, Darling!');
});

router.route('/mahasiswas')
  .get(getAllStudent)
  .post(saveStudent);

router.route('/jurusan')
  .get(getAllMajor)
  .post(saveMajor);

router.route('/pertanyaan-umum')
  .get(getAllGeneralQuestion)
  .post(saveGeneralQuestion);

router.route('/pertanyaan-umum/save-many')
  .post(saveManyGeneralQuestion);

router.route('/fakultas')
  .get(getAllFaculty)
  .post(saveFaculty);

router.route('/bidang-keahlian')
  .get(getAllExpertiseGroup)
  .post(saveExpertiseGroup);

router.route('/dosens')
  .get(getAllLecturer)
  .post(saveLecturer);

router.route('/lowongan-labor')
  .get(getAllLaborJob)
  .post(saveLaborJob);
  
router.route('/lowongan-labor/:id')
  .get(getLaborJob)
  .put(updateLaborJob);

router.route('/lamaran')
  .get(getAllApplication)
  .post(saveApplication);

router.route('/lamaran/:id')
  .get(getApplication);

router.route('/lamaran/:mahasiswaId/:lowonganLaborId')
  .get(getApplicationByStudentAndLaborJob)
  .post(startLamar);

router.route('/lowongan-labor/dosen/:id')
  .get(getLaborJobByLecturer);
  
router.route('/departemen/:id')
  .get(getDepartment);

router.route('/departemen/dosen/:id')
  .get(getDepartmentByLecturer);

router.route('/departemen')
  .post(saveDepartment);

router.route('/mhs/login')
  .post(loginStudent);

router.route('/mhs')
  .get(getStudent);

router.route('/mhs/logout')
  .get(logoutStudent);

router.route('/dosen/login')
  .post(loginLecturer);

router.route('/dosen')
  .get(getLecturer);

router.route('/dosen/logout')
  .get(logoutLecturer);

router.route('/mahasiswa/:id/get-skill')
  .get(getSkill);

router.route('/mahasiswa/:id/update-skill')
  .put(updateSkill);

router.route('/cv/:id/get')
  .get(getCv);

router.route('/cv/:id/upload')
  .put(uploadCvProfile.single('cv'), uploadCv);

router.route('/cv/:id/delete')
  .delete(deleteCv);

router.route('/cv/:filename')
  .get(sendCv);

export default router;
