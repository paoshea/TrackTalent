import { Hash, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useTrendingHashtags } from "../../hooks/useTrendingHashtags";
import { LoadingState } from "../shared/LoadingState";

interface TrendingHashtagsProps {
  limit?: number;
  className?: string;
}

export function TrendingHashtags({
  limit = 5,
  className = "",
}: TrendingHashtagsProps) {
  const { hashtags, isLoading, error } = useTrendingHashtags(limit);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <div className="text-sm text-red-600" role="alert">
        Failed to load trending hashtags
      </div>
    );
  }

  if (!hashtags?.length) {
    return <div className="text-sm text-gray-500">No trending hashtags</div>;
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Trending Hashtags</h2>
        <TrendingUp className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <div className="space-y-4">
        {hashtags.map(({ tag, count, trend }) => (
          <Link
            key={tag}
            to={`/hashtags/${tag}`}
            className="
              block p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50
              transition-colors duration-200
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center min-w-0">
                <Hash
                  className="h-5 w-5 text-indigo-600 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-900 truncate">
                  {tag}
                </span>
              </div>
              <div className="ml-4 flex items-center flex-shrink-0">
                <span className="text-sm text-gray-500">
                  {count.toLocaleString()}
                </span>
                {trend !== 0 && (
                  <div
                    className={`
                      ml-2 flex items-center text-sm
                      ${trend > 0 ? "text-green-600" : "text-red-600"}
                    `}
                  >
                    <TrendingUp
                      className={`h-4 w-4 ${trend > 0 ? "" : "transform rotate-180"}`}
                      aria-hidden="true"
                    />
                    <span className="ml-1">{Math.abs(trend)}%</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
