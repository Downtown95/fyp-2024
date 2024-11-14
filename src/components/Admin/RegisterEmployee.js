import React, { useState, useRef } from 'react';
import './RegisterEmployee.css';

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    dateOfBirth: '',
    appointment: ''
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      setMessage('Maximum 5 images allowed');
      return;
    }

    const validFiles = files.filter(file => {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setMessage('Only JPEG and PNG files are allowed');
        return false;
      }
      if (file.size > 500 * 1024) {
        setMessage('Each image must be less than 500KB');
        return false;
      }
      return true;
    });

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, {
          file,
          preview: reader.result
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      fileInputRef.current.files = e.dataTransfer.files;
      handleImageUpload({ target: { files } });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      setMessage('Please upload at least one facial image');
      return;
    }
    
    // Here you would typically send the form data and images to your backend
    console.log('Form Data:', formData);
    console.log('Images:', images);
    
    setMessage('Employee registered successfully!');
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      dateOfBirth: '',
      appointment: ''
    });
    setImages([]);
  };

  return (
    <div className="register-employee">
      <div className="register-header">
        <h1>Register New Employee</h1>
        <p>Fill in the details to register a new employee</p>
      </div>

      {message && (
        <div className={message.includes('successfully') ? 'success-message' : 'error-message'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-row">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="appointment">Appointment</label>
            <input
              type="text"
              id="appointment"
              name="appointment"
              value={formData.appointment}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Facial Images</h2>
          <div
            className="image-upload-section"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/jpeg,image/png"
              multiple
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="upload-button"
              onClick={() => fileInputRef.current.click()}
            >
              Choose Images
            </button>
            <p>or drag and drop images here</p>
            <small>Maximum 5 images, JPEG/PNG only, max 500KB each</small>

            <div className="image-preview">
              {images.map((image, index) => (
                <div key={index} className="preview-item">
                  <img src={image.preview} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Register Employee
        </button>
      </form>
    </div>
  );
};

export default RegisterEmployee;