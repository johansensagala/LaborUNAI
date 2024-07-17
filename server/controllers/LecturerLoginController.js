import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Lecturer from '../models/Lecturer.js';

const loginLecturer = async (req, res) => {
    try {
        const { nip, password } = req.body;
        const dosen = await Lecturer.findOne({ nip: nip });

        if (dosen) {
            const passwordMatch = await bcrypt.compare(password, dosen.password);

            if (passwordMatch) {
                jwt.sign({ id: dosen._id,
                           nip: dosen.nip,
                           nama: dosen.nama,
                           email: dosen.email,
                           noTelp: dosen.noTelp,
                           role: "dosen"  
                        }, process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) {
                        res.status(500).json({ message: 'Failed to generate token.' });
                    } else {
                        const oneDay = 24 * 60 * 60 * 1000;
                        const expirationDate = new Date(Date.now() + oneDay);

                        res.cookie('token', token, { expires: expirationDate, httpOnly: true }).json({ token, dosen });
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

const getLecturer = (req, res) => {
    const {token} = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, dosen) => {
            if (err) {
                throw err;
            } else if (dosen.role === "dosen") {
                res.json(dosen);
            } else {
                res.json("Tidak ada dosen.")
            }
        })
    } else {
        res.json("Tidak ada dosen.");
    }
}

const logoutLecturer = (req, res) => {
    res.clearCookie('token').json({ message: 'Logout berhasil' });
};

export { getLecturer, loginLecturer, logoutLecturer };

