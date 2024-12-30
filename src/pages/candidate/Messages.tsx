
import { MainLayout } from "../../components/layout/MainLayout";
import { MessageList } from "../../components/messages/MessageList";

export default function Messages() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Messages</h1>
        <MessageList />
      </div>
    </MainLayout>
  );
}
