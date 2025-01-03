import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/branding/Logo';
import { MainLayout } from '../../components/layout/MainLayout';
import { MessageList } from '../../components/messages/MessageList';
import { MessageThread } from '../../components/messages/MessageThread';

interface Conversation {
  id: string;
  recipientId: string;
}

export default function Messages() {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <div className="text-center mb-12">
          <Logo className="h-48 w-auto mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Messages</h1>
          <p className="text-lg text-gray-600">Communicate with candidates</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1">
            <MessageList onConversationSelect={handleConversationSelect} />
          </div>
          <div className="col-span-2">
            {selectedConversation ? (
              <MessageThread
                conversationId={selectedConversation.id}
                recipientId={selectedConversation.recipientId}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
