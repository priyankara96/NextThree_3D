"use client";

import Link from "next/link";
import { useRef } from "react";
import { useMusic } from "./MusicProvider";
import "./Navbar.css";

export default function Navbar() {
  // Use global mute state from MusicProvider
  const { isMuted } = useMusic();

  // Ref for button hover sound
  const navBtnHoverRef = useRef(null);

  // Play hover sound if not muted
  const handleNavBtnMouseEnter = () => {
    if (isMuted) return; // Only play if NOT muted!
    const audio = navBtnHoverRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <nav className="navbar">
      {/* Left Section: Logo + Title */}
      <div className="navbar-left">
        <img
          src="/images/logo.png"
          alt="Chitra Lane Logo"
          className="navbar-logo"
        />
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li
          className="navbar-link active"
          onMouseEnter={handleNavBtnMouseEnter}
        >
          <Link href="/">Home</Link>
        </li>
        <li className="navbar-link" onMouseEnter={handleNavBtnMouseEnter}>
          <Link href="/about-us/">About Chitra Lane</Link>
        </li>
        <li className="navbar-link" onMouseEnter={handleNavBtnMouseEnter}>
          <Link href="/donate">Donate Here</Link>
        </li>
        <li className="navbar-link" onMouseEnter={handleNavBtnMouseEnter}>
          <Link href="/what-we-do">What We Do</Link>
        </li>
        <li className="navbar-link" onMouseEnter={handleNavBtnMouseEnter}>
          <Link href="/online-education">Online Education Program</Link>
        </li>
        <li className="navbar-link" onMouseEnter={handleNavBtnMouseEnter}>
          <Link href="/shop">Shop</Link>
        </li>
        <li className="navbar-link" onMouseEnter={handleNavBtnMouseEnter}>
          <Link href="/contact">Contact Us</Link>
        </li>
        <li onMouseEnter={handleNavBtnMouseEnter}>
          <span className="navbar-search" role="img" aria-label="search">
            🔍
          </span>
        </li>
      </ul>
      {/* Nav button hover sound effect */}
      <audio
        ref={navBtnHoverRef}
        src="/assets/button-hover-click.wav"
        preload="auto"
      />
    </nav>
  );
}
