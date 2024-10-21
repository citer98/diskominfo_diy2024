import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

function StatistikData() {
  const [visitors, setVisitors] = useState([]);
  const [viewMode, setViewMode] = useState('monthly');
  const currentDate = new Date();

  useEffect(() => {
    const storedVisitors = JSON.parse(localStorage.getItem('visitors')) || [];
    // Filter out visitors without valid visitDate
    const validVisitors = storedVisitors.filter(visitor => visitor && visitor.visitDate);
    setVisitors(validVisitors);
  }, []);

  // Helper functions to filter data by date
  const filterByDay = (date) => {
    return date && (new Date(date).toLocaleDateString() === currentDate.toLocaleDateString());
  };

  const filterByMonth = (date) => {
    return date && (
      new Date(date).getMonth() === currentDate.getMonth() &&
      new Date(date).getFullYear() === currentDate.getFullYear()
    );
  };

  const filterByYear = (date) => {
    return date && (new Date(date).getFullYear() === currentDate.getFullYear());
  };

  // Calculate totals for today, this month, and this year
  const totalVisitorsToday = visitors.filter((visitor) => filterByDay(visitor.visitDate)).length;
  const totalVisitorsMonth = visitors.filter((visitor) => filterByMonth(visitor.visitDate)).length;
  const totalVisitorsYear = visitors.filter((visitor) => filterByYear(visitor.visitDate)).length;

  // Prepare monthly statistics for the chart
  const monthlyVisitorCounts = new Array(12).fill(0);
  visitors.forEach((visitor) => {
    if (visitor.visitDate) {
      const visitDate = new Date(visitor.visitDate);
      const visitMonth = visitDate.getMonth();
      const visitYear = visitDate.getFullYear();
      if (visitYear === currentDate.getFullYear()) {
        monthlyVisitorCounts[visitMonth]++;
      }
    }
  });

  // Prepare yearly statistics for the chart
  const yearlyVisitorCounts = visitors.reduce((acc, visitor) => {
    if (visitor.visitDate) {
      const visitYear = new Date(visitor.visitDate).getFullYear();
      acc[visitYear] = (acc[visitYear] || 0) + 1;
    }
    return acc;
  }, {});

  const monthlyData = {
    labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    datasets: [
      {
        label: 'Jumlah Kunjungan Bulanan',  
        data: monthlyVisitorCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const yearlyData = {
    labels: Object.keys(yearlyVisitorCounts), // Extracting years dynamically
    datasets: [
      {
        label: 'Jumlah Kunjungan Tahunan',
        data: Object.values(yearlyVisitorCounts), // Corresponding yearly counts
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  // Toggle between monthly and yearly view
  const chartData = viewMode === 'monthly' ? monthlyData : yearlyData;

  return (
    <div className="container mt-5">
      <h3 className="text-center">Data Statistik Kunjungan Dinas Kominfo</h3>
      
      <div className="row text-center my-4">
        <div className="col-md-4">
          <div className="p-3 bg-light rounded shadow-sm">
            <h5>Kunjungan Hari ini</h5>
            <h1 className="text-danger">{totalVisitorsToday}</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-light rounded shadow-sm">
            <h5>Total Kunjungan Bulan Ini</h5>
            <h1 className="text-danger">{totalVisitorsMonth}</h1>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-light rounded shadow-sm">
            <h5>Total Kunjungan Tahun {currentDate.getFullYear()}</h5>
            <h1 className="text-danger">{totalVisitorsYear}</h1>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group" role="group" aria-label="View mode">
          <button
            type="button"
            className={`btn ${viewMode === 'monthly' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setViewMode('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`btn ${viewMode === 'yearly' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setViewMode('yearly')}
          >
            Yearly
          </button>
        </div>
      </div>

      <Card className="shadow-sm mb-5"> {/* Added margin-bottom */}
        <Card.Body>
          <h5 className="text-center">Grafik Aktivitas Kunjungan</h5>
          <Bar data={chartData} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default StatistikData;
                 