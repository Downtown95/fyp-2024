import React, { useState } from 'react';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '+1234567890'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(editedProfile);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        {!isEditing ? (
          <>
            <div className="profile-info">
              <div className="info-group">
                <label>Full Name:</label>
                <p>{profile.fullName}</p>
              </div>
              <div className="info-group">
                <label>Email:</label>
                <p>{profile.email}</p>
              </div>
              <div className="info-group">
                <label>Mobile Number:</label>
                <p>{profile.mobile}</p>
              </div>
            </div>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={editedProfile.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedProfile.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Mobile Number:</label>
              <input
                type="tel"
                name="mobile"
                value={editedProfile.mobile}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="button-group">
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => {
                  setIsEditing(false);
                  setEditedProfile(profile);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;