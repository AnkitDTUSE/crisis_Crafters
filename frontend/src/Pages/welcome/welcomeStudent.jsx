import React from "react";

const welcomeStudent = () => {
  return (
    <>
      <div class="bg-zinc-800 min-h-screen flex flex-col p-10 w-full">
        <div class="flex justify-between w-full">
          <h1 class="text-4xl text-white">Welcome to student page test-1</h1>
          <a
            href="/logout"
            class="bg-yellow-500 text-black rounded-md py-3 px-6 h-[50px]"
          >
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default welcomeStudent;
