import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png"; // Example import for the logo
import Img from "../assets/avathar.png";

const EmployeeNavbar = () => {
  const [userEmail, setUserEmail] = useState("Email not present");

  useEffect(() => {
    // Retrieve the user data from localStorage
    const userData = localStorage.getItem("employee"); // Assuming you stored the entire object with the key 'userData'
    
    if (userData) {
      const parsedUserData = JSON.parse(userData); // Parse the JSON string into an object
      setUserEmail(parsedUserData.email || "Email not present"); // Set the email from the parsed object
    }
  }, []);

  return (
    <nav className="navbar bg-dark text-white ">
      <div className="container-fluid d-flex justify-content-between align-items-center pt-3 pb-2 border-bottom border-light">
        {/* Left Side: Logo and Brand Name */}
        <a className="navbar-brand text-white h1 d-flex align-items-center" href="/Home">
          <img
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
            alt="Logo"
          />
          J-Evaluate
        </a>

        {/* Center: Search Form */}
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
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
            className="rounded-circle"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;
