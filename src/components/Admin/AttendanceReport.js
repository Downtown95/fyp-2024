import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FileDownload as FileDownloadIcon } from '@mui/icons-material';
import './AttendanceReport.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AttendanceReport = () => {
  const [filters, setFilters] = useState({
    department: '',
    dateRange: 'week',
    status: ''
  });

  const attendanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Present',
        data: [45, 42, 47, 43, 44],
        backgroundColor: '#4caf50',
      },
      {
        label: 'Late',
        data: [3, 5, 2, 4, 3],
        backgroundColor: '#ff9800',
      },
      {
        label: 'Absent',
        data: [2, 3, 1, 3, 3],
        backgroundColor: '#f44336',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Attendance Overview'
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExport = () => {
    // Handle export functionality
    console.log('Exporting attendance data...');
  };

  return (
    <div className="attendance-report">
      <div className="report-header">
        <h1>Attendance Report</h1>
        <p>View and analyze attendance records</p>
      </div>

      <div className="filters-section">
        <div className="filters-grid">
          <div className="filter-item">
            <label>Department</label>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">All Departments</option>
              <option value="it">IT</option>
              <option value="hr">HR</option>
              <option value="finance">Finance</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Date Range</label>
            <select
              name="dateRange"
              value={filters.dateRange}
              onChange={handleFilterChange}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div className="filter-item">
            <label>Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Status</option>
              <option value="present">Present</option>
              <option value="late">Late</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <div className="value">50</div>
        </div>
        <div className="stat-card">
          <h3>Present Today</h3>
          <div className="value">44</div>
        </div>
        <div className="stat-card">
          <h3>Late Today</h3>
          <div className="value">3</div>
        </div>
        <div className="stat-card">
          <h3>Absent Today</h3>
          <div className="value">3</div>
        </div>
      </div>

      <div className="chart-container">
        <Bar options={chartOptions} data={attendanceData} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Detailed Records</h2>
        <button className="export-button" onClick={handleExport}>
          <FileDownloadIcon /> Export to Excel
        </button>
      </div>

      <div className="attendance-table">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>IT</td>
              <td>2024-01-22</td>
              <td>09:00 AM</td>
              <td>06:00 PM</td>
              <td><span className="status-present">Present</span></td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>HR</td>
              <td>2024-01-22</td>
              <td>09:30 AM</td>
              <td>06:15 PM</td>
              <td><span className="status-late">Late</span></td>
            </tr>
            <tr>
              <td>Mike Johnson</td>
              <td>Finance</td>
              <td>2024-01-22</td>
              <td>-</td>
              <td>-</td>
              <td><span className="status-absent">Absent</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceReport;