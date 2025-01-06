import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const { verifyEmail, loading, error } = useAuth();
  const [verified, setVerified] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    const verify = async () => {
      if (!token || !verifyEmail) {
        return;
      }

      try {
        await verifyEmail(token);
        setVerified(true);
      } catch (err) {
        // Error is handled by auth context
      }
    };

    verify();
  }, [token, verifyEmail]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600">
          Verifying your email...
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Invalid verification link
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please check your email for the correct link or request a new one.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Email verification failed
          </h2>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Email verified successfully
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            You can now sign in to your account.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
