
import { MainLayout } from "../../components/layout/MainLayout";
import { ConversationList } from "../../components/messages/ConversationList";
import { MessageThread } from "../../components/messages/MessageThread";

export default function Messages() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <ConversationList />
          </div>
          <div className="md:col-span-2">
            <MessageThread />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
