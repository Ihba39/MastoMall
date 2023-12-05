import React from "react";
import {  useNavigate } from "react-router-dom";
import Logo from "./Assets/Mastadon.png";

function Navbar() {
  const navigate = useNavigate();

  const handleLoginSignupClick = () => {
    navigate("/LoginSignup");
  };
  
  return (
    <nav>
      <div className="nav-logo-container">
        <img src={Logo} alt="" className="nav-logo"/>
      </div>
      <div className="nav-text-section">
        <h1 className="nav-primary-heading">Mastadon Mall</h1>
      </div>
      <div className="navbar-links-container">
        <button className="navbar-primary-button" onClick={handleLoginSignupClick}>Login/Signup</button>
      </div>
    </nav>
  );
}

export default Navbar;