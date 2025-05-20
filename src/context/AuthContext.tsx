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

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('phantToken');
      const storedUser = localStorage.getItem('phantUser');
      
      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing user data:', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const validateTokenAndSetUser = (token: string) => {
    try {
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
    }
  };

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

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // For demo purposes, set admin status based on email
      const isAdmin = email.includes('admin');
      
      const userData = {
        email,
        isAuthenticated: true,
        isAdmin
      };
      
      const mockToken = `mock_token_${Date.now()}`;
      
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

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const isAdmin = email.includes('admin');
      
      const userData = {
        email,
        username,
        isAuthenticated: true,
        isAdmin
      };
      
      const mockToken = `mock_token_${Date.now()}`;
      
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