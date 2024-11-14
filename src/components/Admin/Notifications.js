import React, { useState } from 'react';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'System Maintenance Notice',
      content: 'The system will undergo maintenance on Saturday, 10 PM - 2 AM.',
      type: 'announcement',
      target: 'all',
      createdAt: '2024-01-22 10:00',
      createdBy: 'System Admin'
    },
    {
      id: 2,
      title: 'New Feature Release',
      content: 'We have updated the facial recognition system with improved accuracy.',
      type: 'update',
      target: 'employees',
      createdAt: '2024-01-21 15:30',
      createdBy: 'System Admin'
    },
    {
      id: 3,
      title: 'Server Issues Resolved',
      content: 'The login issues have been resolved. Please contact support if you still experience problems.',
      type: 'alert',
      target: 'all',
      createdAt: '2024-01-20 09:15',
      createdBy: 'System Admin'
    }
  ]);

  const [newNotification, setNewNotification] = useState({
    title: '',
    content: '',
    type: 'announcement',
    target: 'all'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const notification = {
      id: Date.now(),
      ...newNotification,
      createdAt: new Date().toLocaleString(),
      createdBy: 'System Admin'
    };
    setNotifications(prev => [notification, ...prev]);
    setNewNotification({
      title: '',
      content: '',
      type: 'announcement',
      target: 'all'
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }
  };

  return (
    <div className="notifications">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <p>Create and manage system notifications</p>
      </div>

      <div className="create-notification">
        <h2>Create New Notification</h2>
        <form onSubmit={handleSubmit} className="notification-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newNotification.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={newNotification.content}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={newNotification.type}
              onChange={handleInputChange}
            >
              <option value="announcement">Announcement</option>
              <option value="update">Update</option>
              <option value="alert">Alert</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="target">Target Audience</label>
            <select
              id="target"
              name="target"
              value={newNotification.target}
              onChange={handleInputChange}
            >
              <option value="all">All Users</option>
              <option value="employees">Employees Only</option>
              <option value="admins">Administrators Only</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Create Notification
          </button>
        </form>
      </div>

      <div className="notifications-list">
        {notifications.map(notification => (
          <div key={notification.id} className="notification-item">
            <div className="notification-header">
              <h3 className="notification-title">{notification.title}</h3>
              <span className={`notification-type type-${notification.type}`}>
                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
              </span>
            </div>

            <div className="notification-content">
              {notification.content}
            </div>

            <div className="notification-meta">
              <span>Target: {notification.target}</span>
              <div className="notification-actions">
                <button className="action-button edit-button">
                  <EditIcon fontSize="small" /> Edit
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(notification.id)}
                >
                  <DeleteIcon fontSize="small" /> Delete
                </button>
              </div>
            </div>

            <div className="notification-date">
              Created: {notification.createdAt} by {notification.createdBy}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;