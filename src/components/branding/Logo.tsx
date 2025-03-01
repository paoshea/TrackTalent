interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 140"
      className={className}
      aria-label="TalentTrack Logo"
    >
      {/* Background shape - represents a path/track */}
      <path
        d="M 40 100 Q 200 60 360 100"
        fill="none"
        stroke="#2563eb"
        strokeWidth="3"
        strokeDasharray="1 6"
      />

      {/* Star symbol - represents talent */}
      <g transform="translate(50,65) scale(0.8)">
        <path
          d="M 50 0 L 61 35 L 98 35 L 68 57 L 79 92 L 50 70 L 21 92 L 32 57 L 2 35 L 39 35 Z"
          fill="#fbbf24"
        />
      </g>

      {/* Ascending dots - represent progression/tracking */}
      <circle cx="120" cy="75" r="4" fill="#2563eb" />
      <circle cx="220" cy="65" r="4" fill="#2563eb" />
      <circle cx="320" cy="55" r="4" fill="#2563eb" />

      {/* Company Name */}
      <g transform="translate(140,105)">
        <text
          textAnchor="start"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="32"
          fill="#1e40af"
        >
          TalentTrack
        </text>
      </g>
    </svg>
  );
}
