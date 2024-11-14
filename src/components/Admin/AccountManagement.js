import React, { useState } from 'react';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Block as BlockIcon } from '@mui/icons-material';
import './AccountManagement.css';

const AccountManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Employee',
      status: 'Active',
      lastLogin: '2024-01-20 09:30'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'HR Admin',
      status: 'Active',
      lastLogin: '2024-01-20 10:15'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowModal(true);
   };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleBlacklistUser = (userId) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === 'Active' ? 'Blacklisted' : 'Active'
        };
      }
      return user;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setShowModal(false);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="account-management">
      <div className="account-header">
        <h1>Account Management</h1>
        <button className="add-user-button" onClick={handleAddUser}>
          <AddIcon /> Add New User
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className={user.status === 'Active' ? 'status-active' : 'status-blacklisted'}>
                    {user.status}
                  </span>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <div className="user-actions">
                    <button
                      className="action-button edit-button"
                      onClick={() => handleEditUser(user)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="action-button delete-button"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <DeleteIcon />
                    </button>
                    <button
                      className="action-button blacklist-button"
                      onClick={() => handleBlacklistUser(user.id)}
                    >
                      <BlockIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedUser ? 'Edit User' : 'Add New User'}</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  defaultValue={selectedUser?.name || ''}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  defaultValue={selectedUser?.email || ''}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select defaultValue={selectedUser?.role || 'Employee'}>
                  <option value="Employee">Employee</option>
                  <option value="HR Admin">HR Admin</option>
                  <option value="System Admin">System Admin</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="submit-button">
                  {selectedUser ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;