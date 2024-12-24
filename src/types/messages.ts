export interface Message extends Record<string, unknown> {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isRead: boolean;
  // Database column names
  conversation_id?: string;
  sender_id?: string;
  recipient_id?: string;
  created_at?: string;
  updated_at?: string;
  is_read?: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MessageInputProps {
  onSubmit: (content: string) => Promise<void>;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

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
