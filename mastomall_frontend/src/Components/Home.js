import React from "react";
import BannerImage from "../Components/Assets/marketplace.jpg";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import Buyer from "../Components/Assets/buyer.png";
import Seller from "../Components/Assets/seller.png";
import Contact from "../Components/Assets/contact.png";
import Login from "../Components/Assets/Login.jpg";

function Home() {
  const workInfoData = [
    {
      image: Login,
      title: "Login",
      text: "User will login to the system.",
    },
    {
      image: Buyer,
      title: "Buyer",
      text: "Buyer can look for an item and contact the seller",
    },
    {
      image: Seller,
      title: "Seller",
      text: "Can post an ad about the item he wants to sell.",
    },
    {
      image: Contact,
      title: "Contact",
      text: "Contact between the buyer and the seller",
    },
  ];

  return (
    <div className="home-container">
      
      <Navbar />
      
      <div className="content-container">
        <div className="image-container">
          <img src={BannerImage} alt="Marketplace" />
        </div>
      </div>
      {/* <h1 className="home-text-heading">A Place to Buy and Sell Stuff</h1> */}

      <div className="work-section-wrapper">
        <div className="work-section-top">
        <div className="home-text-section">
      </div>
          <h1 className="work-primary-heading">How It Works</h1>
        </div>
        <div className="work-section-bottom">
          {workInfoData.map((data) => (
            <div className="work-section-info" key={data.title}>
              <div className="info-boxes-img-container">
                <img className="work-section-img" src={data.image} alt={data.title} />
              </div>
              <h2>{data.title}</h2>
              <p>{data.text}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="contact-page-wrapper">
        <h1 className="contact-primary-heading">Have a Question in Mind? Let Us Help You</h1>
        <div className="contact-form-container">
          <input type="text" placeholder="yourmail@gmail.com" />
          <button className="contact-form-button">Submit</button>
        </div>
      </div>
    <Footer />
    </div>
  );
}

export default Home;
