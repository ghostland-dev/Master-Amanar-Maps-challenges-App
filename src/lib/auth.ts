
import { jwtDecode } from "jwt-decode";
import { prisma } from "./prisma";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin' | 'superadmin';
}

export interface Session {
  user: User | null;
  expires: Date;
}

// Simple in-memory token store (in a real app, this would be a database)
const tokens = new Map<string, { user: User; expires: Date }>();

/**
 * Simple authentication logic
 * In a real application, this would use a proper auth library
 */
export const signIn = async (email: string, password: string): Promise<{ user: User; token: string } | null> => {
  try {
    // In a real app, we would validate against database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }
    
    // In a real app, we would check password hash
    // For this mock, we'll just proceed
    
    const token = generateToken(user);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // 7 days from now
    
    tokens.set(token, {
      user: {
        id: user.id,
        name: user.name || '',
        email: user.email,
        image: user.image || undefined,
        role: (user.role as 'user' | 'admin' | 'superadmin') || 'user',
      },
      expires,
    });
    
    return { 
      user: {
        id: user.id,
        name: user.name || '',
        email: user.email,
        image: user.image || undefined,
        role: (user.role as 'user' | 'admin' | 'superadmin') || 'user',
      }, 
      token 
    };
  } catch (error) {
    console.error('Error signing in:', error);
    return null;
  }
};

export const signOut = (token: string): boolean => {
  return tokens.delete(token);
};

export const getSession = (token: string): Session | null => {
  const session = tokens.get(token);
  
  if (!session) {
    return null;
  }
  
  if (session.expires < new Date()) {
    tokens.delete(token);
    return null;
  }
  
  return {
    user: session.user,
    expires: session.expires,
  };
};

// For client-side auth state management
export const getCurrentUser = (): User | null => {
  const token = localStorage.getItem('auth_token');
  
  if (!token) {
    return null;
  }
  
  try {
    const decoded = jwtDecode<{ sub: string; exp: number }>(token);
    
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('auth_token');
      return null;
    }
    
    // In a real app, we would verify this token with the server
    // For now, we'll just return a mocked user
    return {
      id: decoded.sub,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('auth_token');
    return null;
  }
};

// Helper function to generate a JWT-like token
function generateToken(user: any): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.id,
    name: user.name || '',
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 7 days
  }));
  const signature = btoa('signature'); // In a real app, this would be a proper signature
  
  return `${header}.${payload}.${signature}`;
}
