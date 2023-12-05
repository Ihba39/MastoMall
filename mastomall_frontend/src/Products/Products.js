import "./Product.css";
import React from 'react';
import Logo from '../Components/Assets/Mastadon.png';
import { useNavigate, Link } from 'react-router-dom';

const Products = ({ result }) => {
  const navigate = useNavigate();

  const handleLoginSignupClick = () => {
    navigate('/Home');
  };

  return (
    <>
      <nav>
        <div className="nav-logo-container">
          <Link to="/Home"> 
            <img src={Logo} alt="Mastadon Mall Logo" className="nav-logo"/>
          </Link>
        </div>
        <div className="nav-text-section">
          <h1 className="nav-primary-heading">Mastodon Mall</h1>
        </div>
        <div className="navbar-links-container">
          <button className="back-primary-button" onClick={handleLoginSignupClick}>
            Logout
          </button>
        </div>
      </nav>
      <section className="card-container">{result}</section>
    </>
  );
};

export default Products;
