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

  const handleClick = () => {
    if (onClick) {
      onClick(href); //  Open link in new tab after saving click
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm rounded ${
        viewed
          ? "bg-green-600 hover:bg-green-700 ring-green-400 text-white"
          : "bg-blue-500 hover:bg-blue-700 ring-blue-400 text-white"
      } ${className}`}
    >
      {children ?? (viewed ? "View Again" : "View")}
    </a>
  );
}

export default TrackableLink;
