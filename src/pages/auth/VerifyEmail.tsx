import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { LoadingState } from "../../components/shared/LoadingState";
import { ErrorMessage } from "../../components/shared/ErrorMessage";

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
        const userRole = localStorage.getItem('userRole') || 'candidate'; // Get user role from local storage
        await verifyEmail(token);
        navigate(userRole === 'employer' ? '/employer/dashboard' : '/candidate/dashboard'); // Redirect based on role
      } catch (err) {
        setError("Failed to verify email. Please try again.");
      }
    };

    verify();
  }, [token, verifyEmail, navigate]);

  if (error) {
    return <ErrorMessage message={error} />;
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