import { Link } from "react-router-dom";
import { MainLayout } from "../../components/layout/MainLayout";
import { Button } from "../../components/shared/Button";

export function SuccessPage() {
  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We&apos;ve received your application and will review it shortly.
          </p>

          <div className="space-y-4">
            <Button as={Link} to="/dashboard" variant="primary">
              Return to Dashboard
            </Button>
            <Button as={Link} to="/jobs" variant="secondary">
              Browse More Jobs
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
