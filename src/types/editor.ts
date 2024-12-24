export interface UserSuggestion {
  id: string;
  label: string;
  avatar?: string;
  role?: string;
}

export interface HashtagSuggestion {
  id: string;
  label: string;
  count?: number;
  category?: string;
}

export interface EditorPosition {
  x: number;
  y: number;
}
