import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Left Section: Logo + Title */}
      <div className="navbar-left">
        <img
          src="/images/logo.png"
          alt="Chitra Lane Logo"
          className="navbar-logo"
        />
        {/* <div>
          <div className="navbar-title">Chitra Lane</div>
          <div className="navbar-subtitle">Welfare Society</div>
        </div> */}
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li className="navbar-link active">
          <Link href="/">Home</Link>
        </li>
        <li className="navbar-link">
          <Link href="/about-us">About Chitra Lane</Link>
        </li>
        <li className="navbar-link">
          <Link href="/donate">Donate Here</Link>
        </li>
        <li className="navbar-link">
          <Link href="/what-we-do">What We Do</Link>
        </li>
        <li className="navbar-link">
          <Link href="/online-education">Online Education Program</Link>
        </li>
        <li className="navbar-link">
          <Link href="/shop">Shop</Link>
        </li>
        <li className="navbar-link">
          <Link href="/contact">Contact Us</Link>
        </li>
        <li>
          <span className="navbar-search" role="img" aria-label="search">
            🔍
          </span>
        </li>
      </ul>
    </nav>
  );
}
