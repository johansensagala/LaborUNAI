import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { MahasiswaContext } from "../context/MahasiswaContext";
import { DosenContext } from "../context/DosenContext";

const Navbar = () => {
    const { mahasiswa } = useContext(MahasiswaContext);
    const { dosen } = useContext(DosenContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:5000/mhs/logout', {
                method: 'GET',
                credentials: 'include',
            });
            window.location.href = '/mhs/login';
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link to="/mhs/home" className="navbar-item">
                    <img src={require('../assets/images/logo2.png')} alt="Bulma Logo" />
                </Link>

                <Link to="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </Link>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    {mahasiswa && typeof mahasiswa === "object" && (
                        <Link to="/mhs/home" className="navbar-item">
                            Home Mahasiswa
                        </Link>
                    )}
                    {dosen && typeof dosen === "object" && (
                        <Link to="/dosen/home" className="navbar-item">
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
                            {(mahasiswa && typeof mahasiswa === "object") || (dosen && typeof dosen === "object") ? (
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <div className="navbar-link">
                                        {mahasiswa ? mahasiswa.nama : dosen.nama}
                                    </div>
                                    <div className="navbar-dropdown">
                                        {mahasiswa && typeof mahasiswa === "object" && (
                                            <>
                                                <Link className="navbar-item" to="/mhs/profil">
                                                    Profile
                                                </Link>
                                                <Link className="navbar-item" to="/mhs/logout" onClick={handleLogout}>
                                                    Log out
                                                </Link>
                                            </>
                                        )}
                                        {dosen && typeof dosen === "object" && (
                                            <>
                                                <Link className="navbar-item" to="/dosen/profil">
                                                    Profile
                                                </Link>
                                                <Link className="navbar-item" to="/dosen/logout" onClick={handleLogout}>
                                                    Log out
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="navbar-item">
                                    <Link to="/mhs/login" className="button is-light is-size-5">
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
