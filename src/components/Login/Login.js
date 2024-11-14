import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('employee');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For testing purposes, navigate based on role
    switch (role) {
      case 'system-admin':
        navigate('/admin/dashboard');
        break;
      case 'hr-admin':
        navigate('/hr-admin/dashboard');
        break;
      case 'employee':
        navigate('/employee/dashboard');
        break;
      default:
        break;
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome</h1>
          <p>Attendance Management System</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="role-selector">
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="hr-admin">HR Administrator</option>
              <option value="system-admin">System Administrator</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;