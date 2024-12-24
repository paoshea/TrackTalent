// import React from "react";
import { MessageList } from "../../components/messages/MessageList";

export function MessagesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
      <MessageList />
    </div>
  );
}
