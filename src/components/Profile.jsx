// src/components/Profile.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    nip: '',
    email: '',
    phone: '',
    department: '',
    profilePicture: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        throw new Error('User tidak terautentikasi');
      }

      const response = await axios.get(`http://localhost:8080/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUser(response.data);
      if (response.data.profile_picture) {
        setPreviewUrl(`http://localhost:8080${response.data.profile_picture}`);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // src/components/Profile.jsx
const handleUpload = async () => {
  try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      
      const formData = new FormData();
      formData.append('profile_picture', selectedFile);

      const response = await axios.post(
          `http://localhost:8080/api/users/${userId}/profile-picture`,
          formData,
          {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data'
              }
          }
      );

      if (response.data.profile_picture) {
          setPreviewUrl(`http://localhost:8080${response.data.profile_picture}`);
          setShowModal(false);
          fetchUserData(); // Refresh user data
      }
  } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Gagal mengupload foto profil: ' + (error.response?.data?.error || error.message));
  }
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        {/* Profile Picture Section */}
        <div className="col-md-3 text-center">
          <div
            className="profile-picture-container"
            onClick={() => fileInputRef.current.click()}
            style={{
              width: '100%',
              height: '300px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              cursor: 'pointer',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span>Klik untuk upload foto</span>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            accept="image/*"
          />
        </div>

        {/* Profile Information Section */}
        <div className="col-md-7">
          <h4 className="fw-bold" style={{ backgroundColor: '#A63B2A', color: '#FFF', padding: '10px', borderRadius: '10px 10px 0 0' }}>
            PROFILE AKUN
          </h4>
          <div className="p-4 shadow-sm" style={{ backgroundColor: '#FFFFFF', borderRadius: '0 0 10px 10px' }}>
            <div className="mb-2">
              <strong>NIP</strong>
              <p>{user.nip || '-'}</p>
            </div>
            <div className="mb-2">
              <strong>NAMA</strong>
              <p>{user.name}</p>
            </div>
             <div className="mb-2">
              <strong>NOMOR TELEPON</strong>
              <p>{user.phone}</p>
            </div>
            <div className="mb-2">
              <strong>Email</strong>
              <p>{user.email}</p>
            </div>
            <div className="mb-2">
              <strong>Bidang</strong>
              <p>{user.department}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal untuk konfirmasi upload */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Upload Foto Profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Apakah Anda yakin ingin mengupload foto profil?</p>
          {previewUrl && (
            <div>
              <p className="text-center">Pratinjau Foto Baru:</p>
              <img
                src={previewUrl}
                alt="New Profile"
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '10px' }}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
