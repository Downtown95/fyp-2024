import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import AccountManagement from './components/Admin/AccountManagement';
import Profile from './components/Admin/Profile';
import RegisterEmployee from './components/Admin/RegisterEmployee';
import AttendanceReport from './components/Admin/AttendanceReport';
import SupportTickets from './components/Admin/SupportTickets';
import Notifications from './components/Admin/Notifications';
import ModelManagement from './components/Admin/ModelManagement';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/accountManagement" element={<AccountManagement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registerEmployee" element={<RegisterEmployee />} />
          <Route path="/attendanceReport" element={<AttendanceReport />} />
          <Route path="/supportTickets" element={<SupportTickets />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/ModelManagement" element={<ModelManagement />} />
          
 
        </Routes>
      </div>
    </Router>
  );
}

export default App;