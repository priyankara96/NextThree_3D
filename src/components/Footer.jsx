import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-col logo-col">
        <img
          src="/images/logo.png"
          alt="Chitra Lane Logo"
          className="footer-logo"
        />
        {/* <div className="footer-title">Chitra Lane</div>
        <div className="footer-subtitle">Welfare Society</div> */}
      </div>
      <div className="footer-col">
        <div className="footer-heading">Contact Us</div>
        <div className="footer-txt">Head Office Address</div>
        <div className="footer-txt">
          45/3, Chitra Lane, Colombo 5, Sri Lanka
        </div>
        <div className="footer-txt">Phone: +94 11 250 3770</div>
        <div className="footer-txt">Email: info@chitralane.lk</div>
      </div>
      <div className="footer-col">
        <div className="footer-heading">Quick Links</div>
        <div className="footer-link">Contact Us</div>
        <div className="footer-link">Shop</div>
        <div className="footer-link">Donate</div>
      </div>
      <div className="footer-col">
        <div className="footer-heading">Collaborating Organizations</div>
        <div className="footer-txt">Tertiary and Vocational Education</div>
        <div className="footer-txt">Ministry of Education</div>
        <div className="footer-txt">Other Partners</div>
      </div>
    </footer>
  );
}
