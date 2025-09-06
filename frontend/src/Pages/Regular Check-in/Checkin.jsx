import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Navbar from "../Home/HomeComponents/Navbar/Navbar";
import "./Checkin.css";

const Checkin = () => {
  const [scenario, setScenario] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const handleStart = () => {
    if (!scenario || !location) {
      alert("⚠️ Please select both a scenario and a location.");
      return;
    }
    navigate(`/quiz?scenario=${scenario}&location=${location}`);
  };

  return (
    <div className="main-container">
      <div className="container flex flex-col">
        <Navbar />

        <div className="header">
          <h1 className="main-head">
            LET'S SEE IF YOU CAN MAKE IT OUT ALIVE…?
          </h1>
          <p className="sub-head">
            Imagine disaster strikes{" "}
            <span className="danger-text">right now</span>. Choose a scenario
            and location to test your survival instincts.
          </p>
        </div>

        <div className="footer">
          <div className="image">
            <img src={logo} alt="" className="logo-image" />
          </div>
          <div className="dropdown-input">
            <h4>Check your survival chance</h4>
            <label className="dropdown-input-scenario">Select a Scenario</label>
            <select
              className="dropdown-input-scenario-select"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
            >
              <option value="">-- Choose Scenario --</option>
              <option value="fire">🔥 Fire</option>
              <option value="earthquake">🌍 Earthquake</option>
              <option value="flood">🌊 Flood</option>
              <option value="terror">⚔️ Terror Attack</option>
            </select>

            <label className="drop-down-input-location">
              Select Your Location
            </label>
            <select
              className="drop-down-input-location-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">-- Choose Location --</option>
              <option value="metro">🚇 Metro Station</option>
              <option value="classroom">🏫 Classroom</option>
              <option value="hostel">🏠 Hostel</option>
              <option value="mall">🛒 Shopping Mall</option>
            </select>

            <button onClick={handleStart} className="submit-quiz">
              Start Quiz 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkin;
