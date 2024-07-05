// routes.js
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';

import { getAllMahasiswa, saveMahasiswa, getKeterampilan, updateKeterampilan, getCv, uploadCv, sendCv, deleteCv } from './controllers/MahasiswaController.js';
import { getAllJurusan, saveJurusan } from './controllers/JurusanController.js';
import { getAllFakultas, saveFakultas } from './controllers/FakultasController.js';
import { getAllBidangKeahlian, saveBidangKeahlian } from './controllers/BidangKeahlianController.js';
import { getAllDosen, saveDosen } from './controllers/DosenController.js';
import { getAllLowonganLabor, getLowonganLabor, getLowonganLaborByDosen, saveLowonganLabor } from './controllers/LowonganLaborController.js';
import { getDepartemen, getDepartemenByDosen, saveDepartemen } from './controllers/DepartemenController.js';
import { loginMhs, getMhs, logoutMhs } from './controllers/LoginMhsController.js';
import { loginDosen, getDosen, logoutDosen } from './controllers/LoginDosenController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: './files/cv/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploadCvProfile = multer({ storage: storage });
const uploadCvLamaran = multer({ storage: storage });
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
  .get(getAllMahasiswa)
  .post(saveMahasiswa);

router.route('/jurusan')
  .get(getAllJurusan)
  .post(saveJurusan);

router.route('/fakultas')
  .get(getAllFakultas)
  .post(saveFakultas);

router.route('/bidang-keahlian')
  .get(getAllBidangKeahlian)
  .post(saveBidangKeahlian);

router.route('/dosens')
  .get(getAllDosen)
  .post(saveDosen);

router.route('/lowongan-labor')
  .get(getAllLowonganLabor)
  .post(saveLowonganLabor);

router.route('/lowongan-labor/:id')
  .get(getLowonganLabor);
  
router.route('/lowongan-labor/dosen/:id')
  .get(getLowonganLaborByDosen);
  
router.route('/departemen/:id')
  .get(getDepartemen);

router.route('/departemen/dosen/:id')
  .get(getDepartemenByDosen);

router.route('/departemen')
  .post(saveDepartemen);

router.route('/mhs/login')
  .post(loginMhs);

router.route('/mhs')
  .get(getMhs);

router.route('/mhs/logout')
  .get(logoutMhs);

router.route('/dosen/login')
  .post(loginDosen);

router.route('/dosen')
  .get(getDosen);

router.route('/dosen/logout')
  .get(logoutDosen);

router.route('/mahasiswa/:id/get-skill')
  .get(getKeterampilan);

router.route('/mahasiswa/:id/update-skill')
  .put(updateKeterampilan);

router.route('/cv/:id/get')
  .get(getCv);

router.route('/cv/:id/upload')
  .put(uploadCvProfile.single('cv'), uploadCv);

router.route('/cv/:id/delete')
  .delete(deleteCv);

router.route('/cv/:filename')
  .get(sendCv);

export default router;
