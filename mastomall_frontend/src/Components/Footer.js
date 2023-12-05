
import React from "react";
import { BsTwitter, BsYoutube } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="left-column">
        <h1>Mastodon Mall</h1>
        <div className="footer-icons">
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="right-column">
        <div className="footer-links">
          <button>About Us</button>
          <button>Contact Us</button>
          <button>Privacy Policy</button>
        </div>
      </div>
    </div>
  );
}

export default Footer;

