// src/pages/Register.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    Register(username, password);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border p-2 mb-4 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
