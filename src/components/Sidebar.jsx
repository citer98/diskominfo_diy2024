// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  return (
    <div className="bg-light border-end" style={{ width: '250px', height: '100vh', position: 'fixed', top: '56px', left: '0', overflowY: 'auto' }}>
      <h5 className="p-3">Menu</h5>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/add" className="nav-link">Tambah Data</Link>
        </li>
        <li className="nav-item">
          <Link to="/statistics" className="nav-link">Statistik</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
