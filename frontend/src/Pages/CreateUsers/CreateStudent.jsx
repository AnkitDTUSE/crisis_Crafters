import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateStudent = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [roll, setRoll] = useState("");
  const [phnNo1, setPhnNo1] = useState("");
  const [phnNo2, setPhnNo2] = useState("");
  const [guardian, setGuardian] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/create/user",
        { name, roll, password, phnNo1, phnNo2, guardian },
        { withCredentials: true }
      );
      navigate("/login");
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
      <div className="bg-zinc-800 min-h-screen flex flex-col p-8 w-full">
        <a
          href="/"
          className="flex justify-between items-center bg-zinc-600 rounded-lg text-white p-3 w-[40px]"
        >
          <i className="ri-arrow-left-line"></i>
        </a>
        <h1 className="text-4xl text-white">crisisCrafters test-1</h1>
        <div className="w-full flex justify-center items-center mt-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-1/3 justify-center items-center border-2 border-zinc-700 rounded-md p-7"
          >
            <input
              type="text"
              className="m-2 outline-none rounded-lg text-white border border-zinc-500 text-small bg-transparent py-3 px-5 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <input
              type="text"
              className="m-2 outline-none rounded-lg text-white border border-zinc-500 text-small bg-transparent py-3 px-5 w-full"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              placeholder="Enter roll no. 24/se/030"
            />
            <input
              type="text"
              className="m-2 outline-none rounded-lg text-white border border-zinc-500 text-small bg-transparent py-3 px-5 w-full"
              value={guardian}
              onChange={(e) => setGuardian(e.target.value)}
              placeholder="Enter your guardian's name"
            />
            <input
              type="tel"
              className="m-2 outline-none rounded-lg text-white border border-zinc-500 text-small bg-transparent py-3 px-5 w-full"
              value={phnNo1}
              onChange={(e) => setPhnNo1(e.target.value)}
              placeholder="Enter emergency number 1"
            />
            <input
              type="tel"
              className="m-2 outline-none rounded-lg text-white border border-zinc-500 text-small bg-transparent py-3 px-5 w-full"
              value={phnNo2}
              onChange={(e) => setPhnNo2(e.target.value)}
              placeholder="Enter emergency number 2"
            />
            <input
              type="password"
              className="m-2 outline-none rounded-lg text-white border border-zinc-500 text-small bg-transparent py-3 px-5 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:cursor-pointer mt-3 w-1/3 p-3 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateStudent;
