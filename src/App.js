// D:\Semester 7\Magang\diskominfo_diy2024-main-edit\src\App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import VisitorForm from './components/VisitorForm';
import VisitorData from './components/VisitorData';
import Footer from './components/Footer';
import Loader from './components/Loader';
import StatistikData from './components/StatistikData';
import MiniSidebar from './components/MiniSidebar';
import EditVisitor from './components/EditVisitor';
import Admin from './components/Admin';
import AddUser from './components/AddUser';
import Profile from './components/Profile';
import AddDepartment from './components/AddDepartment';
import EditDepartment from './components/EditDepartment';
import EditUser from './components/EditUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('userRole');
      if (token) {
        setIsLoggedIn(true);
        setUserRole(role);
        // Redirect ke halaman yang sesuai jika user sudah login
        if (window.location.pathname === '/login') {
          navigate(role === 'admin' ? '/admin' : '/', { replace: true });
        }
      } else {
        // Redirect ke login jika tidak ada token
        if (window.location.pathname !== '/login') {
          navigate('/login', { replace: true });
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const AdminRoute = ({ children }) => {
    const isAdmin = localStorage.getItem('userRole') === 'admin';
    return isAdmin ? children : <Navigate to="/login" replace />;
  };

  const handleLogin = (status, role) => {
    setIsLoggedIn(status);
    setUserRole(role);
    if (status && role === 'admin') {
      navigate('/admin', { replace: true });
    } else if (status) {
      navigate('/', { replace: true });
    }
  };

  const handleLogout = () => {
    setLoading(true);
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.clear();
    navigate('/login', { replace: true });
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="d-flex">
      {isLoggedIn && <MiniSidebar onLogout={handleLogout} />} {/* Pastikan onLogout diteruskan di sini */}
      <div className="d-flex flex-column min-vh-100 flex-grow-1">
        {isLoggedIn && <Header onLogout={handleLogout} />}

        {isLoggedIn && (
          <marquee behavior="scroll" direction="left">
            Selamat Datang di Buku Tamu Dinas Komunikasi dan Informatika Daerah Istimewa Yogyakarta
          </marquee>
        )}

        <div className="container-fluid flex-grow-1 p-0">
          <Routes>
            <Route
              path="/login"
              element={
                !isLoggedIn ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to={userRole === 'admin' ? '/admin' : '/'} replace />
                )
              }
            />
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={isLoggedIn ? <StatistikData /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/guest"
              element={isLoggedIn ? <VisitorData /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/add"
              element={isLoggedIn ? <VisitorForm /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/profile"
              element={isLoggedIn ? <Profile onNavigate={handleNavigation} /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/edit/:index"
              element={isLoggedIn ? <EditVisitor /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route
              path="/add-user"
              element={
                <AdminRoute>
                  <AddUser />
                </AdminRoute>
              }
            />
            <Route
              path="/add-department"
              element={
                <AdminRoute>
                  <AddDepartment />
                </AdminRoute>
              }
            />
            <Route
              path="/edit-department/:id"
              element={
                <AdminRoute>
                  <EditDepartment />
                </AdminRoute>
              }
            />
            <Route
              path="/edit-user/:id"
              element={
                <AdminRoute>
                  <EditUser />
                </AdminRoute>
              }
            />
            
            {/* Catch all route */}
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? '/' : '/login'} replace />}
            />
          </Routes>
        </div>
        {isLoggedIn && <Footer />}
        {loading && <Loader />}
      </div>
    </div>
  );
}

export default App;
