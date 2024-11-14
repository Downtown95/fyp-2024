import React, { useState, useRef } from 'react';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import './ModelManagement.css';

const ModelManagement = () => {
  const [currentModel, setCurrentModel] = useState({
    version: '1.0.0',
    deployedAt: '2024-01-15 14:30',
    accuracy: '98.5%',
    size: '25MB',
    status: 'active'
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [modelHistory] = useState([
    {
      id: 1,
      version: '1.0.0',
      deployedAt: '2024-01-15 14:30',
      accuracy: '98.5%',
      status: 'active'
    },
    {
      id: 2,
      version: '0.9.0',
      deployedAt: '2024-01-01 10:00',
      accuracy: '97.8%',
      status: 'inactive'
    }
  ]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) { // 100MB limit
        alert('File size should not exceed 100MB');
        return;
      }
      setSelectedFile(file);
    }
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
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        alert('File size should not exceed 100MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleDeploy = () => {
    if (!selectedFile) return;

    setIsUploading(true);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        // Update current model after successful deployment
        setCurrentModel({
          version: '1.1.0',
          deployedAt: new Date().toLocaleString(),
          accuracy: '99.0%',
          size: '26MB',
          status: 'active'
        });
        setSelectedFile(null);
        setUploadProgress(0);
      }
    }, 500);
  };

  return (
    <div className="model-management">
      <div className="model-header">
        <h1>Model Management</h1>
        <p>Manage and deploy facial recognition models</p>
      </div>

      <div className="current-model">
        <h2>Current Active Model</h2>
        <div className="model-info">
          <div className="info-item">
            <h3>Version</h3>
            <p>{currentModel.version}</p>
          </div>
          <div className="info-item">
            <h3>Deployed At</h3>
            <p>{currentModel.deployedAt}</p>
          </div>
          <div className="info-item">
            <h3>Accuracy</h3>
            <p>{currentModel.accuracy}</p>
          </div>
          <div className="info-item">
            <h3>Size</h3>
            <p>{currentModel.size}</p>
          </div>
        </div>
      </div>

      <div className="upload-section">
        <h2>Deploy New Model</h2>
        <div
          className="upload-area"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept=".h5,.pkl,.model"
            style={{ display: 'none' }}
          />
          <UploadIcon className="upload-icon" />
          <p className="upload-text">
            Drag and drop your model file here or click to browse
          </p>
          <p className="file-info">
            Supported formats: .h5, .pkl, .model (Max size: 100MB)
          </p>
        </div>

        {selectedFile && (
          <div className="selected-file">
            <span className="file-name">{selectedFile.name}</span>
            <DeleteIcon
              className="remove-file"
              onClick={() => setSelectedFile(null)}
            />
          </div>
        )}

        {isUploading && (
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        <button
          className="deploy-button"
          onClick={handleDeploy}
          disabled={!selectedFile || isUploading}
        >
          <CheckIcon /> Deploy Model
        </button>
      </div>

      <div className="model-history">
        <h2>Deployment History</h2>
        <table className="history-table">
          <thead>
            <tr>
              <th>Version</th>
              <th>Deployed At</th>
              <th>Accuracy</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {modelHistory.map(model => (
              <tr key={model.id}>
                <td>{model.version}</td>
                <td>{model.deployedAt}</td>
                <td>{model.accuracy}</td>
                <td>
                  <span className={`status-${model.status}`}>
                    {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModelManagement;