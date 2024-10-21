import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from './Loader'; // Import Loader
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

  useEffect(() => {
    fetchVisitor();
  }, [index]);

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
      const visitDate = response.data.visitDate ? new Date(response.data.visitDate).toISOString().split('T')[0] : '';
      setVisitor({...response.data, visitDate});
      setLoading(false);
      } catch (error) {
      console.error('Error fetching visitor:', error.response ? error.response.data : error.message);
      setError('Failed to fetch visitor data. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'visitDate') {
      // Ensure the date is in ISO format
      const date = new Date(value);
      setVisitor(prevVisitor => ({
        ...prevVisitor,
        [name]: date.toISOString(),
      }));
    } else {
      setVisitor(prevVisitor => ({
        ...prevVisitor,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Sending data:', visitor); // Log the data being sent
      const response = await axios.put(`http://localhost:8080/api/visitors/${index}`, visitor, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Response:', response.data); // Log the response
      navigate('/guest');
    } catch (error) {
      console.error('Error updating visitor:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      setError('Failed to update visitor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container my-4">
      <div className="p-3 border rounded shadow" style={{ maxWidth: '700px', margin: '0 auto' }}> {/* Set a max width and center */}
      <form onSubmit={handleSubmit}>
          <p className="fw-bold text-center">EDIT DATA TAMU</p>

          <div className="mb-2">
            <label className="form-label">Nama*</label>
            <input
              type="text"
              className="form-control border border-dark" // Border around input
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
              className="form-select border border-dark" // Border around select
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
              className="form-control border border-dark" // Border around input
              name="purpose"
              value={visitor.purpose}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Alamat*</label>
            <textarea
              className="form-control border border-dark" // Border around textarea
              name="address"
              value={visitor.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Instansi*</label>
            <input
              type="text"
              className="form-control border border-dark" // Border around input
              name="institution"
              value={visitor.institution}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">No Telp*</label>
            <input
              type="tel"
              className="form-control border border-dark" // Border around input
              name="phone"
              value={visitor.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Bidang*</label>
            <select
              name="department"
              className="form-select border border-dark" // Border around select
              value={visitor.department}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Bidang</option>
              <option value="Bidang IKP">Bidang IKP</option>
              <option value="Bidang HUMAS">Bidang HUMAS</option>
              <option value="Bidang APTIKA">Bidang APTIKA</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="form-label">Tanggal Kunjungan*</label>
            <input
              type="date"
              className="form-control border border-dark"
              name="visitDate"
              value={visitor.visitDate ? visitor.visitDate.split('T')[0] : ''}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">Simpan</button>
        </form>
      </div>
    </div>
  );
}

export default EditVisitor;
