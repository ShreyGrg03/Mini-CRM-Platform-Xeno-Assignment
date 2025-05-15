
import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'admin' | 'customer' | null;

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  
  // Check if user is already logged in from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock users for demo purposes
  const mockUsers = {
    admin: { id: 1, name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' as UserRole },
    customer: { id: 2, name: 'Customer User', email: 'customer@example.com', password: 'customer123', role: 'customer' as UserRole }
  };

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // In a real app, you would validate credentials against an API
    // This is just a mock implementation
    
    let userToCheck;
    
    if (role === 'admin') {
      userToCheck = mockUsers.admin;
    } else if (role === 'customer') {
      userToCheck = mockUsers.customer;
    } else {
      return false;
    }
    
    if (email === userToCheck.email && password === userToCheck.password) {
      const authUser = {
        id: userToCheck.id,
        name: userToCheck.name,
        email: userToCheck.email,
        role: userToCheck.role
      };
      
      setUser(authUser);
      localStorage.setItem('auth_user', JSON.stringify(authUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};