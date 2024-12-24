import { Star } from "lucide-react";

interface SkillRatingProps {
  value: number;
  maxValue?: number;
  size?: "sm" | "md" | "lg";
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function SkillRating({
  value,
  maxValue = 5,
  size = "md",
  onChange,
  disabled = false,
  className = "",
}: SkillRatingProps) {
  const stars = Array.from({ length: maxValue }, (_, index) => index + 1);
  const iconSize = sizeClasses[size];

  return (
    <div
      className={`inline-flex items-center space-x-1 ${className}`}
      role="radiogroup"
      aria-label={`Rating: ${value} out of ${maxValue} stars`}
    >
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          disabled={disabled}
          className={`
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            disabled:cursor-not-allowed disabled:opacity-50
            ${onChange ? "cursor-pointer" : "cursor-default"}
          `}
          role="radio"
          aria-checked={star === value}
          aria-label={`${star} stars`}
        >
          <Star
            className={`
              ${iconSize}
              ${star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              transition-colors
            `}
          />
        </button>
      ))}
    </div>
  );
}
