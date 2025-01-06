import { User, SignUpData, AuthCredentials } from '../types/auth';

const mockUsers: Record<string, User> = {
  'candidate@example.com': {
    id: '1',
    email: 'candidate@example.com',
    role: 'candidate',
    name: 'John Doe',
    created_at: '2024-01-01T00:00:00Z',
    user_metadata: {
      full_name: 'John Doe',
      avatar_url: null,
      role: 'candidate'
    },
    app_metadata: {
      provider: 'email',
      role: 'candidate'
    }
  },
  'employer@example.com': {
    id: '2',
    email: 'employer@example.com',
    role: 'employer',
    name: 'Jane Smith',
    company: 'TechCorp',
    created_at: '2024-01-01T00:00:00Z',
    user_metadata: {
      full_name: 'Jane Smith',
      avatar_url: null,
      role: 'employer'
    },
    app_metadata: {
      provider: 'email',
      role: 'employer'
    }
  },
  'partner@example.com': {
    id: '3',
    email: 'partner@example.com',
    role: 'partner',
    name: 'Mike Johnson',
    company: 'Training Partners Inc',
    created_at: '2024-01-01T00:00:00Z',
    user_metadata: {
      full_name: 'Mike Johnson',
      avatar_url: null,
      role: 'partner'
    },
    app_metadata: {
      provider: 'email',
      role: 'partner'
    }
  }
};

export async function signIn(credentials: AuthCredentials): Promise<{ user: User }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = mockUsers[credentials.email];
  if (!user) {
    throw new Error('Invalid email or password');
  }

  return { user };
}

export async function signUp(data: SignUpData): Promise<{ user: User }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    email: data.email,
    role: data.role,
    name: data.full_name,
    company: data.company,
    created_at: new Date().toISOString(),
    user_metadata: {
      full_name: data.full_name,
      avatar_url: null,
      role: data.role
    },
    app_metadata: {
      provider: 'email',
      role: data.role
    }
  };

  mockUsers[data.email] = newUser;
  return { user: newUser };
}

export async function signOut(): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
}

export async function resetPassword(email: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!mockUsers[email]) {
    throw new Error('User not found');
  }
}

export async function verifyEmail(token: string): Promise<void> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (!token) {
    throw new Error('Invalid token');
  }
}
