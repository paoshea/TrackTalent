export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  company: string;
  companyId: string;
}

export interface MessageInputProps {
  onSend: (content: string) => Promise<void>;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

// Internal type for database operations
export interface DatabaseMessage extends Record<string, unknown> {
  id: string;
  conversation_id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_read: boolean;
}

// Helper function to convert database message to application message
export function convertDatabaseMessage(dbMessage: DatabaseMessage): Message {
  return {
    id: dbMessage.id,
    conversationId: dbMessage.conversation_id,
    senderId: dbMessage.sender_id,
    recipientId: dbMessage.recipient_id,
    content: dbMessage.content,
    createdAt: dbMessage.created_at,
    updatedAt: dbMessage.updated_at,
    isRead: dbMessage.is_read,
  };
}
