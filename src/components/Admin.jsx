import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaClipboardList } from 'react-icons/fa';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: '4680543456', name: 'ARIJAL', email: 'arijal@qsgmail.com', phone: '09217639184712941', department: 'APTIKA', createdAt: '2 March 2021, 13:45 PM' },
    { id: '4545869856', name: 'RIFAL', email: 'rifal@qsgmail.com', phone: '085645789612', department: 'APTIKA', createdAt: '5 March 2021, 10:15 AM' },
    { id: '#123456789', name: 'PAI', email: 'pai@qsgmail.com', phone: '081234567891', department: 'APTIKA', createdAt: '12 March 2021, 09:30 AM' },
    { id: '#123456789', name: 'FAHREZA', email: 'fahreza@qsgmail.com', phone: '081234567891', department: 'INFOKOM', createdAt: '20 March 2021, 11:45 AM' },
  ]);

  const [departments, setDepartments] = useState([]);
  const [showDepartmentsTable, setShowDepartmentsTable] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State for hover animation

  useEffect(() => {
    const storedDepartments = JSON.parse(localStorage.getItem('departments')) || [];
    setDepartments(storedDepartments);
  }, []);

  const handleDeleteUser = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleShowDepartments = () => {
    setShowDepartmentsTable(!showDepartmentsTable);
  };

  const handleDeleteDepartment = (index) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus bidang ini?')) {
      const updatedDepartments = departments.filter((_, i) => i !== index);
      setDepartments(updatedDepartments);
      localStorage.setItem('departments', JSON.stringify(updatedDepartments));
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      <div className="row mb-4">
        <div className="col-md-3">
          <div
            className="card text-center shadow-sm mb-3"
            style={{
              backgroundColor: '#F8EDED',
              cursor: 'pointer',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Apply scaling effect
              transition: 'transform 0.2s ease-in-out' // Smooth transition
            }}
            onClick={handleShowDepartments}
            onMouseEnter={() => setIsHovered(true)} // Set hover state true
            onMouseLeave={() => setIsHovered(false)} // Reset hover state
          >
            <div className="card-body">
              <h3>Jumlah Bidang</h3>
              <h1>{departments.length}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm mb-3" style={{ backgroundColor: '#F8EDED' }}>
            <div className="card-body">
              <h3>Jumlah User</h3>
              <h1>{users.length}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <button className="btn btn-danger w-100 mb-3" onClick={() => navigate('/add-user')}>
            <FaUserPlus /> Tambah Admin
          </button>
        </div>
        <div className="col-md-3">
          <button className="btn btn-danger w-100 mb-3" onClick={() => navigate('/add-department')}>
            <FaClipboardList /> Tambah Bidang
          </button>
        </div>
      </div>

      {showDepartmentsTable && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h2 className="text-center">Data Bidang</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr style={{ backgroundColor: '#9F2C2C', color: 'white' }}>
                    <th>No</th>
                    <th>Nama Bidang</th>
                    <th>Alamat</th>
                    <th>No Telepon</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{department.name}</td>
                      <td>{department.address}</td>
                      <td>{department.phone}</td>
                      <td>{department.status}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteDepartment(index)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr style={{ backgroundColor: '#9F2C2C', color: 'white' }}>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>No Telp</th>
                  <th>Bidang</th>
                  <th>Tanggal di buat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td><a href={`mailto:${user.email}`} style={{ color: '#9F2C2C' }}>{user.email}</a></td>
                    <td>{user.phone}</td>
                    <td>{user.department}</td>
                    <td>{user.createdAt}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => navigate(`/edit-user/${user.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-4">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item active"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Admin;
