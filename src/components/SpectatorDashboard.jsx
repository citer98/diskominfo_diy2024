// src/components/SpectatorDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SpectatorDashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchVisitors();
    fetchAgencies();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/departments', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchVisitors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/visitors', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setVisitors(response.data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const fetchAgencies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/agencies', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAgencies(response.data);
    } catch (error) {
      console.error('Error fetching agencies:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Dashboard Pengunjung</h4>

      <div className="row mb-4 justify-content-center">
  <div className="col-md-4">
    <div className="card text-center shadow-sm mb-3">
      <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
        <h3>Jumlah Tamu</h3>
        <h1>{visitors.length}</h1>
      </div>
    </div>
  </div>
</div>

      {/* Tabel Tamu */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title">Daftar Tamu</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>No</th>
                  <th>Nama Tamu</th>
                  <th>Institusi</th>
                  <th>Keperluan</th>
                  <th>Bidang yang Dituju</th>
                  <th>Tanggal Kunjungan</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor, index) => (
                  <tr key={visitor.id}>
                    <td>{index + 1}</td>
                    <td>{visitor.name}</td>
                    <td>{visitor.institution}</td>
                    <td>{visitor.purpose}</td>
                    <td>{visitor.department}</td>
                    <td>{new Date(visitor.visit_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpectatorDashboard;