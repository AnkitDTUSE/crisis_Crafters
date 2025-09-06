import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const login = () => {
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        { formData },
        { withCredentials: true }
      );
      console.log("login success: ", res.data);
      navigate("/welcome/user");
    } catch (err) {
      if (err.response) {
        console.error("Login failed:", err.response.data);
      } else {
        console.error("Error:", err.message);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-50 to-slate-200">
        <div className="bg-white p-8 flex items-center gap-8 rounded-2xl shadow-lg w-full max-w-[fit-content]">
          <img src={logo} className=" w-[20rem] h-full" alt="" />
          <div className="flex flex-col">
            <div className="flex  mb-6 items-center justify-between">
              <div className="gap-5 flex items-center"><i
                onClick={() => navigate("/")}
                className="ri-arrow-left-line hover:cursor-pointer"
              ></i>
              <h1 className="text-2xl font-bold text-gray-800 ">
                Student Login
              </h1></div>
            <div>
              <button
                onClick={() => navigate("/login/admin")}
                className="w-[fit-content] bg-gray-800 py-1 px-4 text-white  rounded-md hover:bg-gray-900 transition"
              >
                Click here if ADMIN
              </button></div>
            </div>
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 w-[40vw] ">
              <div>
                <label className="block text-[1rem] text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-2 leading-1 py-1 mb-3 border-b border-zinc-600  text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-[1rem] text-gray-700 font-medium">Roll</label>
                <input
                  type="text"
                  name="roll"
                  value={formData.roll}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-2 leading-1 py-1 mb-3 border-b border-zinc-600  text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter your roll number"
                />
              </div>

              <div>
                <label className="block text-[1rem] text-gray-700 font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full mb-3 mt-1 px-2 leading-1 py-1 border-b border-zinc-600  text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Login
              </button>
            </form>

            {/* Extra Admin Button */}
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
