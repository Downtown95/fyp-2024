import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [isFaceScanAvailable, setIsFaceScanAvailable] = useState(false);

  const menuItems = [
    { title: 'My Profile', path: '/admin/profile', icon: '👤' },
    { title: 'Account Management', path: '/admin/account-management', icon: '👥' },
    { title: 'Register New Employee', path: '/admin/register-employee', icon: '➕' },
    { title: 'Attendance Report', path: '/admin/attendance-report', icon: '📊' },
    { title: 'Support Tickets', path: '/admin/support-tickets', icon: '🎫' },
    { title: 'Notifications', path: '/admin/notifications', icon: '🔔' },
    { title: 'Create Notification', path: '/admin/create-notification', icon: '📢' },
    { title: 'Model Management', path: '/admin/model-management', icon: '🤖' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const handleFaceScan = () => {
    // Integrate face scan logic here (use a library like OpenCV or Face++)
    console.log("Face scan started...");
    // For now, simulate a successful scan
    alert("Attendance marked using Face Scan!");
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>System Administrator Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <div className="dashboard-grid">
        {menuItems.map((item, index) => (
          <div 
            key={index} 
            className="dashboard-card"
            onClick={() => navigate(item.path)}
          >
            <span className="card-icon">{item.icon}</span>
            <h3>{item.title}</h3>
          </div>
        ))}
        {/* Face Scan Button */}
        <div className="dashboard-card" onClick={handleFaceScan}>
          <span className="card-icon">📷</span>
          <h3>Scan Face for Attendance</h3>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
