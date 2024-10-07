import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png"; // Example import for the logo
import Img from "../assets/avathar.png";
import './Navbar.css'; // Ensure you import your CSS file

const Navbar = () => {
  const [userEmail, setUserEmail] = useState("Email not present");

  useEffect(() => {
    // Retrieve the user data from localStorage
    const userData = localStorage.getItem("employee"); // Assuming 'employee' key holds the user data

    if (userData) {
      const parsedUserData = JSON.parse(userData); // Parse the JSON string into an object
      setUserEmail(parsedUserData.email || "Email not present"); // Set the email from the parsed object
    }
  }, []);

  return (
    <nav className="navbar bg-dark text-white shadow-sm sticky-top" style={{ zIndex: 10 }}>
      <div className="container-fluid d-flex justify-content-between align-items-center py-3 border-bottom border-light">
        {/* Left Side: Logo and Brand Name */}
        <a className="navbar-brand text-white h1 d-flex align-items-center" href="/Home">
          <img
            src={Logo}
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
          J-Evaluate
        </a>

        {/* Center: Search Form */}
        <form className="d-flex" role="search">
          <input
            className="form-control me-2 bg-dark text-white border-light"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ borderRadius: "5px", minWidth: "200px" }}
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>

        {/* Right Side: Email and User Avatar */}
        <div className="d-flex align-items-center">
          {/* Display the email */}
          <span className="me-3 text-white fw-bold">
            {userEmail}
          </span>
          {/* User Avatar */}
          <img
            src={Img}
            alt="User Avatar"
            className="rounded-circle border border-light"
            style={{ width: "45px", height: "45px", objectFit: "cover" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
