import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function VisitorData() {
  const [visitors, setVisitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [visitorsPerPage, setVisitorsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVisitors();
  }, []);
  
  const fetchVisitors = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/visitors', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      console.log("Received visitors data:", data);
      setVisitors(data);
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleDepartmentFilter = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleSort = (field) => {
    const sortedVisitors = [...visitors].sort((a, b) => {
      if (field === 'name') {
        return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (field === 'visitDate') {
        return sortOrder === 'asc' ? new Date(a.visitDate) - new Date(b.visitDate) : new Date(b.visitDate) - new Date(a.visitDate);
      }
    });
    setVisitors(sortedVisitors);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredVisitors = visitors.filter((visitor) => {
    return (
      visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment ? visitor.department === selectedDepartment : true)
    );
  });

  const indexOfLastVisitor = currentPage * visitorsPerPage;
  const indexOfFirstVisitor = indexOfLastVisitor - visitorsPerPage;
  const currentVisitors = filteredVisitors.slice(indexOfFirstVisitor, indexOfLastVisitor);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredVisitors.length / visitorsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data tamu ini?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/visitors/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to delete visitor');
        }

        setVisitors(visitors.filter(visitor => visitor.id !== id));
        alert('Data tamu berhasil dihapus');
      } catch (error) {
        console.error('Error deleting visitor:', error);
        alert('Gagal menghapus data tamu');
      }
    }
  };

  const handleRowsPerPageChange = (e) => {
    setVisitorsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return ( <div className="container mt-3">
      <h3>Data Tamu</h3>
      <div className="row mb-3">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Cari nama pengunjung..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-6 col-md-3 mb-2 mb-md-0">
          <select className="form-select" onChange={handleDepartmentFilter}>
            <option value="">Semua Bidang</option>
            <option value="Bidang IKP">Bidang IKP</option>
            <option value="Bidang HUMAS">Bidang HUMAS</option>
            <option value="Bidang APTIKA">Bidang APTIKA</option>
          </select>
        </div>
        <div className="col-6 col-md-3 mb-2 mb-md-0 d-flex">
          <button className="btn btn-primary me-2" onClick={handleSort}>
            Sortir Nama {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
          <button className="btn btn-success" onClick={() => navigate('/add')}>Tambah Tamu</button>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Tampilkan Baris:</label>
        <select className="form-select form-select-sm" value={visitorsPerPage} onChange={handleRowsPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Daftar Pengunjung</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Nama</th>
                  <th>Instansi</th>
                  <th>No HP</th>
                  <th>Alamat</th>
                  <th>Jenis Kelamin</th>
                  <th>Bidang</th>
                  <th>Keperluan</th>
                  <th>
                    Tanggal Kunjungan
                    <button className="btn btn-sm" onClick={() => handleSort('visitDate')}>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentVisitors.map((visitor, index) => (
                  <tr key={visitor.id}>
                    <td>{indexOfFirstVisitor + index + 1}</td>
                    <td>{visitor.name}</td>
                    <td>{visitor.institution}</td>
                    <td>{visitor.phone}</td>
                    <td>{visitor.address}</td>
                    <td>{visitor.gender}</td>
                    <td>{visitor.department}</td>
                    <td>{visitor.purpose}</td>
                    <td>{formatDate(visitor.visitDate)}</td>
                    <td>
                      <div className="d-flex">
                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(visitor.id)}>
                          Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(visitor.id)}>
                          Hapus
                        </button>
                      </div>
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
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePreviousPage}>Previous</button>
          </li>
          <li className="page-item">
            <span className="page-link">{currentPage}</span>
          </li>
          <li className={`page-item ${currentPage >= Math.ceil(filteredVisitors.length / visitorsPerPage) ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNextPage}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default VisitorData;
