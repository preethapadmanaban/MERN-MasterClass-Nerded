import React, { useState } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

  const handleLogin = () => {
    // Assuming users are stored in local storage, you can replace it with your backend logic
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = storedUsers.find(user => user.email === email && user.password === password);
    if (user) {
      setLoggedInUser(user);
      setEmail('');
      setPassword('');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  const handleAddUser = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setNewUser({ name: '', email: '', password: '' });
  };

  const handleDeleteUser = id => {
    const updatedUsers = users.filter(user => user.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleEditUser = id => {
    const userToEdit = users.find(user => user.id === id);
    setEditingUserId(id);
    setNewUser({ ...userToEdit });
  };

  const handleSaveEdit = () => {
    const updatedUsers = users.map(user => (user.id === newUser.id ? newUser : user));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setEditingUserId(null);
    setNewUser({ name: '', email: '', password: '' });
  };

  return (
    <div style={{ backgroundColor: '#1877F2', minHeight: '100vh', color: 'white', padding: '20px' }}>
      {loggedInUser ? (
        <div>
          <h1 style={{ color: 'white' }}>Welcome, {loggedInUser.name}!</h1>
          <button onClick={handleLogout}>Logout</button>
          <h2>User Details</h2>
          <ul>
            {users.map(user => (
              <li key={user.id} style={{ backgroundColor: 'white', padding: '10px', marginBottom: '10px' }}>
                {user.name} - {user.email}
                <button onClick={() => handleEditUser(user.id)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <h2>Add User</h2>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={e => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={e => setNewUser({ ...newUser, password: e.target.value })}
          />
          <button onClick={handleAddUser}>Add User</button>
          {editingUserId !== null && (
            <div>
              <h2>Edit User</h2>
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={e => setNewUser({ ...newUser, password: e.target.value })}
              />
              <button onClick={handleSaveEdit}>Save</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 style={{ color: 'white' }}>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
