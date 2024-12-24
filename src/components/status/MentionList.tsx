import { AtSign } from "lucide-react";
import { Link } from "react-router-dom";

interface MentionListProps {
  mentions: string[];
  linkable?: boolean;
  className?: string;
}

export function MentionList({
  mentions,
  linkable = true,
  className = "",
}: MentionListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} aria-label="Mentions">
      {mentions.map((username) => {
        const content = (
          <div className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800">
            <AtSign className="h-4 w-4" aria-hidden="true" />
            <span>{username}</span>
          </div>
        );

        if (linkable) {
          return (
            <Link
              key={username}
              to={`/users/${username}`}
              className="hover:underline"
            >
              {content}
            </Link>
          );
        }

        return <div key={username}>{content}</div>;
      })}
    </div>
  );
}
