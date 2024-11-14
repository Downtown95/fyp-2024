import React, { useState } from 'react';
import './SupportTickets.css';

function SupportTickets() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: 'Face Recognition Not Working',
      description: 'Unable to scan face during attendance check-in',
      submittedBy: 'John Doe',
      department: 'IT',
      status: 'Open',
      priority: 'High',
      createdAt: '2024-02-10 09:30 AM'
    },
    {
      id: 2,
      subject: 'Account Access Issues',
      description: 'Cannot login to employee portal',
      submittedBy: 'Jane Smith',
      department: 'HR',
      status: 'In Progress',
      priority: 'Medium',
      createdAt: '2024-02-09 02:15 PM'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleStatusChange = (ticketId, newStatus) => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const statusMatch = filterStatus === 'all' || ticket.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || ticket.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="support-tickets">
      <h1>Support Tickets</h1>

      <div className="filters">
        <div className="filter-group">
          <label>Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Priority:</label>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      <div className="tickets-container">
        <div className="tickets-list">
          {filteredTickets.map(ticket => (
            <div
              key={ticket.id}
              className={`ticket-card ${selectedTicket?.id === ticket.id ? 'selected' : ''}`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <div className="ticket-header">
                <h3>{ticket.subject}</h3>
                <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
                  {ticket.priority}
                </span>
              </div>
              <div className="ticket-info">
                <p><strong>Submitted by:</strong> {ticket.submittedBy}</p>
                <p><strong>Department:</strong> {ticket.department}</p>
                <p><strong>Created:</strong> {ticket.createdAt}</p>
              </div>
              <div className="ticket-status">
                <span className={`status-badge ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                  {ticket.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {selectedTicket && (
          <div className="ticket-details">
            <h2>Ticket Details</h2>
            <div className="detail-section">
              <h3>{selectedTicket.subject}</h3>
              <div className="detail-row">
                <span className="label">Status:</span>
                <select
                  value={selectedTicket.status}
                  onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value)}
                  className="status-select"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="detail-row">
                <span className="label">Priority:</span>
                <span className={`priority-badge ${selectedTicket.priority.toLowerCase()}`}>
                  {selectedTicket.priority}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Submitted by:</span>
                <span>{selectedTicket.submittedBy}</span>
              </div>
              <div className="detail-row">
                <span className="label">Department:</span>
                <span>{selectedTicket.department}</span>
              </div>
              <div className="detail-row">
                <span className="label">Created:</span>
                <span>{selectedTicket.createdAt}</span>
              </div>
              <div className="description">
                <h4>Description:</h4>
                <p>{selectedTicket.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportTickets;