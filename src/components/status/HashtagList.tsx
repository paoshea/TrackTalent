import { Hash } from "lucide-react";
import { Link } from "react-router-dom";

interface HashtagListProps {
  hashtags: string[];
  linkable?: boolean;
  className?: string;
}

export function HashtagList({
  hashtags,
  linkable = true,
  className = "",
}: HashtagListProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`} aria-label="Hashtags">
      {hashtags.map((tag) => {
        const content = (
          <div className="inline-flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-800">
            <Hash className="h-4 w-4" aria-hidden="true" />
            <span>{tag}</span>
          </div>
        );

        if (linkable) {
          return (
            <Link key={tag} to={`/hashtags/${tag}`} className="hover:underline">
              {content}
            </Link>
          );
        }

        return <div key={tag}>{content}</div>;
      })}
    </div>
  );
}
