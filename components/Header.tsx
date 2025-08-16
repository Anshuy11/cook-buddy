
import { useRouter } from "next/router";
import Link from "next/link";

const Header = () => {
  const router = useRouter();

  return (
    <div className=" bg-gradient-to-r   from-[#03678e] via-[#600492] to-[#03678e]   sticky top-0 z-50  h-[100px] text-white flex  justify-between  ">
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
        <Link
          href={"/bookmark"}
          target="_blank"
          title="Bookmark"
          className="mt-9 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
              clip-rule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Header;
