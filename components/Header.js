import { useContext, useState } from "react";
import { ThemeColor } from "@/context/ThemeContext";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = (props) => {
  const { theme, ToggleFunc } = useContext(ThemeColor);

  const router = useRouter(null);

  return (
    <div
      className={
        theme === "Light"
          ? " bg-gradient-to-r   from-[#03678e] via-[#600492] to-[#03678e]   sticky top-0 z-50  h-[100px] text-white flex  justify-between  "
          : "   bg-black  h-[100px] text-white flex  justify-between sticky top-0 z-50 "
      }
    >
      {/* Logo section */}
      <div className="flex justify-start gap-8">
        <div className="flex justify-start items-start gap-6">
          <div
            onClick={() => router.push("/")}
            className="text-white  font-semibold sm:text-[14px] text-[12px] md:flex gap-1 cursor-pointer  "
          >
            <img
              className="md:h-[150px] md:w-[150px] h-[100px] w-[100px] mt-5 object-contain md:-mt-2 "
              src="/logo.png"
            />
          </div>
        </div>
      </div>
      <div className="flex  items-center pl-3 gap-4 ">
        {/* Bookmark section */}
        <Link href={"/bookmark"} target="_blank" title="Bookmark" className="mt-9 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
              clip-rule="evenodd"
            />
          </svg>
        </Link>
        {/* Dual theme section */}
        <div className="flex  items-center pl-3 gap-4  ">
          <div className="flex flex-col items-center pl-3 mt-10 pr-1 md:pr-0">
            <div
              className={`relative w-12 h-6 rounded-full border transition-all duration-500 ease-in-out ${
                theme === "Light"
                  ? "bg-white border-gray-300"
                  : "bg-white border-gray-300"
              }`}
            >
              <div
                onClick={ToggleFunc}
                className={`absolute top-0.5 h-5 w-5 flex items-center justify-center rounded-full cursor-pointer transition-all duration-500 ease-in-out
    ${theme === "Light" ? "translate-x-1 bg-white" : "translate-x-6 bg-black"}
  `}
              >
                {theme === "Light" ? (
                  // Moon icon for dark mode
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z" />
                  </svg>
                ) : (
                  // Sun icon for light mode
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
