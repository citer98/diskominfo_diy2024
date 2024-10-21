// src/components/AddDepartment.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new department object
    const newDepartment = { name: departmentName, address, phone, status };

    // Get existing departments from localStorage
    const existingDepartments = JSON.parse(localStorage.getItem('departments')) || [];

    // Add the new department to the existing array
    existingDepartments.push(newDepartment);

    // Update localStorage with the new list of departments
    localStorage.setItem('departments', JSON.stringify(existingDepartments));

    // Navigate back to admin dashboard
    navigate('/');
  };

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}> {/* Set a max width and center */}
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">TAMBAH BIDANG</p>

          {/* Nama Bidang */}
          <div className="mb-2">
            <label htmlFor="departmentName" className="form-label">Nama Bidang*</label>
            <input
              type="text"
              className="form-control border border-dark" // Border around input
              id="departmentName"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </div>

          {/* Alamat */}
          <div className="mb-2">
            <label htmlFor="address" className="form-label">Alamat*</label>
            <input
              type="text"
              className="form-control border border-dark" // Border around input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* No Telepon */}
          <div className="mb-2">
            <label htmlFor="phone" className="form-label">No Telepon*</label>
            <input
              type="tel"
              className="form-control border border-dark" // Border around input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Status */}
          <div className="mb-2">
            <label htmlFor="status" className="form-label">Status*</label>
            <select
              className="form-select border border-dark" // Border around select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Pilih Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-danger w-100">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
