import React from "react";
import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <div>
      <nav style={{ display: "flex", justifyContent: "space-between", gap: "20px", padding: "10px", background: "#eee" }}>
        <Link to="/">Home</Link>
        <Link to="/gamified">Game</Link>
        <Link to="/check-in">checkin</Link>
      </nav>
    </div>
  );
};

export default navbar;
