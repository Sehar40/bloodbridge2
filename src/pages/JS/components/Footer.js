import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css"; 
import logo from "../../../images/bloodlogo.png"; // Make sure this is your BloodBridge logo

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Logo Section */}
        <div className="footer-section logo">
          <img src={logo} alt="BloodBridge Logo" className="footer-logo" />
        </div>

        {/* About Section */}
        <div className="footer-section about">
          <h3>About BloodBridge</h3>
          <p>
            BloodBridge, is a life-saving platform that connects blood donors with those in urgent need. 
            Our mission is to make blood donation simple, accessible, and impactful across Pakistan.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/see_donor">Find Donors</a></li>
            <li><a href="/see_donor">Request Blood</a></li>
            <li><a href="/Contact_Us">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@bloodbridge.com</p>
          <p>Phone: +92 300 1234567</p>
          <p>Location: Islamabad, Pakistan</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
        
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 BloodBridge. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
