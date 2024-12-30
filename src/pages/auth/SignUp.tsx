import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/shared/Button";
import { Input } from "../../components/shared/Input";
import { Select } from "../../components/shared/Select";
import { Alert } from "../../components/shared/Alert";
import type { SignUpData } from "../../types/auth";

const roleOptions = [
  { value: "candidate", label: "Job Seeker" },
  { value: "employer", label: "Employer" },
];

export function SignUp() {
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

  const handleChange =
    (field: keyof SignUpData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleRoleChange = (value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      role: value as SignUpData["role"],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signUp(formData);
      // Redirect to onboarding after successful signup
      navigate("/onboarding");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <Alert type="error" message={error} />}

          <div className="rounded-md shadow-sm space-y-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={handleChange("firstName")}
              required
              autoComplete="given-name"
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange("lastName")}
              required
              autoComplete="family-name"
            />
            <Input
              label="Email address"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
              required
              autoComplete="new-password"
            />
            <Select
              label="I am a..."
              options={roleOptions}
              value={formData.role}
              onChange={handleRoleChange}
              required
            />
            {formData.role === "employer" && (
              <Input
                label="Company Name"
                value={formData.companyName}
                onChange={handleChange("companyName")}
                required={formData.role === "employer"}
              />
            )}
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
