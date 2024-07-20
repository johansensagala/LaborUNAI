import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginLecturer = () => {
  const [nip, setNip] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!nip || !password) {
        setError('NIP dan password harus diisi');
        return;
      }

      const response = await axios.post('http://localhost:5000/lecturer/login', { nip, password }, { withCredentials: true });

      if (response.status === 200) {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          window.location.href = '/lecturer';
        } else {
          setError('NIP atau password salah.');
        }
      } else {
        setError('Login gagal. Terjadi kesalahan saat menghubungi server.');
      }
  
    } catch (e) {
      setError('Login gagal. Terjadi kesalahan saat menghubungi server.');
      console.error(e);
    }
  };


  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-one-third">
          <div className="box mt-6">
            <h1 className="title has-text-centered">Login Dosen</h1>
            {error && <p className="has-text-danger has-text-centered">{error}</p>}
            <div className="field">
              <label className="label">NIP</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Masukkan NIP anda"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <div className="control has-text-centered">
                <button className="button is-primary" onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>

            <div className="has-text-centered">
              <p>Atau <Link to="/mhs/login">login sebagai mahasiswa</Link></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLecturer;
