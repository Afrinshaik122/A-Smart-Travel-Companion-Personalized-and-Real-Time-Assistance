import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { Facebook, Twitter, Instagram, Mail, Phone, LocationOn } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section brand">
          <h2>TravelX</h2>
          <p>Explore the world with us. Discover new destinations, cultures, and adventures.</p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact</h3>
          <p><LocationOn />GMR Institute of Technology</p>
          <p><Phone /> +98 7651 2340</p>
          <p><Mail /> sruthiedu19@gmail.com</p>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><Facebook /></a>
            <a href="#"><Twitter /></a>
            <a href="#"><Instagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TravelX. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
