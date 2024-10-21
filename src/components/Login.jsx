import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi login dan token (Anda bisa mengganti ini dengan API yang sebenarnya)
    let token = '';
    
    // Login for admin
    if (username === 'admin@gmail.com' && password === 'admin') {
      token = 'admin_token'; // Ganti dengan token yang valid
      localStorage.setItem('token', token); // Simpan token di localStorage
      onLogin(true, 'admin'); // Passing 'admin' as role
    } 
    // Login for user
    else if (username === 'user@gmail.com' && password === 'user') {
      token = 'user_token'; // Ganti dengan token yang valid
      localStorage.setItem('token', token); // Simpan token di localStorage
      onLogin(true, 'user'); // Passing 'user' as role
    } 
    // Error handling for invalid credentials
    else {
      alert('Username atau password salah!');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center p-0 m-0">
      <div className="row w-100 h-100 m-0">
        {/* Left Section (Info with curve) */}
        <div 
          className="col-md-6 d-flex flex-column justify-content-center"
          style={{
            backgroundColor: '#A83427',
            color: '#fff',
            padding: '50px',
            clipPath: 'ellipse(100% 100% at 0% 50%)', // Lengkungan di kiri
          }}
        >
          <h2 className="mb-4">Selamat Datang di Aplikasi Buku Tamu Dinas Komunikasi dan Informatika Daerah Istimewa Yogyakarta</h2>
        </div>

        {/* Right Section (Login Form) */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div 
            className="card shadow-sm p-4" 
            style={{ 
              width: '100%', 
              maxWidth: '400px', 
              borderRadius: '20px', 
              minHeight: '400px',
              boxShadow: '20px 4px 12px rgba(0, 0, 0, 0.1)' // Tambahkan shadow di sini
            }}
          > 
            {/* Logo */}
            <div className="text-center mb-4">
              <img 
                src="/diskominfo_logo.png" 
                alt="Logo" 
                style={{ width: '100px', height: '100px' }}
              />
            </div>
            
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <p>USERNAME OR EMAIL</p>
                <input
                  type="email"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="Masukkan Username atau Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{ fontSize: '18px', padding: '10px' }}
                />
              </ div>

              <div className="mb-4">
                <p>PASSWORD</p>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Masukkan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ fontSize: '18px', padding: '10px' }}
                />
              </div>

              <div className="d-grid mt-4">
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{
                    fontSize: '18px',
                    padding: '10px 0',
                    backgroundColor: '#A83427',
                    borderColor: '#A83427'
                  }}
                >
                  LOGIN
                </button>
              </div>
            </form>

            {/* Optional Footer */}
            <div className="text-center mt-4">
              <button className="text-secondary" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;