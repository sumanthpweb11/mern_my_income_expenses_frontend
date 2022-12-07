import React from "react";
import { Spin } from "antd";

const Spinner = () => {
  return (
    <div className=" absolute top-[50%] left-[50%] translate-y-1/2 translate-x-1/2 ">
      <Spin size="large" />
    </div>
  );
};

export default Spinner;
