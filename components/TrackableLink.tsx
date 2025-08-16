import React from "react";

interface TrackableLinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  viewed?: boolean;
  onClick?: (href: string) => Promise<void> | void;
}

function TrackableLink({
  href,
  children,
  className = "",
  viewed = false,
  onClick,
}: TrackableLinkProps) {
  const handleClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent default so you can handle saving first
    if (onClick) {
      await onClick(href); // Call parent handler
    }
    // Open link in new tab after saving click
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded ${
        viewed
          ? "bg-green-600 hover:bg-green-700 ring-green-400 text-white"
          : "bg-blue-500 hover:bg-blue-700 ring-blue-400 text-white"
      } ${className}`}
    >
      {children ?? (viewed ? "View Again" : "View")}
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </a>
  );
}

export default TrackableLink;
