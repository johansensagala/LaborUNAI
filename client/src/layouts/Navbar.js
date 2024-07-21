import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LecturerContext } from "../context/LecturerContext";
import { StudentContext } from "../context/StudentContext";

const Navbar = () => {
    const { student } = useContext(StudentContext);
    const { lecturer } = useContext(LecturerContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5000/student/logout', {
                method: 'GET',
                credentials: 'include',
            });
            window.location.href = '/student/login';
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                {student && typeof student === "object" && (
                    <Link to="/student" className="navbar-item">
                        <img src={require('../assets/images/logo2.png')} alt="Bulma Logo" />
                    </Link>
                )}
                {lecturer && typeof lecturer === "object" && (
                    <Link to="/lecturer" className="navbar-item">
                        <img src={require('../assets/images/logo2.png')} alt="Bulma Logo" />
                    </Link>
                )}

                <Link to="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </Link>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    {student && typeof student === "object" && (
                        <Link to="/student" className="navbar-item">
                            Home Mahasiswa
                        </Link>
                    )}
                    {lecturer && typeof lecturer === "object" && (
                        <Link to="/lecturer" className="navbar-item">
                            Home Dosen
                        </Link>
                    )}
                    <a className="navbar-item">Documentation</a>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">More</a>
                        <div className="navbar-dropdown">
                            <a className="navbar-item">About</a>
                            <a className="navbar-item">Jobs</a>
                            <a className="navbar-item">Contact</a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item">Report an issue</a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {(student && typeof student === "object") || (lecturer && typeof lecturer === "object") ? (
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <div className="navbar-link">
                                        {student ? student.name : lecturer.name}
                                    </div>
                                    <div className="navbar-dropdown">
                                        {student && typeof student === "object" && (
                                            <>
                                                <Link className="navbar-item" to="/student/profile">
                                                    Profile
                                                </Link>
                                                <Link className="navbar-item" to="/student/logout" onClick={handleLogout}>
                                                    Log out
                                                </Link>
                                            </>
                                        )}
                                        {lecturer && typeof lecturer === "object" && (
                                            <>
                                                <Link className="navbar-item" to="/lecturer/profile">
                                                    Profile
                                                </Link>
                                                <Link className="navbar-item" to="/lecturer/logout" onClick={handleLogout}>
                                                    Log out
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="navbar-item">
                                    <Link to="/student/login" className="button is-light is-size-5">
                                        Log in
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
