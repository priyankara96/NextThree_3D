"use client";

import Link from "next/link";
import { useRef } from "react";
import { useMusic } from "./MusicProvider";
import "./Navbar.css";

export default function Navbar() {
  // Use global mute state from MusicProvider
  const { isMuted } = useMusic();

  // Refs for hover and click sounds
  const navBtnHoverRef = useRef(null);
  const navBtnClickRef = useRef(null);

  // Play hover sound if not muted
  const handleNavBtnMouseEnter = () => {
    if (isMuted) return;
    const audio = navBtnHoverRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  // Play click sound if not muted
  const handleNavBtnClick = () => {
    if (isMuted) return;
    const audio = navBtnClickRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <nav className="navbar">
      {/* Left Section: Logo + Title */}
      <div
        className="navbar-left"
        onMouseEnter={handleNavBtnMouseEnter}
        onClick={handleNavBtnClick}
      >
        <Link href="/">
          <img
            src="/images/logo.png"
            alt="Chitra Lane Logo"
            className="navbar-logo"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li
          className="navbar-link active"
          onMouseEnter={handleNavBtnMouseEnter}
          onClick={handleNavBtnClick}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          className="navbar-link"
          onMouseEnter={handleNavBtnMouseEnter}
          onClick={handleNavBtnClick}
        >
          <Link href="/about-us/">About Chitra Lane</Link>
        </li>
        <li
          className="navbar-link"
          onMouseEnter={handleNavBtnMouseEnter}
          onClick={handleNavBtnClick}
        >
          <Link href="/donate">Donate Here</Link>
        </li>
        <li
          className="navbar-link"
          onMouseEnter={handleNavBtnMouseEnter}
          onClick={handleNavBtnClick}
        >
          <Link href="/what-we-do">What We Do</Link>
        </li>
        <li
          className="navbar-link"
          onMouseEnter={handleNavBtnMouseEnter}
          onClick={handleNavBtnClick}
        >
          <Link href="/online-education">Online Education Program</Link>
        </li>
        <li
          className="navbar-link"
          onMouseEnter={handleNavBtnMouseEnter}
          onClick={handleNavBtnClick}
        >
          <Link href="/shop">Shop</Link>
        </li>
        <li
          className="navbar-link"
          onMouseEnter={handleNavBtnMouseEnter}
          onClick={handleNavBtnClick}
        >
          <Link href="/contact">Contact Us</Link>
        </li>
        <li onMouseEnter={handleNavBtnMouseEnter} onClick={handleNavBtnClick}>
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
      {/* Nav button click sound effect */}
      <audio
        ref={navBtnClickRef}
        src="/assets/old-computer-click.mp3"
        preload="auto"
      />
    </nav>
  );
}
