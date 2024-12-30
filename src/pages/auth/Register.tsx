
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Alert } from "../../components/shared/Alert";
import { Button } from "../../components/shared/Button";
import { Input } from "../../components/shared/Input";
import { Select } from "../../components/shared/Select";
import { Logo } from "../../components/branding/Logo";
import type { SignUpData } from "../../types/auth";

const roleOptions = [
  { value: "candidate", label: "Job Seeker" },
  { value: "employer", label: "Employer" },
];

export function Register() {
  const navigate = useNavigate();
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
    setError(null);
    setIsLoading(true);

    try {
      await signUp(formData);
      setSuccess(true);
      // Show success message for 2 seconds before redirecting
      setTimeout(() => {
        navigate("/auth/verify-email", { 
          state: { 
            email: formData.email,
            fromRegistration: true 
          } 
        });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <Link to="/" className="mr-4 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <Logo className="h-48 w-auto" />
        </div>
      </nav>
      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
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
                  required
                />
              )}

              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Sign up
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="text-sm text-center">
                  Already have an account?{' '}
                  <Link to="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
