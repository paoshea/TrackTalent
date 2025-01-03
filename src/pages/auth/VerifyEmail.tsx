import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import { LoadingState } from "../../components/shared/LoadingState";
import { ErrorMessage } from "../../components/shared/ErrorMessage";
import type { UserRole } from "../../types/auth";

export function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid verification link");
      return;
    }

    const verify = async () => {
      try {
        // Get stored signup data
        const signupDataStr = localStorage.getItem('signupData');
        if (!signupDataStr) {
          setError("Signup data not found. Please try registering again.");
          return;
        }

        const signupData = JSON.parse(signupDataStr);
        const userRole = signupData.role || 'candidate';

        // Verify email
        await verifyEmail(token);

        // Create profile after verification
        const { data: authData } = await supabase.auth.getUser();
        if (!authData?.user) {
          throw new Error('User not found after verification');
        }

        // Create base profile data
        const baseProfile = {
          id: authData.user.id,
          username: signupData.email.split('@')[0],
          full_name: signupData.full_name,
          email: signupData.email,
          role: signupData.role as UserRole,
          avatar_url: null,
          title: signupData.title || null,
          location: signupData.location || null,
          bio: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        // Add employer-specific fields if role is employer
        const profileData = signupData.role === 'employer'
          ? {
              ...baseProfile,
              company_name: signupData.company_name || '',
              company_size: signupData.company_size || null,
              industry: null
            }
          : baseProfile;

        // Create user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert(profileData);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw new Error(`Failed to create profile: ${profileError.message}`);
        }

        // Clear stored signup data
        localStorage.removeItem('signupData');

        // Redirect based on role
        navigate(userRole === 'employer' ? '/employer/dashboard' : '/candidate/dashboard');
      } catch (err) {
        console.error('Verification error:', err);
        setError(err instanceof Error ? err.message : "Failed to verify email. Please try again.");
      }
    };

    verify();
  }, [token, verifyEmail, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <ErrorMessage message={error} className="text-center" />
            <button
              onClick={() => navigate('/auth/register')}
              className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <MailCheck className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Verifying your email
        </h2>
        <div className="mt-8">
          <LoadingState message="Verifying your email address..." />
        </div>
      </div>
    </div>
  );
}
