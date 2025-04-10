import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AgentDashboard = () => {
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();
  const agentRatings = 4.8;
  const listingsCount = 45;
  const clientsCount = 28;
  const transactionsCount = 120;

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (loggedInUser && role === 'agent' && token) {
      const name = loggedInUser.split('@')[0];
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      setDisplayName(capitalizedName);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container py-5">
      <div className="bg-light p-4 rounded shadow">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <div className="me-3 fs-1">👤</div>
            <div>
              <h2 className="mb-0">Welcome, {displayName}</h2>
              <small className="text-muted">Real Estate Agent</small>
            </div>
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={() => navigate('/listings')}>
              Manage Listings
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/clients')}>
              Manage Clients
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/transactions')}>
              View Transactions
            </button>
          </div>
        </header>

        <main>
          <h3 className="mb-3">Agent Dashboard</h3>
          <p className="text-muted mb-4">
            Select an option above to manage your listings, clients, or view transactions.
          </p>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Agent Ratings</h5>
                  <p className="card-text">{agentRatings} out of 5 stars</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Listings</h5>
                  <p className="card-text">{listingsCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Clients</h5>
                  <p className="card-text">{clientsCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Transactions</h5>
                  <p className="card-text">{transactionsCount}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgentDashboard;
