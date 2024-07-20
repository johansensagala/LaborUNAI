// routes.js
import cors from 'cors';
import express from 'express';
import multer from 'multer';
import path from 'path';

import { getAllApplication, getApplication, getApplicationByStudentAndLaborJob, saveApplication, startApply } from './controllers/ApplicationController.js';
import { getDepartment, getDepartmentByLecturer, saveDepartment } from './controllers/DepartmentController.js';
import { getAllExpertiseGroup, saveExpertiseGroup } from './controllers/ExpertiseGroupController.js';
import { getAllFaculty, saveFaculty } from './controllers/FacultyController.js';
import { getAllGeneralQuestion, saveGeneralQuestion, saveManyGeneralQuestion } from './controllers/GeneralQuestionController.js';
import { getAllLaborJob, getLaborJob, getLaborJobByLecturer, saveLaborJob, updateLaborJob } from './controllers/LaborJobController.js';
import { getAllLecturer, saveLecturer } from './controllers/LecturerController.js';
import { getLecturer, loginLecturer, logoutLecturer } from './controllers/LecturerLoginController.js';
import { getAllMajor, saveMajor } from './controllers/MajorController.js';
import { deleteCv, getAllStudent, getCv, getSkill, saveStudent, sendCv, updateSkill, uploadCv } from './controllers/StudentController.js';
import { getStudent, loginStudent, logoutStudent } from './controllers/StudentLoginController.js';

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
const uploadAnswerImage = multer({ storage: storage });
const uploadQuestionImage = multer({ storage: storage });

router.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

router.get('/', (req, res) => {
  res.send('Hello, Darling!');
});

router.route('/student')
  .get(getAllStudent)
  .post(saveStudent);

router.route('/major')
  .get(getAllMajor)
  .post(saveMajor);

router.route('/general-question')
  .get(getAllGeneralQuestion)
  .post(saveGeneralQuestion);

router.route('/general-question/save-many')
  .post(saveManyGeneralQuestion);

router.route('/faculty')
  .get(getAllFaculty)
  .post(saveFaculty);

router.route('/expertise')
  .get(getAllExpertiseGroup)
  .post(saveExpertiseGroup);

router.route('/lecturer')
  .get(getAllLecturer)
  .post(saveLecturer);

router.route('/labor-job')
  .get(getAllLaborJob)
  .post(saveLaborJob);
  
router.route('/labor-job/:id')
  .get(getLaborJob)
  .put(updateLaborJob);

router.route('/application')
  .get(getAllApplication)
  .post(saveApplication);

router.route('/application/:id')
  .get(getApplication);

router.route('/application/:studentId/:laborJobId')
  .get(getApplicationByStudentAndLaborJob)
  .post(startApply);

router.route('/labor-job/lecturer/:id')
  .get(getLaborJobByLecturer);
  
router.route('/department/:id')
  .get(getDepartment);

router.route('/department/lecturer/:id')
  .get(getDepartmentByLecturer);

router.route('/department')
  .post(saveDepartment);

router.route('/student/login')
  .post(loginStudent);

router.route('/student-data')
  .get(getStudent);

router.route('/student/logout')
  .get(logoutStudent);

router.route('/lecturer/login')
  .post(loginLecturer);

router.route('/lecturer-data')
  .get(getLecturer);

router.route('/lecturer/logout')
  .get(logoutLecturer);

router.route('/student/:id/get-skill')
  .get(getSkill);

router.route('/student/:id/update-skill')
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
