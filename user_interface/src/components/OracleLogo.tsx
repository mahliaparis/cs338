export function OracleLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient1)"
        strokeWidth="3"
        fill="none"
        opacity="0.3"
      />
      
      {/* Inner circle */}
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke="url(#gradient1)"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      
      {/* Center orb */}
      <circle cx="50" cy="50" r="25" fill="url(#gradient2)" />
      
      {/* OR text */}
      <text
        x="50"
        y="57"
        textAnchor="middle"
        fill="white"
        fontSize="24"
        fontWeight="bold"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        OR
      </text>
      
      {/* Pulse ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        stroke="url(#gradient1)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
