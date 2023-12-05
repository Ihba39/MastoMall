import React from "react";
import { useNavigate, Link } from "react-router-dom"; 
import Logo from "../Components/Assets/Mastadon.png";

function Navbar() {
  const navigate = useNavigate();

  const handleLoginSignupClick = () => {
    navigate("/Login");
  };

  return (
    <nav>
      <div className="nav-logo-container">
        <Link to="/Home"> 
          <img src={Logo} alt="Mastadon Mall Logo" className="nav-logo"/>
        </Link>
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
