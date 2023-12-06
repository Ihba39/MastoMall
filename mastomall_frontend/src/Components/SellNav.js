import React from "react";
import { useNavigate, Link } from "react-router-dom"; 
import Logo from "../Components/Assets/Mastadon.png";
import icon from "../Components/Assets/user.png";

function SellNavbar() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/your-products")
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
      <div className="navbar-links-container-icon">
        <button className="navbar-primary-button" onClick={handleProfileClick}><img src={icon} alt="Profile Icon" className="nav-icon"></img></button>
      </div>
    </nav>
  );
}

export default SellNavbar;
