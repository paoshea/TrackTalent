interface AvatarProps {
  src?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function Avatar({ src, alt, size = "md", className = "" }: AvatarProps) {
  const sizeClass = sizeClasses[size];

  if (!src) {
    const initials = alt
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <div
        className={`
          ${sizeClass} ${className}
          rounded-full bg-indigo-100 flex items-center justify-center
          text-sm font-medium text-indigo-600
        `}
        role="img"
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClass} ${className} rounded-full object-cover`}
    />
  );
}
