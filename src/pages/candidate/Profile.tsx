
import { MainLayout } from "../../components/layout/MainLayout";
import { ProfileEditor } from "../../components/profile/ProfileEditor";
import { ResumeUploader } from "../../components/profile/ResumeUploader";

export default function Profile() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">My Profile</h1>
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ProfileEditor />
          <ResumeUploader />
        </div>
      </div>
    </MainLayout>
  );
}
