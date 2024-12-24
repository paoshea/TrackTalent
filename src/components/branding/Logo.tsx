import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 200"
      className={className}
      aria-label="TalentTrack Logo"
    >
      {/* Background shape - represents a path/track */}
      <path
        d="M 50 150 Q 200 50 350 150"
        fill="none"
        stroke="#2563eb"
        strokeWidth="4"
        strokeDasharray="1 8"
      />

      {/* Star symbol - represents talent */}
      <g transform="translate(175,90) scale(0.8)">
        <path
          d="M 50 0 L 61 35 L 98 35 L 68 57 L 79 92 L 50 70 L 21 92 L 32 57 L 2 35 L 39 35 Z"
          fill="#fbbf24"
        />
      </g>

      {/* Ascending dots - represent progression/tracking */}
      <circle cx="100" cy="130" r="6" fill="#2563eb" />
      <circle cx="200" cy="100" r="6" fill="#2563eb" />
      <circle cx="300" cy="70" r="6" fill="#2563eb" />

      {/* Company Name */}
      <g transform="translate(200,170)">
        <text
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="24"
          fill="#1e40af"
        >
          TalentTrack
        </text>
      </g>
    </svg>
  );
}
