"use client";

import Link from "next/link";
import { useRef } from "react";
import { useMusic } from "./MusicProvider";
import { usePathname } from "next/navigation";
import "./Navbar.css";

export default function Navbar() {
  // Use global mute state from MusicProvider
  const { isMuted } = useMusic();

  // Refs for hover and click sounds
  const navBtnHoverRef = useRef(null);
  const navBtnClickRef = useRef(null);

  // Get current path
  const pathname = usePathname();

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us/", label: "About Chitra Lane" },
    { href: "/donate/", label: "Donate Here" },
    { href: "/what-we-do/", label: "What We Do" },
    { href: "/online-education/", label: "Online Education Program" },
    { href: "/shop/", label: "Shop" },
    { href: "/contact/", label: "Contact Us" },
  ];

  // Helper to check active state (handles trailing slashes)
  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    // Compare both with and without trailing slash for robustness
    return pathname === href || pathname === href.replace(/\/$/, "");
  };

  return (
    <nav className="navbar">
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
      <ul className="navbar-links">
        {navLinks.map((link) => (
          <li
            key={link.href}
            className={`navbar-link${isActive(link.href) ? " active" : ""}`}
            onMouseEnter={handleNavBtnMouseEnter}
            onClick={handleNavBtnClick}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
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
