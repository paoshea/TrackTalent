import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { OnboardingFlow } from "../pages/onboarding/OnboardingFlow";
import { Dashboard } from "../components/Dashboard";
import type { User } from "../types/auth";

type OnboardingCompleteHandler = (user: User) => string;

export function AppRoutes() {
  const { user } = useAuth();

  const handleOnboardingComplete: OnboardingCompleteHandler = (user) => {
    // Return appropriate dashboard path based on user role
    switch (user.role) {
      case "employer":
        return "/dashboard/employer";
      case "candidate":
        return "/dashboard/candidate";
      case "admin":
        return "/dashboard/admin";
      default:
        return "/dashboard";
    }
  };

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/onboarding"
            element={<OnboardingFlow onComplete={handleOnboardingComplete} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      ) : (
        <>
          <Route
            path="/onboarding"
            element={<OnboardingFlow onComplete={handleOnboardingComplete} />}
          />
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </>
      )}
    </Routes>
  );
}
