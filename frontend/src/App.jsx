import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/HomeComponents/Home.jsx";
import Gamified from "./Pages/Gamified/Gamified.jsx";
import "./App.css";
import Checkin from "./Pages/Regular Check-in/Checkin.jsx";
import Login from "./Pages/Login/login.jsx";
import CreateStudent from "./Pages/CreateUsers/CreateStudent.jsx";
import WelcomeStudent from "./Pages/welcome/welcomeStudent.jsx";

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/gamified" element={ <Gamified/> } />
          <Route path="/check-in" element={ <Checkin/> } />
          <Route path="/login" element={<Login/>} />
          <Route path="/create/user" element={<CreateStudent/>} />
          <Route path="/welcome/user" element={<WelcomeStudent/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
