// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (username, password) => {
    // Mock login logic
    if (username === 'test' && password === 'password') {
      const fakeUser = { name: 'test' };
      setUser(fakeUser);
      navigate('/dashboard');
      return true;
    }
    return false;
  };

  const register = (username, password) => {
    // Mock register logic
    const fakeUser = { username };
    setUser(fakeUser);
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
