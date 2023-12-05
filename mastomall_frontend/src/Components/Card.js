import React, { useState } from "react";
import "./Card.css";

const Card = ({ img, title, newPrice, description, condition }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [message, setMessage] = useState('');

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  const handleSendMessage = (msg) => {
    setMessage(msg); // This sets the default message when a button is clicked
  };

  return (
    <>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-price">
            <div className="price">{newPrice}</div>
            <p>{description}</p>
            <p>{condition}</p>
            <button className="button-4" onClick={togglePopup}> Ask </button>
          </section>
        </div>
      </section>
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-btn" onClick={togglePopup}>Cancel</button>
            <h2>Send a Message</h2>
            <div className="message-options">
              <button className="button-4" onClick={() => handleSendMessage('Hi, is this still available?')}>Hi, is this still available?</button>
              <button className="button-4" onClick={() => handleSendMessage('Hi, I\'d like to buy this')}>Hi, I'd like to buy this</button>
              <button className="button-4" onClick={() => handleSendMessage('Hi, can you meet today?')}>Hi, can you meet today?</button>
              <button className="button-4" onClick={() => handleSendMessage('Will you ship through OfferUp?')}>Will you ship through OfferUp?</button>
            </div>
            <div className="input-area">
              <input 
                type="text"
                className="message-input"
                placeholder="New message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button className="button-4" onClick={togglePopup}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;