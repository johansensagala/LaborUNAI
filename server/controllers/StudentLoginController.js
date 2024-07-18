import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Major from '../models/Major.js';
import Student from '../models/Student.js';

const loginStudent = async (req, res) => {
    try {
        const { nim, password } = req.body;
        const student = await Student.findOne({ nim: nim });

        if (student) {
            const passwordMatch = await bcrypt.compare(password, student.password);

            if (passwordMatch) {
                const major = await Major.findOne({ _id: student.major });
                
                jwt.sign(
                    { id: student._id,
                      nim: student.nim,
                      name: student.name,
                      phoneNumber: student.phoneNumber,
                      email: student.email,
                      major: major.majorName,
                      cohort: student.cohort,
                      role: "student"
                    }, process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) {
                        res.status(500).json({ message: 'Failed to generate token.' });
                    } else {
                        const oneDay = 24 * 60 * 60 * 1000;
                        const expirationDate = new Date(Date.now() + oneDay);

                        res.cookie('token', token, { expires: expirationDate, httpOnly: true }).json({ token, student });
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

const getStudent = (req, res) => {
    const {token} = req.cookies;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, student) => {
            if (err) {
                throw err;
            } else {
                res.json(student);
            }
        })
    } else {
        res.json("No student found.");
    }
}

const logoutStudent = (req, res) => {
    res.clearCookie('token', { path: '/', domain: 'localhost', secure: false }).json({ message: 'Logout succesfully.' });
};

export { getStudent, loginStudent, logoutStudent };

