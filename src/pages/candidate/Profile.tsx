
import { MainLayout } from "../../components/layout/MainLayout";
import { CandidateProfile } from "../../components/profile/CandidateProfile";

export default function Profile() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Profile</h1>
        <CandidateProfile />
      </div>
    </MainLayout>
  );
}
