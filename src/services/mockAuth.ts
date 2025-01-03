import { User, UserRole, UserProfile, EmployerProfile } from '../types/auth';

// Mock user data
const mockUsers: Record<string, User> = {
  'guest-candidate': {
    id: 'guest-candidate',
    email: 'guest.candidate@example.com',
    role: 'candidate',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    app_metadata: {
      role: 'candidate',
      provider: 'mock'
    },
    user_metadata: {
      full_name: 'Guest Candidate',
      avatar_url: null
    },
    aud: 'authenticated',
    email_confirmed_at: new Date().toISOString()
  },
  'guest-employer': {
    id: 'guest-employer',
    email: 'guest.employer@example.com',
    role: 'employer',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    app_metadata: {
      role: 'employer',
      provider: 'mock'
    },
    user_metadata: {
      full_name: 'Guest Employer',
      avatar_url: null
    },
    aud: 'authenticated',
    email_confirmed_at: new Date().toISOString()
  },
  'guest-partner': {
    id: 'guest-partner',
    email: 'guest.partner@example.com',
    role: 'partner',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    app_metadata: {
      role: 'partner',
      provider: 'mock'
    },
    user_metadata: {
      full_name: 'Guest Partner',
      avatar_url: null
    },
    aud: 'authenticated',
    email_confirmed_at: new Date().toISOString()
  }
};

// Mock profiles data
const mockProfiles: Record<string, UserProfile> = {
  'guest-candidate': {
    id: 'guest-candidate',
    username: 'guest.candidate',
    full_name: 'Guest Candidate',
    email: 'guest.candidate@example.com',
    role: 'candidate',
    avatar_url: null,
    title: 'Software Engineer',
    location: 'San Francisco, CA',
    bio: 'Experienced software engineer looking for new opportunities',
    experience_years: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  'guest-employer': {
    id: 'guest-employer',
    username: 'guest.employer',
    full_name: 'Guest Employer',
    email: 'guest.employer@example.com',
    role: 'employer',
    avatar_url: null,
    title: 'HR Manager',
    location: 'San Francisco, CA',
    bio: 'HR Manager at Tech Corp with expertise in tech recruitment',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    company_name: 'Tech Corp',
    company_size: '50-100',
    industry: 'Technology'
  } as EmployerProfile,
  'guest-partner': {
    id: 'guest-partner',
    username: 'guest.partner',
    full_name: 'Guest Partner',
    email: 'guest.partner@example.com',
    role: 'partner',
    avatar_url: null,
    title: 'Recruitment Partner',
    location: 'San Francisco, CA',
    bio: 'Helping companies find the best talent',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    company_name: 'Talent Solutions Inc',
    company_size: '10-50',
    industry: 'Recruitment'
  } as EmployerProfile
};

export class MockAuthService {
  private static instance: MockAuthService;
  private currentUser: User | null = null;

  private constructor() {}

  static getInstance(): MockAuthService {
    if (!MockAuthService.instance) {
      MockAuthService.instance = new MockAuthService();
    }
    return MockAuthService.instance;
  }

  async signIn(email: string, _password: string): Promise<{ user: User }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // For demo purposes, use mock data based on email
    if (email.includes('candidate')) {
      this.currentUser = mockUsers['guest-candidate'];
    } else if (email.includes('employer')) {
      this.currentUser = mockUsers['guest-employer'];
    } else {
      throw new Error('Invalid credentials');
    }

    return { user: this.currentUser };
  }

  async signUp(data: {
    email: string;
    password: string;
    role: UserRole;
    full_name: string;
  }): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create mock user
    const userId = `user-${Date.now()}`;
    const newUser: User = {
      id: userId,
      email: data.email,
      role: data.role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      app_metadata: {
        provider: 'mock',
        role: data.role
      },
      user_metadata: {
        full_name: data.full_name,
        avatar_url: null
      },
      aud: 'authenticated',
      email_confirmed_at: undefined
    };

    // Create mock profile
    const newProfile: UserProfile = {
      id: userId,
      username: data.email.split('@')[0],
      full_name: data.full_name,
      email: data.email,
      role: data.role,
      avatar_url: null,
      title: undefined,
      bio: undefined,
      location: undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Store in mock data
    mockUsers[userId] = newUser;
    mockProfiles[userId] = newProfile;

    this.currentUser = newUser;
  }

  async signOut(): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    this.currentUser = null;
  }

  async getSession(): Promise<{ user: User | null }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { user: this.currentUser };
  }

  async resetPassword(email: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In mock service, just validate email exists
    const userExists = Object.values(mockUsers).some(user => user.email === email);
    if (!userExists) {
      throw new Error('No user found with this email');
    }
  }

  async updatePassword(password: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    if (!this.currentUser) {
      throw new Error('No authenticated user');
    }
    // In mock service, just validate password
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
  }

  async updateProfile(data: Partial<UserProfile>): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    if (!this.currentUser) {
      throw new Error('No authenticated user');
    }

    const userId = this.currentUser.id;
    const currentProfile = mockProfiles[userId];
    if (!currentProfile) {
      throw new Error('Profile not found');
    }

    // Update profile
    mockProfiles[userId] = {
      ...currentProfile,
      ...data,
      updated_at: new Date().toISOString()
    };
  }

  async verifyEmail(token: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    if (!this.currentUser) {
      throw new Error('No authenticated user');
    }
    // In mock service, just validate token format
    if (!/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token)) {
      throw new Error('Invalid verification token');
    }
  }

  async getProfile(userId: string): Promise<UserProfile | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockProfiles[userId] || null;
  }

  // Helper method to get mock data for guest routes
  getMockData(role: UserRole) {
    const userId = `guest-${role}`;
    return {
      user: mockUsers[userId],
      profile: mockProfiles[userId]
    };
  }
}

export const mockAuth = MockAuthService.getInstance();
