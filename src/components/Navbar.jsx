import React from "react";
import { IoIosMenu, IoIosArrowDown } from "react-icons/io";
import { AiOutlineThunderbolt } from "react-icons/ai";

const Topbar = ({ setIsOpen }) => {
  return (
    <section className="flex items-center justify-start gap-3 p-3 md:p-4 border-b border-gray-300 w-full h-16 bg-white shadow-sm">
      
     
      <div className="flex items-center gap-3">
       
        <button onClick={() => setIsOpen(true)}>
          <IoIosMenu size={26} />
        </button>

        
        <h1 className="hidden md:block font-semibold text-gray-700">
         <p className="text-green-500 font-bold text-2xl">Zing <span className="text-blue-500">AI</span></p> 
        </h1>
      </div>

     
      <div className="flex items-center gap-2 sm:gap-3 bg-gray-100 px-2 sm:px-3 py-1.5 rounded-lg">
        
       
        <div className="flex items-center justify-center h-7 w-7 bg-green-500 rounded-md">
          <AiOutlineThunderbolt className="text-white text-lg" />
        </div>

        
       <div className="relative">
        <select className="appearance-none bg-transparent pr-6 text-sm sm:text-base font-medium text-gray-700 focus:outline-none cursor-pointer">
          <option>Default (GPT-3.5)</option>
          <option>GPT-4</option>
        </select>

        {/* Custom Arrow */}
        <IoIosArrowDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
      </div>
    </section>
  );
};

export default Topbar;