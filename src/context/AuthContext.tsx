
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  username?: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  validateToken: () => void;
}

const defaultContext: AuthContextType = {
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isLoading: true,
  validateToken: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('phantToken');
      if (token) {
        try {
          validateTokenAndSetUser(token);
        } catch (error) {
          console.error('Error validating token:', error);
          logout();
        }
      } else {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Validate JWT token and set user
  const validateTokenAndSetUser = (token: string) => {
    try {
      // In a real implementation, this would decode and validate the JWT token
      // For demonstration purposes, we'll parse the stored user data
      const storedUser = localStorage.getItem('phantUser');
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      console.error('Token validation error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Validate token (can be called from components)
  const validateToken = () => {
    const token = localStorage.getItem('phantToken');
    if (token) {
      try {
        validateTokenAndSetUser(token);
      } catch (error) {
        console.error('Token validation error:', error);
        logout();
      }
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // This would be replaced with an actual API call that returns a JWT token
      // For demonstration purposes, we'll generate a mock token
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({ email, exp: Date.now() + 24 * 60 * 60 * 1000 })
      )}.mock-signature`;
      
      // Set admin status based on email for demonstration
      const isAdmin = email.includes('admin');
      
      const userData = {
        email,
        isAuthenticated: true,
        isAdmin
      };
      
      // Store token and user data
      localStorage.setItem('phantToken', mockToken);
      localStorage.setItem('phantUser', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // This would be replaced with an actual API call that returns a JWT token
      // For demonstration purposes, we'll generate a mock token
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
        JSON.stringify({ email, username, exp: Date.now() + 24 * 60 * 60 * 1000 })
      )}.mock-signature`;
      
      // Set admin status based on email for demonstration
      const isAdmin = email.includes('admin');
      
      const userData = {
        email,
        username,
        isAuthenticated: true,
        isAdmin
      };
      
      // Store token and user data
      localStorage.setItem('phantToken', mockToken);
      localStorage.setItem('phantUser', JSON.stringify(userData));
      
      setUser(userData);
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('phantToken');
    localStorage.removeItem('phantUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};
