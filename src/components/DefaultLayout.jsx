import React from "react";
import { Button, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user-expense"));
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: (
        <li
          onClick={() => {
            localStorage.removeItem("user-expense");
            navigate("/login");
          }}
        >
          Logout
        </li>
      ),
    },
  ];
  return (
    <div className="layout p-2 md:my-0 md:mx-28 ">
      {/* Header/Navigation */}
      <header>
        <div className="  header flex justify-between items-center bg-green-50 p-4 rounded-br-[25px] rounded-bl-[25px]">
          <h1 className="logo cursor-pointer m-0 uppercase text-xl text-black font-bold opacity-70 ">
            Money
          </h1>
          <div className="flex justify-between items-centers gap-3">
            <Dropdown
              menu={{
                items,
              }}
              placement="topRight"
              arrow
            >
              <Button>{user.name}</Button>
            </Dropdown>
            {/* <span className=" font-semibold ">{user.name}</span> */}
          </div>
        </div>
      </header>

      {/* Children */}
      <div className="content overflow-y-auto  rounded-tr-[15px] rounded-tl-[15px] h-[85vh] shadow-red-900 bg-orange-50 mt-5 p-[15px]">
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
