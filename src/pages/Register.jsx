import React, { useState } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      await axios.post("/api/users/register", values);

      message.success("hshshs");
      navigate("/login");
    } catch (err) {
      message.error("registration failed");
    }

    // message.success(message);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row gap-x-7 justify-center items-center w-full h-screen bg-green-50 m-auto p-12 ">
        {/* IMAGE */}
        <div className=" w-[50%] m-auto ">
          <h1 className=" text-3xl flex justify-start p-2 items-center ">
            Hello
          </h1>
          <div className=" h-[400px] ">
            <lottie-player
              src="https://assets4.lottiefiles.com/packages/lf20_alg1vyxd.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        {/* FORM */}
        <div className=" p-2 md:w-[50%] m-auto">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name">
              <Input
                type="text"
                className=" bg-transparent border-r-0 border-l-0 border-t-0 border-b-gray-300 "
              />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input
                type="email"
                className=" bg-transparent border-r-0 border-l-0 border-t-0 border-b-gray-300 "
              />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input
                type="password"
                className=" bg-transparent border-r-0 border-l-0 border-t-0 border-b-gray-300 "
              />
            </Form.Item>

            <div className="flex justify-between">
              <Link to="/login">Already Registered? Click here to Login</Link>
              <button
                type="submit"
                className=" bg-yellow-500 px-2 py-1 border-none "
              >
                Register
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
