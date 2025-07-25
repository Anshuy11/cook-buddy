import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";
import { saveClickedLink } from "../lib/saveClick";

function TrackableLink({ href, children, className = "", viewed = false, onClick }) {
  const handleClick = async (e) => {
    if (onClick) await onClick(href); // call parent handler
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded ${
        viewed
          ? "bg-green-600 hover:bg-green-700 ring-green-400 text-white"
          : "bg-blue-500 hover:bg-blue-700 ring-blue-400 text-white"
      } ${className}`}
    >
      {children ?? (viewed ? "Viewed Again" : "View")}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  );
}

export default TrackableLink;
