export type ReactionType = "like" | "heart" | "celebrate" | "laugh";

export interface CommentUser {
  id: string;
  name: string;
  avatar?: string;
}

export interface CommentReaction {
  type: ReactionType;
  count: number;
  userReacted: boolean;
}

export interface Comment {
  id: string;
  content: string;
  user: CommentUser;
  createdAt: string;
  updatedAt: string;
  reactions: CommentReaction[];
}

export interface UseCommentsOptions {
  statusId: string;
  limit?: number;
}

export interface UseCommentsResult {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  addComment: (content: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
  toggleReaction: (commentId: string, type: ReactionType) => Promise<void>;
  refresh: () => Promise<void>;
}
