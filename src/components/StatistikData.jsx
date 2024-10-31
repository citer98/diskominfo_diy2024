import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import axios from 'axios';

function StatistikData() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentDate = new Date();

  useEffect(() => {
    fetchVisitors();
  }, []);

  // Fungsi untuk mengambil data pengunjung
  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:8080/api/visitors', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setVisitors(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Fungsi untuk menghitung kunjungan berdasarkan periode
  const countVisits = (period) => {
    return visitors.filter(visitor => {
      const visitDate = new Date(visitor.visitDate);
      const today = new Date();

      switch (period) {
        case 'day':
          return visitDate.toDateString() === today.toDateString();
        case 'month':
          return visitDate.getMonth() === today.getMonth() && 
                 visitDate.getFullYear() === today.getFullYear();
        case 'year':
          return visitDate.getFullYear() === today.getFullYear();
        default:
          return false;
      }
    }).length;
  };

  // Fungsi untuk menghitung data bulanan
  const calculateMonthlyData = () => {
    const monthlyData = new Array(12).fill(0);
    
    visitors.forEach(visitor => {
      const visitDate = new Date(visitor.visitDate);
      if (visitDate.getFullYear() === currentDate.getFullYear()) {
        monthlyData[visitDate.getMonth()]++;
      }
    });

    return monthlyData;
  };

  // Konfigurasi data grafik
  const chartData = {
    labels: [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ],
    datasets: [{
      label: 'Jumlah Kunjungan per Bulan',
      data: calculateMonthlyData(),
      fill: false,
      borderColor: '#A83427',
      tension: 0.1
    }]
  };

  // Konfigurasi opsi grafik
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Statistik Kunjungan Bulanan Tahun ${currentDate.getFullYear()}`
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h4>Statistik Kunjungan</h4>
      <div className="row mb-4">
        <div className="col-md-4">
          <Card className="text-center shadow-sm mb-3" style={{ backgroundColor: '#F8EDED' }}>
            <Card.Body>
              <h3>Kunjungan Hari Ini</h3>
              <h1>{countVisits('day')}</h1>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="text-center shadow-sm mb-3" style={{ backgroundColor: '#F8EDED' }}>
            <Card.Body>
              <h3>Kunjungan Bulan Ini</h3>
              <h1>{countVisits('month')}</h1>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="text-center shadow-sm mb-3" style={{ backgroundColor: '#F8EDED' }}>
            <Card.Body>
              <h3>Total Kunjungan {currentDate.getFullYear()}</h3>
              <h1>{countVisits('year')}</h1>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Line data={chartData} options={chartOptions} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default StatistikData;
