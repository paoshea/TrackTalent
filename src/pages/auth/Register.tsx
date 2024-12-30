import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Alert } from "../../components/shared/Alert";
import { Input } from "../../components/shared/Input";
import { Select } from "../../components/shared/Select";
import { Logo } from "../../components/branding/Logo";
import type { SignUpData } from "../../types/auth";

const roleOptions = [
  { value: "candidate", label: "Job Seeker" },
  { value: "employer", label: "Employer" },
];

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Added to get redirect parameters
  const { signUp } = useAuth();
  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "candidate",
    companyName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setError(null);
    setIsLoading(true);
    setSuccess(false);

    try {
      await signUp({
        email: formData.email.trim(),
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        role: formData.role,
        companyName: formData.role === 'employer' ? formData.companyName.trim() : undefined
      });
      
      setSuccess(true);
      localStorage.setItem('userRole', formData.role);
      
      // Add a slight delay to allow context updates
      setTimeout(() => {
        const redirectTo = searchParams.get('redirect_to'); // Check for redirect parameter
        if (redirectTo) {
          window.location.href = decodeURIComponent(redirectTo); // Redirect if available
        } else {
          const redirectPath = formData.role === 'employer' ? '/employer/dashboard' : '/candidate/dashboard';
          navigate(redirectPath, { replace: true }); // Default redirect
        }
      }, 500);
      
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message.includes('Load failed') 
          ? 'Network error. Please check your connection and try again.'
          : err.message
        : 'Failed to sign up';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="h-48 w-auto mx-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <Alert type="error" message={error} />}
          {success && <Alert type="success" message="Account created successfully!" />}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />

            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />

            <Input
              label="Email address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Select
              label="I am a..."
              options={roleOptions}
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value as "candidate" | "employer" })}
              required
            />

            {formData.role === "employer" && (
              <Input
                label="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required={formData.role === "employer"}
              />
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="text-sm text-center">
                Already have an account?{" "}
                <Link to="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}