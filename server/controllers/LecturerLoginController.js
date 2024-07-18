import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Lecturer from '../models/Lecturer.js';

const loginLecturer = async (req, res) => {
    try {
        const { nip, password } = req.body;
        const lecturer = await Lecturer.findOne({ nip: nip });

        if (lecturer) {
            const passwordMatch = await bcrypt.compare(password, lecturer.password);

            if (passwordMatch) {
                jwt.sign({ id: lecturer._id,
                           nip: lecturer.nip,
                           name: lecturer.name,
                           email: lecturer.email,
                           phoneNumber: lecturer.phoneNumber,
                           role: "lecturer"  
                        }, process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) {
                        res.status(500).json({ message: 'Failed to generate token.' });
                    } else {
                        const oneDay = 24 * 60 * 60 * 1000;
                        const expirationDate = new Date(Date.now() + oneDay);

                        res.cookie('token', token, { expires: expirationDate, httpOnly: true }).json({ token, lecturer });
                    }
                });
            } else {
                res.json('Password is incorrect.');
            }
        } else {
            res.json('No record found.');
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getLecturer = (req, res) => {
    const {token} = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, lecturer) => {
            if (err) {
                throw err;
            } else if (lecturer.role === "lecturer") {
                res.json(lecturer);
            } else {
                res.json("Lecturer not found.")
            }
        })
    } else {
        res.json("Lecturer not found.");
    }
}

const logoutLecturer = (req, res) => {
    res.clearCookie('token').json({ message: 'Logout berhasil' });
};

export { getLecturer, loginLecturer, logoutLecturer };

