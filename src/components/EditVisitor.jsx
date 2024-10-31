import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditVisitor() {
  const { index } = useParams();
  const [visitor, setVisitor] = useState({
    name: '',
    gender: '',
    purpose: '',
    address: '',
    institution: '',
    phone: '',
    department: '',
    visitDate: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
    fetchVisitor();
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

  const fetchVisitor = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token tidak ditemukan. Silakan login kembali.');
        setLoading(false);
        return;
      }
      const response = await axios.get(`http://localhost:8080/api/visitors/${index}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      // Format the date properly
      const visitDate = response.data.visitDate ? 
        new Date(response.data.visitDate).toISOString().split('T')[0] : '';
      
      setVisitor({ ...response.data, visitDate });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching visitor:', error);
      setError('Failed to fetch visitor data. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisitor(prevVisitor => ({
      ...prevVisitor,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      // Prepare the data for submission
      const submitData = {
        ...visitor,
        visitDate: new Date(visitor.visitDate + 'T00:00:00Z').toISOString()
      };

      console.log('Sending data:', submitData);

      const response = await axios.put(
        `http://localhost:8080/api/visitors/${index}`,
        submitData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      console.log('Response:', response.data);
      alert('Data berhasil diupdate!');
      navigate('/guest');
    } catch (error) {
      console.error('Error updating visitor:', error);
      setError('Failed to update visitor. Please try again.');
      alert('Error updating visitor: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-3">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-3 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' } }>
        <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">EDIT FORM TAMU</p>

          <div className="mb-2">
            <label className="form-label">Nama*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="name"
              value={visitor.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Jenis Kelamin*</label>
            <select
              name="gender"
              className="form-select border border-dark"
              value={visitor.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Jenis Kelamin</option>
              <option value="Laki-laki">Laki-Laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Keperluan*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="purpose"
              value={visitor.purpose}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Alamat*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="address"
              value={visitor.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Institusi*</label>
            <input
              type="text"
              className="form-control border border-dark"
              name="institution"
              value={visitor.institution}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">No. Telepon*</label>
            <input
              type="tel"
              className="form-control border border-dark"
              name="phone"
              value={visitor.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Departemen*</label>
            <select
              name="department"
              className="form-select border border-dark"
              value={visitor.department}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Departemen</option>
              {departments.map((department) => (
                <option key={department.id} value={department.name}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Tanggal Kunjungan*</label>
            <input
              type="date"
              className="form-control border border-dark"
              name="visitDate"
              value={visitor.visitDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
          Update
        </button>

        </form>
      </div>
    </div>
  );
}

export default EditVisitor;
