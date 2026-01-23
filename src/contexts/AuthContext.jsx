
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const VALID_CREDENTIALS = {
  'qa.user': 'Demo#123',
  'admin.user': 'Admin#123'
};

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem('authToken') || null;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('currentUser') || null;
  });
  const [loginTime, setLoginTime] = useState(() => {
    return localStorage.getItem('loginTime') || null;
  });

  const login = (username, password, rememberMe) => {
    if (VALID_CREDENTIALS[username] === password) {
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const time = new Date().toISOString();
      
      setAuthToken(token);
      setCurrentUser(username);
      setLoginTime(time);
      
      if (rememberMe) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', username);
        localStorage.setItem('loginTime', time);
      } else {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('currentUser', username);
        sessionStorage.setItem('loginTime', time);
      }
      
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setAuthToken(null);
    setCurrentUser(null);
    setLoginTime(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loginTime');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('loginTime');
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ 
      authToken, 
      currentUser, 
      loginTime,
      isAuthenticated, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
