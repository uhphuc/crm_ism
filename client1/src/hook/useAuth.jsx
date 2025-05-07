import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const res = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setUser(res.data.user);
        } catch (err) {
          console.log('Token expired or invalid:', err);
          logout();
        }
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return true;
    } catch (err) {
      console.log('Login failed:', err.response?.data || err.message);
      return false;
    }
  };

  const register = async (data) => {
    try {
      const res = await api.post('/auth/register', data);
      await AsyncStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      return true;
    } catch (err) {
      console.log('Register failed:', err.response?.data || err.message);
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
