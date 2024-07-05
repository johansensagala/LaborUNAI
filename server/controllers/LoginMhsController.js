import Mahasiswa from '../models/Mahasiswa.js';
import Jurusan from '../models/Jurusan.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginMhs = async (req, res) => {
    try {
        const { nim, password } = req.body;
        const mahasiswa = await Mahasiswa.findOne({ nim: nim });

        if (mahasiswa) {
            const passwordMatch = await bcrypt.compare(password, mahasiswa.password);

            if (passwordMatch) {
                const jurusan = await Jurusan.findOne({ _id: mahasiswa.jurusanId });
                
                jwt.sign(
                    { id: mahasiswa._id,
                      nim: mahasiswa.nim,
                      nama: mahasiswa.nama,
                      noTelp: mahasiswa.noTelp,
                      email: mahasiswa.email,
                      jurusan: jurusan.namaJurusan,
                      angkatan: mahasiswa.angkatan,
                      role: "mahasiswa"
                    }, process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) {
                        res.status(500).json({ message: 'Failed to generate token.' });
                    } else {
                        const oneDay = 24 * 60 * 60 * 1000;
                        const expirationDate = new Date(Date.now() + oneDay);

                        res.cookie('token', token, { expires: expirationDate, httpOnly: true }).json({ token, mahasiswa });
                    }
                });
            } else {
                res.json('Password is incorrect!');
            }
        } else {
            res.json('No record found!');
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getMhs = (req, res) => {
    const {token} = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, mahasiswa) => {
            if (err) {
                throw err;
            } else {
                res.json(mahasiswa);
            }
        })
    } else {
        res.json("tidak ada mahasiswa");
    }
}

const logoutMhs = (req, res) => {
    res.clearCookie('token', { path: '/', domain: 'localhost', secure: false }).json({ message: 'Logout berhasil' });
};

export { loginMhs, getMhs, logoutMhs };