import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/home";
import Gamified from "./Pages/Gamified/gamified";
import "./App.css";
import Checkin from "./Pages/Regular Check-in/Checkin";

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/gamified" element={ <Gamified/> } />
          <Route path="/check-in" element={ <Checkin/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
