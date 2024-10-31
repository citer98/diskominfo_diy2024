import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(''); // Untuk email atau NIP
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validasi untuk memastikan identifier dan password tidak kosong
    if (!identifier || !password) {
        setError("Email atau NIP dan password harus diisi.");
        setIsLoading(false);
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/api/login', {
            identifier, // Bisa email atau NIP
            password
        });

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('userRole', response.data.user.role);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userDepartment', response.data.user.department);
            
            onLogin(true, response.data.user.role);
            // Redirect ke halaman yang sesuai
            navigate(response.data.user.role === 'admin' ? '/admin' : '/', { replace: true });
        }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Login gagal');
      } else if (error.request) {
        setError('Tidak dapat terhubung ke server');
      } else {
        setError('Terjadi kesalahan');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center p-0 m-0">
      <div className="row w-100 h-100 m-0">
        {/* Left Section */}
        <div 
          className="col-md-6 d-flex flex-column justify-content-center"
          style={{
            backgroundColor: '#A83427',
            color: '#fff',
            padding: '50px',
            clipPath: 'ellipse(100% 100% at 0% 50%)',
          }}
        >
          <h2 className="mb-4">
            Selamat Datang di Aplikasi Buku Tamu Dinas Komunikasi dan Informatika 
            Daerah Istimewa Yogyakarta
          </h2>
        </div>

        {/* Right Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div 
            className="card shadow-sm p-4" 
            style={{ 
              width: '100%', 
              maxWidth: '400px', 
              borderRadius: '20px',
              minHeight: '400px',
            }}
          >
            <div className="text-center mb-4">
              <img 
                src="/diskominfo_logo.png" 
                alt="Logo" 
                style={{ width: '100px', height: '100px' }}
              />
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Email atau NIP</label>
                <input
                  type="text"
                  className="form-control"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={isLoading}
                style={{
                  backgroundColor: '#A83427',
                  borderColor: '#A83427'
                }}

              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            </form>
            <div className="text-center mt-3">
              <p className="text-muted">
                © 2024 Diskominfo DIY. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
