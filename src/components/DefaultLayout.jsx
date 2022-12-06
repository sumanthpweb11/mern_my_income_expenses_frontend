import React from "react";

const DefaultLayout = ({ children }) => {
  return (
    <div className="layout p-2 md:my-0 md:mx-28 ">
      {/* Header/Navigation */}
      <header>
        <div className="  header flex justify-between items-center bg-green-50 p-4 rounded-br-[25px] rounded-bl-[25px]">
          <h1 className="logo cursor-pointer m-0 uppercase text-xl text-black font-bold opacity-70 ">
            Money
          </h1>
          <h1 className=" font-semibold ">Username</h1>
        </div>
      </header>

      {/* Children */}
      <div className="content rounded-tr-[15px] rounded-tl-[15px] h-[85vh] shadow-red-900 bg-gray-50 flex justify-center items-center mt-5 p-[15px]">
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
