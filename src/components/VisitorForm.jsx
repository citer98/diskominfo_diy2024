import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function VisitorForm() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    purpose: '',
    address: '',
    institution: '',
    phone: '',
    department: '',
    visitDate: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mendapatkan token dari localStorage
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:8080/api/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '' // Gunakan token jika ada
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Response data:", data);
      alert('Data submitted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Error submitting data: ' + error.message);
    }
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">FORMULIR TAMU</p>

          <div className="mb-2">
            <label htmlFor="name" className="form-label">Nama*</label>
            <input
              type="text"
              name="name"
              className="form-control border border-dark"
              placeholder="Nama"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="institution" className="form-label">Instansi*</label>
            <input
              type="text"
              name="institution"
              className="form-control border border-dark"
              placeholder="Instansi"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="phone" className="form-label">No HP*</label>
            <input
              type="text"
              name="phone"
              className="form-control border border-dark"
              placeholder="No HP"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="address" className="form-label">Alamat*</label>
            <textarea
              name="address"
              className="form-control border border-dark"
              placeholder="Alamat"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="gender" className="form-label">Jenis Kelamin*</label>
            <select
              name="gender"
              className="form-select border border-dark"
              onChange={handleChange}
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="department" className="form-label">Bidang*</label>
            <select
              name="department"
              className="form-select border border-dark"
              onChange={handleChange}
              required
            >
              <option value="">Pilih Bidang</option>
              <option value="Bidang APTIKA">Bidang APTIKA</option>
              <option value="Bidang lainnya">Bidang lainnya</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="visitDate" className="form-label">Tanggal Kunjungan*</label>
            <input
              type="date"
              name="visitDate"
              className="form-control border border-dark"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="purpose" className="form-label">Keperluan*</label>
            <textarea
              name="purpose"
              className="form-control border border-dark"
              placeholder="Keperluan"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default VisitorForm;
