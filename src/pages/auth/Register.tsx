
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/shared/Button";
import { Input } from "../../components/shared/Input";
import { Alert } from "../../components/shared/Alert";

export function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "jobseeker"
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await signUp(formData);
      if (response?.user) {
        setSuccess(true);
        navigate("/auth/verify-email", { 
          state: { email: formData.email }
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
  );
}
