import { useContext, useState } from "react";
import { ThemeColor } from "@/context/ThemeContext";
import MobileSidebar from "./MobileSidebar";


const Header = (props) => {
  const [userOpen, setUserOpen] = useState(false);
  const [signupLoginopen, setSignupLoginopen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { theme, ToggleFunc } = useContext(ThemeColor);



  return (
    <div
      className={
        theme === "Light"
          ? " bg-gradient-to-r   from-[#03148e] via-[#600492] to-[#03148e]   relative  h-[100px] text-white flex  justify-between  "
          : "   bg-black  h-[100px] text-white flex  justify-between relative "
      }
    >
     
      {/* Logo section */}
      <div className="flex justify-start gap-8">
        <div className="flex justify-start items-start gap-6">
          <div
            onClick={() => router.push("/")}
            className="text-white  font-semibold sm:text-[14px] text-[12px] md:flex gap-1 cursor-pointer hidden "
          >
            <img
              className="h-[150px] w-[150px] object-contain -mt-2 "
              src="/logo.png"
            />
            

          </div>
          <div className="text-white mt-3  font-semibold sm:text-[14px] text-[12px] flex gap-1 cursor-pointer md:hidden">
            
             <MobileSidebar theme={theme} />
              <img
               onClick={() => router.push("/")}
              className="h-[100px] w-[100px] object-contain mt-2 "
              src="/logo.png"
            />
           
          </div>
        </div>
      </div>
      <div className="flex  items-center pl-3 gap-4">
       

        {/* Dual theme section */}
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
              className={`absolute top-0.5 h-5 w-5 rounded-full cursor-pointer transition-all duration-500 ease-in-out
        ${
          theme === "Light"
            ? "translate-x-1 bg-black"
            : "translate-x-6 bg-gradient-to-r   from-[#03148e] via-[#600492] to-[#03148e] "
        }`}
            ></div>
          </div>
        </div>
      
     
      </div>
    </div>
  );
};

export default Header;
