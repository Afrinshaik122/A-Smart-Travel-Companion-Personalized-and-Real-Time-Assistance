// src/components/ContactCTA.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./ContactCTA.css";

const ContactCTA = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate("/contact");
  };

  return (
    <div className="contact-cta">
      <h2>Have Questions or Need Help?</h2>
      <p>Our team is ready to assist you with your travel plans. Reach out today!</p>
      <button onClick={handleContactClick}>Contact Us</button>
    </div>
  );
};

export default ContactCTA;
