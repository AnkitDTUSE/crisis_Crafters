import React from "react";
import logo from "../../../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

const navbar = () => {

  const linkClasses =({isActive})=> isActive?"py-2 px-3 text-blue-500 transition-all duration-[50ms] rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]":"hover:text-blue-500"
 const navigate=useNavigate();
  return (
    <div>
      
      <nav className="bg-zinc-200 flex justify-between items-center m-1 p-2 rounded-md">
        <div onClick={()=>navigate('/')} className=" hover:cursor-pointer w-[fit-content] h-[3rem] flex items-center gap-2"><img src={logo} className="w-full h-full" alt="logo" /><h1>CrsisCrafters</h1></div>

        <div className="  ml-15 flex justify-around gap-2 w-[25vw] items-center">
          
          <NavLink className={linkClasses} to="/">
            Home
          </NavLink>
          <NavLink className={linkClasses} to="/gamified">
            Game
          </NavLink>
          <NavLink className={linkClasses} to="/check-in">
            checkin
          </NavLink>
        </div>
        <div className="flex gap-2">
          <NavLink
            className="bg-yellow-500 border-2 border-yellow-500 hover:border-yellow-500 hover:border-2 hover:bg-transparent transition-all duration-[10ms]  text-black font-semibold rounded-md py-2 px-3"
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className="bg-yellow-500 border-2 border-yellow-500  hover:border-yellow-500 hover:border-2 hover:bg-transparent transition-all duration-[10ms]   text-black font-semibold rounded-md py-2 px-3"
            to="/create/user"
          >
            register
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default navbar;
