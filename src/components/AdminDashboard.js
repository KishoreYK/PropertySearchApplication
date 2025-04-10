import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/AdminDashboard.css";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    firstName: '', lastName: '', mobileNumber: '', username: '', password: '', role: ''
  });
  const [editingUser, setEditingUser] = useState(null);
  const [editUserData, setEditUserData] = useState(null);
  const [displayName, setDisplayName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');

    if (loggedInUser && role === 'admin' && token) {
      const name = loggedInUser.split('@')[0];
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      setDisplayName(capitalizedName);

      axios.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
        error => Promise.reject(error)
      );

      fetchUsers();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/admin/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ firstName: '', lastName: '', mobileNumber: '', username: '', password: '', role: '' });
      alert("User added successfully.");
    } catch (error) {
      console.error('Error creating user', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/admin/users/${id}`, editUserData);
      setUsers(users.map(user => (user.id === id ? response.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div className="container py-5">
      <header className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex align-items-center">
          <div className="me-3 fs-1">👤</div>
          <div>
            <h2 className="mb-0">Welcome, {displayName}</h2>
            <small className="text-muted">Real Estate Admin</small>
          </div>
        </div>
      </header>

      <main>
        <h2 className="mb-4">User Management</h2>

        <div className="card mb-5">
          <div className="card-header">Create User</div>
          <div className="card-body">
            <div className="row g-3">
              {["firstName", "lastName", "mobileNumber", "username", "password", "role"].map((field, idx) => (
                <div className="col-md-4" key={idx}>
                  <input
                    type={field === "password" ? "password" : "text"}
                    className="form-control"
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    value={newUser[field]}
                    onChange={(e) => setNewUser({ ...newUser, [field]: e.target.value })}
                  />
                </div>
              ))}
            </div>
            <button className="btn btn-primary mt-3" onClick={handleCreateUser}>Create User</button>
          </div>
        </div>

        <div className="card mb-5">
          <div className="card-header">Users List</div>
          <ul className="list-group list-group-flush">
            {users.map(user => (
              <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{user.firstName} {user.lastName}</strong><br />
                  <span className="text-muted">{user.username} | {user.mobileNumber} | {user.role}</span>
                </div>
                <div>
                  <button className="btn btn-sm btn-secondary me-2" onClick={() => {
                    setEditingUser(user.id);
                    setEditUserData(user);
                  }}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {editingUser && (
          <div className="card">
            <div className="card-header">Edit User</div>
            <div className="card-body">
              <div className="row g-3">
                {["firstName", "lastName", "mobileNumber", "username", "password", "role"].map((field, idx) => (
                  <div className="col-md-4" key={idx}>
                    <input
                      type={field === "password" ? "password" : "text"}
                      className="form-control"
                      placeholder={field.replace(/([A-Z])/g, ' $1')}
                      value={editUserData[field]}
                      onChange={(e) => setEditUserData({ ...editUserData, [field]: e.target.value })}
                    />
                  </div>
                ))}
              </div>
              <button className="btn btn-success mt-3" onClick={() => handleUpdateUser(editingUser)}>Update User</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
