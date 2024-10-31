// src/components/MiniSidebar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function MiniSidebar({ onLogout }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    console.log('Current role:', storedRole);
    setRole(storedRole);
  }, []);

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClose = () => setShowLogoutModal(false);
  const handleShow = () => setShowLogoutModal(true);

  const handleLogout = () => {
    setShowLogoutModal(false);
    onLogout();
    navigate('/login');
  };

  const sidebarStyle = {
    backgroundColor: '#A8332A',
    width: isHovered ? '120px' : '40px',
    height: '60vh',
    position: 'fixed',
    left: 0,
    top: '20vh',
    bottom: '10vh',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '20px',
    borderRadius: '0 50px 50px 0',
    transition: 'width 0.3s ease-in-out',
    overflow: 'hidden',
  };

  const menuStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const linkStyle = (isHovered) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isHovered ? 'flex-start' : 'center',
    color: 'white',
    textDecoration: 'none',
    fontSize: '15px',
    padding: '12px 20px',
    transition: 'all 0.3s ease',
  });

  const iconStyle = (isHovered, isActive) => ({
    fontFamily: 'FontAwesome',
    fontSize: '22px',
    marginRight: isHovered ? '10px' : '0',
    transition: 'color 0.3s ease',
    color: isActive || isHovered ? 'yellow' : 'white',
  });

  return (
    <>
      <div
        style={sidebarStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul style={menuStyle}>
          {/* Home Link - Visible to all */}
          <li
            onMouseEnter={() => handleMouseEnter('home')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/" style={linkStyle(hoveredItem === 'home')}>
              <span style={iconStyle(hoveredItem === 'home', location.pathname === '/')}>&#xf015;</span>
              {hoveredItem === 'home' && <span>Home</span>}
            </Link>
          </li>

          {/* Admin Dashboard - Only visible to admin */}
          {role === 'admin' && (
            <li
              onMouseEnter={() => handleMouseEnter('admin')}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/admin" style={linkStyle(hoveredItem === 'admin')}>
                <span style={iconStyle(hoveredItem === 'admin', location.pathname === '/admin')}>&#xf013;</span>
                {hoveredItem === 'admin' && <span>Dashboard Admin</span>}
              </Link>
            </li>
          )}

          {/* Guest Link - Visible to all */}
          <li
            onMouseEnter={() => handleMouseEnter('guest')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/guest" style={linkStyle(hoveredItem === 'guest')}>
              <span style={iconStyle(hoveredItem === 'guest', location.pathname === '/guest')}>&#xf02d;</span>
              {hoveredItem === 'guest' && <span>Tamu</span>}
            </Link>
          </li>

          {/* Add Form Link - Visible to all */}
          <li
            onMouseEnter={() => handleMouseEnter('add')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/add" style={linkStyle(hoveredItem === 'add')}>
              <span style={iconStyle(hoveredItem === 'add', location.pathname === '/add')}>&#xf044;</span>
              {hoveredItem === 'add' && <span>Form Tamu</span>}
            </Link>
          </li>

          {/* Profile Link - Visible to all users (including admin) */}
          <li
            onMouseEnter={() => handleMouseEnter('profile')}
            onMouseLeave={handleMouseLeave}
          >
            <Link to="/profile" style={linkStyle(hoveredItem === 'profile')}>
              <span style={iconStyle(hoveredItem === 'profile', location.pathname === '/profile')}>&#xf2bd;</span>
              {hoveredItem === 'profile' && <span>Profile</span>}
            </Link>
          </li>

          {/* Logout Link - Visible to all */}
          <li>
            <div
              onClick={handleShow}
              onMouseEnter={() => handleMouseEnter('logout')}
              onMouseLeave={handleMouseLeave}
              style={{...linkStyle(hoveredItem === 'logout'), cursor: 'pointer'}}
            >
              <span style={iconStyle(hoveredItem === 'logout', false)}>&#xf2f5;</span>
              {hoveredItem === 'logout' && <span>Logout</span>}
            </div>
          </li>
        </ul>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah anda yakin ingin keluar?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batalkan
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MiniSidebar; 