import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'responder' | 'user';
  phone?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, additionalData?: any) => Promise<boolean>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users data - in production, this would come from your database
const MOCK_USERS: User[] = [
  {
    id: 'admin-1',
    name: 'System Administrator',
    email: 'admin@ers.com',
    role: 'admin',
  },
  {
    id: 'resp-1',
    name: 'Fire Chief Smith',
    email: 'chief@firedept.com',
    role: 'responder',
    department: 'Fire Department',
  },
  {
    id: 'resp-2',
    name: 'Officer Johnson',
    email: 'johnson@police.com',
    role: 'responder',
    department: 'Police Department',
  },
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    phone: '+1234567890',
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Admin login
      if (email === 'admin@ers.com' && password === 'admin123') {
        const adminUser = MOCK_USERS.find(u => u.email === email);
        if (adminUser) {
          setUser(adminUser);
          return true;
        }
      }
      
      // Find user by email
      const foundUser = MOCK_USERS.find(u => u.email === email);
      if (foundUser && password.length >= 6) {
        setUser(foundUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    additionalData?: any
  ): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = MOCK_USERS.find(u => u.email === email);
      if (existingUser) {
        return false;
      }
      
      // Create new user (regular users only)
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: additionalData?.name || 'New User',
        email,
        role: 'user',
        phone: additionalData?.phone,
      };
      
      MOCK_USERS.push(newUser);
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}